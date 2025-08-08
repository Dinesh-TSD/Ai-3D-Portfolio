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
  Calendar,
  Menu,
  ExternalLink,
  Github,
  Code2,
  Smartphone,
  Globe,
  Sparkles,
  Brain,
  Filter,
  Lock
} from 'lucide-react';
import { AdminNavbar } from '../components/Navigation';

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
  const [activeSection, setActiveSection] = useState<'overview' | 'projects' | 'settings'>('overview');
  const [projectSearch, setProjectSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const categories = ['all', 'frontend', 'full-stack', 'ai/ml', 'backend'];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Example projects (reuse from Projects page)
  const defaultProjects = [
    {
      id: 1,
      title: "3D Portfolio Website",
      description: "A modern 3D portfolio built with React, Three.js, and Framer Motion. Features interactive 3D elements, smooth animations, and responsive design.",
      technologies: ["React", "Three.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: "/placeholder.svg",
      liveUrl: "https://portfolio.com",
      githubUrl: "https://github.com/user/portfolio",
      featured: true,
      category: "Frontend"
    },
    // ... (add more as needed)
  ];
  const [projects, setProjects] = useState(defaultProjects);
  const filteredProjects = projects.filter(project => {
    const matchesFilter = projectFilter === 'all' || project.category.toLowerCase() === projectFilter.toLowerCase();
    const matchesSearch = project.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      project.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(projectSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
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
    window.location.href = '/';
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
    <div className="relative min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      {/* Floating Elements */}
      <motion.div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full blur-sm" animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-32 right-16 w-6 h-6 bg-secondary rounded-full blur-sm" animate={{ y: [20, -20, 20], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      <motion.div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent rounded-full blur-sm" animate={{ x: [-10, 10, -10], y: [-10, 10, -10], opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

      {/* Fixed Navbar */}
      <AdminNavbar onLogout={handleLogout} user={adminUser} />

      {/* Flex container for sidebar + main content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 h-screen bg-gradient-hero border-r border-slate-700/50 p-4 gap-4 rounded-r-lg rounded-l-none glass z-30 fixed top-16 left-0">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-7 h-7 text-primary" />
              <span className="text-xl font-bold text-white">Admin</span>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <button onClick={() => setActiveSection('overview')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === 'overview' ? 'bg-primary/20 text-primary' : 'hover:bg-slate-800/60 text-white'}`}> <BarChart3 className="w-5 h-5" /> Overview </button>
            <button onClick={() => setActiveSection('projects')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === 'projects' ? 'bg-primary/20 text-primary' : 'hover:bg-slate-800/60 text-white'}`}> <FileText className="w-5 h-5" /> Projects </button>
            <button onClick={() => setActiveSection('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === 'settings' ? 'bg-primary/20 text-primary' : 'hover:bg-slate-800/60 text-white'}`}> <Settings className="w-5 h-5" /> Settings </button>
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/40 text-red-400 mt-8"> <LogOut className="w-5 h-5" /> Logout </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen overflow-y-auto px-2 relative z-10 bg-transparent md:ml-56">
          {activeSection === 'overview' && (
            <div className="py-8">
              <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <motion.div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Admin Dashboard</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-gradient">Welcome, {adminUser?.profile?.firstName}</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Manage your portfolio, projects, and settings from one place.</p>
              </motion.div>
        {/* Stats Grid */}
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {/* Projects Card */}
                <motion.div className="glass glass-border p-6 rounded-lg" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
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
                <motion.div className="glass glass-border p-6 rounded-lg" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
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
                <motion.div className="glass glass-border p-6 rounded-lg" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
                  <h3 className="text-lg font-bold text-white mb-2">{adminUser?.lastLogin ? new Date(adminUser.lastLogin).toLocaleDateString() : 'N/A'}</h3>
            <p className="text-muted-foreground">Last Login</p>
          </motion.div>
        </motion.div>
        {/* Admin Info */}
              <motion.div className="mt-8 glass glass-border p-6 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-xl font-bold text-white mb-4">Admin Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
                    <p className="text-white font-medium">{adminUser?.profile?.firstName} {adminUser?.profile?.lastName}</p>
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
            </div>
          )}
          {activeSection === 'projects' && (
            <section id="admin-projects" className="py-8">
              <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <motion.div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Projects Management</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-gradient">Manage Projects</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Add, edit, or remove your portfolio projects below.</p>
              </motion.div>
              {/* Filters and Search */}
              <motion.div className="glass rounded-xl p-6 border border-glass-border mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <input type="text" placeholder="Search projects..." value={projectSearch} onChange={e => setProjectSearch(e.target.value)} className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300" />
                      <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50" />
                    </div>
                  </div>
                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <motion.button key={category} onClick={() => setProjectFilter(category)} className={`px-4 py-2 rounded-lg transition-all duration-300 ${projectFilter === category ? 'glass border border-primary/40 bg-primary/10 text-primary' : 'glass border border-glass-border hover:border-primary/20 hover:bg-surface/50'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{category.charAt(0).toUpperCase() + category.slice(1)}</motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div key={project.id} className="glass rounded-xl border border-glass-border overflow-hidden hover-lift transition-all duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.6 }} whileHover={{ scale: 1.02 }}>
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" onError={e => { const target = e.target as HTMLImageElement; target.src = "/placeholder.svg"; }} />
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs bg-primary/90 text-white rounded-full font-medium">Featured</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 text-xs bg-surface/90 text-foreground rounded-full font-medium">{project.category}</span>
                      </div>
                    </div>
                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gradient mb-3">{project.title}</h3>
                      <p className="text-sm text-foreground/70 mb-4 line-clamp-3">{project.description}</p>
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 text-xs bg-surface/50 text-foreground/70 rounded-full">{tech}</span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 text-xs bg-surface/50 text-foreground/50 rounded-full">+{project.technologies.length - 4}</span>
                        )}
                      </div>
                      {/* Project Links */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {project.liveUrl && (
                            <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-surface/50 hover:bg-surface/70 transition-colors duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Globe className="w-4 h-4" /></motion.a>
                          )}
                          {project.githubUrl && (
                            <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-surface/50 hover:bg-surface/70 transition-colors duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Github className="w-4 h-4" /></motion.a>
                          )}
                        </div>
                        <motion.button className="flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><ExternalLink className="w-4 h-4" />View Details</motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <Code2 className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
                  <p className="text-foreground/70">Try adjusting your search or filter criteria</p>
                </motion.div>
              )}
            </section>
          )}
          {activeSection === 'settings' && (
            <section id="admin-settings" className="py-8">
              <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <motion.div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                  <Settings className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Settings</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-gradient">Account Settings</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Manage your account settings and preferences below.</p>
              </motion.div>
              {/* Settings Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div className="glass p-8 rounded-2xl hover-lift text-center group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05 }}>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Profile</h4>
                  <p className="text-sm text-muted-foreground">Update your profile information and avatar.</p>
                </motion.div>
                <motion.div className="glass p-8 rounded-2xl hover-lift text-center group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05 }}>
                  <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Settings className="w-8 h-8 text-secondary" />
                  </div>
                  <h4 className="font-bold mb-2">Preferences</h4>
                  <p className="text-sm text-muted-foreground">Customize your dashboard experience.</p>
                </motion.div>
                <motion.div className="glass p-8 rounded-2xl hover-lift text-center group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05 }}>
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Lock className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-bold mb-2">Security</h4>
                  <p className="text-sm text-muted-foreground">Change your password and enable 2FA.</p>
        </motion.div>
      </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 