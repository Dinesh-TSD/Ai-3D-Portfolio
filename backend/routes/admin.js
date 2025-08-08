import { Router } from 'express';
import { verifyToken, requireAdmin } from '../controllers/authController.js';
import { getProjectStats, getAllProjects } from '../controllers/projectController.js';
import { getContactStats, getAllContacts } from '../controllers/contactController.js';

const router = Router();

// Apply admin middleware to all routes
router.use(verifyToken, requireAdmin);

// Dashboard overview
router.get('/dashboard', async (req, res) => {
  try {
    // Get project statistics
    const projectStats = await getProjectStats(req, res);
    
    // Get contact statistics
    const contactStats = await getContactStats(req, res);
    
    // Get user statistics
    const userStats = await aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: { $sum: { $cond: ['$isActive', 1, 0] } },
          adminUsers: { $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] } }
        }
      }
    ]);

    // Get recent activities
    const recentProjects = await getAllProjects(req, res);
    const recentContacts = await getAllContacts(req, res);

    res.json({
      projectStats: projectStats.overall,
      contactStats: contactStats.overall,
      userStats: userStats[0] || {},
      recentProjects: recentProjects.projects?.slice(0, 5) || [],
      recentContacts: recentContacts.contacts?.slice(0, 5) || []
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, role, isActive } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const skip = (page - 1) * limit;

    const users = await find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await countDocuments(filter);

    res.json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user (admin only)
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role, isActive, profile } = req.body;

    const user = await findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    if (profile) {
      user.profile = { ...user.profile, ...profile };
    }

    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user (admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting the last admin
    const user = await findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role === 'admin') {
      const adminCount = await countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ error: 'Cannot delete the last admin user' });
      }
    }

    await findByIdAndDelete(id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// System health check (admin only)
router.get('/health', async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'connected'
    };

    // Check database connection
    try {
      await findOne();
    } catch (dbError) {
      health.database = 'disconnected';
      health.status = 'unhealthy';
    }

    res.json(health);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ 
      status: 'unhealthy',
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Export data (admin only)
router.get('/export/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { format = 'json' } = req.query;

    let data;
    let filename;

    switch (type) {
      case 'projects':
        data = await getAllProjects(req, res);
        filename = `projects-${new Date().toISOString().split('T')[0]}`;
        break;
      case 'contacts':
        data = await getAllContacts(req, res);
        filename = `contacts-${new Date().toISOString().split('T')[0]}`;
        break;
      case 'users':
        data = await find().select('-password');
        filename = `users-${new Date().toISOString().split('T')[0]}`;
        break;
      default:
        return res.status(400).json({ error: 'Invalid export type' });
    }

    if (format === 'csv') {
      // Convert to CSV format (basic implementation)
      const csv = convertToCSV(data);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
      res.send(csv);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.json"`);
      res.json(data);
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// Helper function to convert data to CSV
const convertToCSV = (data) => {
  if (!data || !Array.isArray(data)) return '';
  
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];
  
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

export default router;
