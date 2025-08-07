import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  User, 
  Settings, 
  BarChart3, 
  FileText, 
  Mail, 
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar
} from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  profile: {
    firstName: string;
    lastName: string;
    bio?: string;
  };
  lastLogin: string;
}

const AdminDashboard: React.FC = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    lastLogin: ''
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');

    if (!token || !user) {
      window.location.href = '/admin/login';
      return;
    }

    try {
      const userData = JSON.parse(user);
      setAdminUser(userData);
    } catch (error) {
      console.error('Error parsing admin user data:', error);
      window.location.href = '/admin/login';
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch projects count
      const projectsResponse = await fetch('http://localhost:5000/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setStats(prev => ({ ...prev, projects: projectsData.length }));
      }

      // Fetch contacts count
      const contactsResponse = await fetch('http://localhost:5000/api/contact', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json();
        setStats(prev => ({ ...prev, contacts: contactsData.length }));
      }

    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header
        className="glass glass-border border-b border-slate-700/50 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {adminUser?.profile?.firstName}</p>
            </div>
          </div>
          
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-slate-700/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Projects Card */}
          <motion.div
            className="glass glass-border p-6 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{stats.projects}</h3>
            <p className="text-muted-foreground">Total Projects</p>
          </motion.div>

          {/* Contacts Card */}
          <motion.div
            className="glass glass-border p-6 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{stats.contacts}</h3>
            <p className="text-muted-foreground">Contact Messages</p>
          </motion.div>

          {/* Last Login Card */}
          <motion.div
            className="glass glass-border p-6 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {adminUser?.lastLogin ? new Date(adminUser.lastLogin).toLocaleDateString() : 'N/A'}
            </h3>
            <p className="text-muted-foreground">Last Login</p>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="glass glass-border p-6 rounded-lg text-left hover:bg-slate-700/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-white mb-2">Manage Projects</h3>
            <p className="text-sm text-muted-foreground">Add, edit, or remove portfolio projects</p>
          </motion.button>

          <motion.button
            className="glass glass-border p-6 rounded-lg text-left hover:bg-slate-700/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-white mb-2">View Messages</h3>
            <p className="text-sm text-muted-foreground">Check contact form submissions</p>
          </motion.button>

          <motion.button
            className="glass glass-border p-6 rounded-lg text-left hover:bg-slate-700/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-white mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground">View portfolio statistics and insights</p>
          </motion.button>

          <motion.button
            className="glass glass-border p-6 rounded-lg text-left hover:bg-slate-700/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-white mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground">Manage account and preferences</p>
          </motion.button>
        </motion.div>

        {/* Admin Info */}
        <motion.div
          className="mt-8 glass glass-border p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Admin Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="text-white font-medium">
                {adminUser?.profile?.firstName} {adminUser?.profile?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="text-white font-medium">{adminUser?.username}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-white font-medium">{adminUser?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="text-white font-medium capitalize">{adminUser?.role}</p>
            </div>
          </div>
        </motion.div>

        {/* Back to Portfolio */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <span>← Back to Portfolio</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard; 