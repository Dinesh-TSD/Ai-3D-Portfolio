import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Settings, 
  Users, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Shield, 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Globe,
  Github,
  ExternalLink
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
}

const PROJECTS_KEY = 'portfolio_projects';

const getInitialProjects = () => {
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback to defaults if corrupted
    }
  }
  return [
    {
      id: 1,
      title: "3D Portfolio Website",
      description: "A modern 3D portfolio built with React, Three.js, and Framer Motion",
      technologies: ["React", "Three.js", "TypeScript", "Tailwind CSS"],
      image: "/placeholder.svg",
      liveUrl: "https://portfolio.com",
      githubUrl: "https://github.com/user/portfolio",
      featured: true,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder.svg",
      liveUrl: "https://ecommerce.com",
      githubUrl: "https://github.com/user/ecommerce",
      featured: false,
      createdAt: "2024-01-10"
    }
  ];
};

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>(getInitialProjects());
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    image: null as File | null
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus !== 'true') {
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const handleBackToPortfolio = () => {
    navigate('/');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle image upload
    let imageUrl = "/placeholder.svg";
    if (newProject.image) {
      // Create a local URL for the uploaded image
      imageUrl = URL.createObjectURL(newProject.image);
    }
    
    const project: Project = {
      id: Date.now(),
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies.split(',').map(tech => tech.trim()),
      image: imageUrl,
      liveUrl: newProject.liveUrl || undefined,
      githubUrl: newProject.githubUrl || undefined,
      featured: newProject.featured,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setProjects([project, ...projects]);
    setNewProject({
      title: '',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      image: null
    });
    setShowAddProject(false);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleToggleFeatured = (id: number) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, featured: !project.featured } : project
    ));
  };

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: 'Total Views', value: '1,234', icon: Eye, color: 'text-blue-500' },
    { label: 'Messages', value: '56', icon: MessageSquare, color: 'text-green-500' },
    { label: 'Projects', value: projects.length.toString(), icon: FileText, color: 'text-purple-500' },
    { label: 'Skills', value: '8', icon: BarChart3, color: 'text-orange-500' },
  ];

  const recentMessages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Great portfolio! Would love to collaborate...', date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Impressive work! Looking for a developer...', date: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', message: 'Your 3D laptop project is amazing!', date: '2024-01-13' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass rounded-xl p-6 border border-glass-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-foreground/70">{stat.label}</p>
              </div>
              <div className={`p-3 rounded-lg bg-surface/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="glass rounded-xl p-6 border border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Messages</h3>
          <motion.button
            className="flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="w-4 h-4" />
            View All
          </motion.button>
        </div>
        <div className="space-y-3">
          {recentMessages.map((message, index) => (
            <motion.div
              key={message.id}
              className="p-4 rounded-lg bg-surface/30 border border-glass-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{message.name}</p>
                  <p className="text-sm text-foreground/70">{message.email}</p>
                  <p className="text-sm text-foreground/80 mt-1">{message.message}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-foreground/50">{message.date}</p>
                  <motion.button
                    className="mt-2 text-xs text-primary hover:text-primary-light transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reply
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Manage Projects ({projects.length})</h3>
        <motion.button
          onClick={() => setShowAddProject(true)}
          className="flex items-center gap-2 glass px-4 py-2 rounded-lg hover-lift border border-primary/20 hover:border-primary/40 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          Add Project
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="glass rounded-xl p-6 border border-glass-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Project Image */}
            <div className="mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg border border-glass-border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-lg">{project.title}</h4>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/70 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-surface/50 text-foreground/70 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground/50">
                  <span>Created: {project.createdAt}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface/50 hover:bg-surface/70 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe className="w-4 h-4" />
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface/50 hover:bg-surface/70 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => handleToggleFeatured(project.id)}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    project.featured 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-surface/50 hover:bg-surface/70'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6 border border-glass-border">
        <h3 className="text-lg font-semibold mb-4">Admin Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-foreground/70">Receive notifications for new messages</p>
            </div>
            <motion.button
              className="w-12 h-6 bg-primary rounded-full relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"
                initial={{ x: 0 }}
                animate={{ x: 20 }}
              />
            </motion.button>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30">
            <div>
              <p className="font-medium">Analytics Tracking</p>
              <p className="text-sm text-foreground/70">Track portfolio analytics</p>
            </div>
            <motion.button
              className="w-12 h-6 bg-surface rounded-full relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Header */}
      <motion.header
        className="glass border-b border-glass-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleBackToPortfolio}
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Portfolio</span>
              </motion.button>
              <div className="h-6 w-px bg-glass-border" />
              <h1 className="text-xl font-bold text-gradient">Admin Dashboard</h1>
            </div>
            
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 glass px-4 py-2 rounded-lg hover-lift border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="text-red-500">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            className="lg:w-64 space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'projects', label: 'Projects', icon: FileText },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'glass border border-primary/40 bg-primary/10'
                    : 'hover:bg-surface/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className={`w-5 h-5 ${
                  activeTab === tab.id ? 'text-primary' : 'text-foreground/70'
                }`} />
                <span className={`font-medium ${
                  activeTab === tab.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {tab.label}
                </span>
              </motion.button>
            ))}
          </motion.aside>

          {/* Main Content */}
          <motion.main
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'projects' && renderProjects()}
            {activeTab === 'settings' && renderSettings()}
            {activeTab === 'messages' && (
              <div className="glass rounded-xl p-6 border border-glass-border">
                <h3 className="text-lg font-semibold mb-4">Messages</h3>
                <p className="text-foreground/70">Message management interface will be implemented here.</p>
              </div>
            )}
            {activeTab === 'users' && (
              <div className="glass rounded-xl p-6 border border-glass-border">
                <h3 className="text-lg font-semibold mb-4">Users</h3>
                <p className="text-foreground/70">User management interface will be implemented here.</p>
              </div>
            )}
          </motion.main>
        </div>
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowAddProject(false)}
            />
            
            {/* Modal */}
            <motion.div
              className="glass rounded-2xl p-8 border border-glass-border w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gradient">Add New Project</h2>
                <motion.button
                  onClick={() => setShowAddProject(false)}
                  className="p-2 rounded-lg hover:bg-surface/50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-6">
                {/* Project Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Project Image</label>
                  <div className="border-2 border-dashed border-glass-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewProject({...newProject, image: file});
                        }
                      }}
                      className="hidden"
                      id="project-image"
                    />
                    <label htmlFor="project-image" className="cursor-pointer">
                      {newProject.image ? (
                        <div className="space-y-2">
                          <img
                            src={URL.createObjectURL(newProject.image)}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg mx-auto"
                          />
                          <p className="text-sm text-foreground/70">{newProject.image.name}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setNewProject({...newProject, image: null});
                            }}
                            className="text-xs text-red-500 hover:text-red-400"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-16 h-16 glass rounded-lg flex items-center justify-center mx-auto">
                            <Plus className="w-8 h-8 text-primary" />
                          </div>
                          <p className="text-sm text-foreground/70">Click to upload project image</p>
                          <p className="text-xs text-foreground/50">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Project Title</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      placeholder="Enter project title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Technologies</label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                      className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      placeholder="React, TypeScript, Tailwind CSS"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                    rows={4}
                    placeholder="Describe your project..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Live URL (Optional)</label>
                    <input
                      type="url"
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
                      className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      placeholder="https://project.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">GitHub URL (Optional)</label>
                    <input
                      type="url"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                      className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      placeholder="https://github.com/user/project"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProject.featured}
                    onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                    className="w-4 h-4 text-primary bg-surface border-glass-border rounded focus:ring-primary focus:ring-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-foreground">
                    Mark as Featured Project
                  </label>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <motion.button
                    type="submit"
                    className="flex-1 glass px-6 py-3 rounded-lg hover-lift border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4 text-primary group-hover:text-primary-light transition-colors duration-300" />
                      <span className="font-medium">Add Project</span>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={() => setShowAddProject(false)}
                    className="flex-1 glass px-6 py-3 rounded-lg hover-lift border border-glass-border hover:border-foreground/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard; 