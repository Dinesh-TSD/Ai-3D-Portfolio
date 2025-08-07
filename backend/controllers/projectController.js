import Project from '../models/Project.js';
import { validationResult } from 'express-validator';

// Get all projects (public)
export async function getAllProjects(req, res) {
  try {
    const { 
      category, 
      featured, 
      status, 
      technology, 
      tag,
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isPublic: true };
    
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    if (status) filter.status = status;
    if (technology) filter.technologies = { $in: [technology] };
    if (tag) filter.tags = { $in: [tag] };

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const projects = await Project.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for pagination
    const total = await Project.countDocuments(filter);

    res.json({
      projects,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

// Get featured projects
export async function getFeaturedProjects(req, res) {
  try {
    const projects = await Project.find({ 
      featured: true, 
      isPublic: true 
    })
    .sort({ order: 1, createdAt: -1 })
    .limit(6)
    .select('-__v');

    res.json({ projects });
  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
}

// Get project by ID
export async function getProjectById(req, res) {
  try {
    const { id } = req.params;
    
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Increment view count
    project.metrics.views += 1;
    await project.save();

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
}

// Create new project (admin only)
export async function createProject(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const projectData = req.body;
    
    // Set default values
    if (!projectData.shortDescription) {
      projectData.shortDescription = projectData.description.substring(0, 200);
    }

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
}

// Update project (admin only)
export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update project fields
    Object.keys(updateData).forEach(key => {
      if (key !== '_id' && key !== '__v') {
        project[key] = updateData[key];
      }
    });

    await project.save();

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
}

// Delete project (admin only)
export async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
}

// Get project statistics (admin only)
export async function getProjectStats(req, res) {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          featuredProjects: { $sum: { $cond: ['$featured', 1, 0] } },
          totalViews: { $sum: '$metrics.views' },
          totalLikes: { $sum: '$metrics.likes' },
          avgViews: { $avg: '$metrics.views' }
        }
      }
    ]);

    const categoryStats = await Project.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusStats = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      overall: stats[0] || {},
      byCategory: categoryStats,
      byStatus: statusStats
    });
  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({ error: 'Failed to fetch project statistics' });
  }
}

// Search projects
export async function searchProjects(req, res) {
  try {
    const { q, category, technology } = req.query;

    const filter = { isPublic: true };

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ];
    }

    if (category) filter.category = category;
    if (technology) filter.technologies = { $in: [technology] };

    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(20)
      .select('-__v');

    res.json({ projects });
  } catch (error) {
    console.error('Search projects error:', error);
    res.status(500).json({ error: 'Failed to search projects' });
  }
}

// Get project categories
export async function getProjectCategories(req, res) {
  try {
    const categories = await Project.distinct('category');
    const technologies = await Project.distinct('technologies');
    const tags = await Project.distinct('tags');

    res.json({
      categories,
      technologies: technologies.filter(tech => tech), // Remove null/undefined
      tags: tags.filter(tag => tag) // Remove null/undefined
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
