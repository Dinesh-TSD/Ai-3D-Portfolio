import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Smartphone, 
  Globe, 
  Sparkles,
  Brain
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  category?: 'web' | 'mobile' | 'ai';
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const PROJECTS_KEY = 'portfolio_projects';

const defaultProjects: Project[] = [
    {
      id: '1',
      title: 'AI-Powered Task Manager',
      description: 'Intelligent task management with AI suggestions and automation',
      longDescription: 'A revolutionary task management application that uses machine learning to predict task priorities, suggest optimal scheduling, and automate routine workflows. Features natural language processing for task creation and smart notifications.',
      tech: ['React', 'TypeScript', 'OpenAI API', 'Node.js', 'PostgreSQL'],
      category: 'ai',
      image: '/api/placeholder/600/400',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      id: '2',
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce with real-time inventory and analytics',
      longDescription: 'A full-stack e-commerce platform featuring real-time inventory management, advanced analytics dashboard, payment processing, and mobile-responsive design. Built with scalability and performance in mind.',
      tech: ['Next.js', 'React', 'Stripe', 'MongoDB', 'Tailwind CSS'],
      category: 'web',
      image: '/api/placeholder/600/400',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      id: '3',
      title: 'Fitness Tracking App',
      description: 'Cross-platform mobile app for fitness enthusiasts',
      longDescription: 'A comprehensive fitness tracking application with workout planning, progress monitoring, social features, and AI-powered form correction using device camera. Available on both iOS and Android.',
      tech: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow Lite'],
      category: 'mobile',
      image: '/api/placeholder/600/400',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    },
    {
      id: '4',
      title: 'Smart Home Dashboard',
      description: 'IoT device management with voice control integration',
      longDescription: 'An intelligent dashboard for managing smart home devices with voice control, automation rules, energy monitoring, and predictive maintenance alerts. Integrates with major IoT platforms.',
      tech: ['Vue.js', 'Python', 'MQTT', 'InfluxDB', 'Docker'],
      category: 'ai',
      image: '/api/placeholder/600/400',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false
    },
    {
      id: '5',
      title: 'Portfolio Website',
      description: '3D interactive portfolio with smooth animations',
      longDescription: 'This very website! A modern portfolio featuring 3D graphics, smooth animations, AI assistant, and responsive design. Built to showcase development skills and creativity.',
      tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
      category: 'web',
      image: '/api/placeholder/600/400',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      id: '6',
      title: 'Crypto Trading Bot',
      description: 'Automated trading with machine learning predictions',
      longDescription: 'An intelligent cryptocurrency trading bot that uses machine learning algorithms to analyze market trends and execute trades. Features risk management, backtesting, and real-time monitoring.',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'WebSocket'],
      category: 'ai',
      image: '/api/placeholder/600/400',
      githubUrl: 'https://github.com',
      featured: false
    }
  ];

/**
 * Projects Section Component
 * Features: 3D card effects, filtering, modal details, smooth animations
 */
const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'mobile' | 'ai'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert admin format to Projects format if needed
        setProjects(parsed.map((p: any) => ({
          id: p.id?.toString() || Math.random().toString(),
          title: p.title,
          description: p.description,
          longDescription: p.description, // fallback if no longDescription
          tech: p.technologies || p.tech || [],
          category: p.category || 'web',
          image: p.image,
          demoUrl: p.liveUrl,
          githubUrl: p.githubUrl,
          featured: p.featured || false
        })));
      } catch {
        setProjects(defaultProjects);
      }
    }
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Code2 },
    { id: 'web', label: 'Web Apps', icon: Globe },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'ai', label: 'AI Projects', icon: Brain }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return Globe;
      case 'mobile': return Smartphone;
      case 'ai': return Brain;
      default: return Code2;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web': return 'text-primary';
      case 'mobile': return 'text-secondary';
      case 'ai': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Featured Work</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Projects That</span> Make a Difference
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A curated selection of projects showcasing innovation, technical excellence, 
            and creative problem-solving across various domains.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-glow-primary'
                  : 'glass hover:bg-surface/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-4 h-4" />
              <span className="font-medium">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => {
            const CategoryIcon = getCategoryIcon(project.category || 'web'); // Default to web if category is missing
            const categoryColor = getCategoryColor(project.category || 'web'); // Default to web if category is missing
            
            return (
              <motion.div
                key={project.id}
                className={`glass rounded-2xl overflow-hidden hover-lift group cursor-pointer ${
                  project.featured ? 'ring-2 ring-primary/20' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                layout
                layoutId={project.id}
                whileHover={{ scale: 1.02 }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-surface overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CategoryIcon className={`w-12 h-12 ${categoryColor} opacity-50`} />
                  </div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-3 left-3">
                    <div className="glass px-3 py-1 rounded-full flex items-center gap-2">
                      <CategoryIcon className={`w-3 h-3 ${categoryColor}`} />
                      <span className="text-xs font-medium capitalize">{project.category || 'web'}</span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-surface px-2 py-1 rounded-full text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demoUrl, '_blank');
                        }}
                        className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Demo</span>
                      </button>
                    )}
                    
                    {project.githubUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm font-medium">Code</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground mb-6">
            Interested in working together? Let's create something amazing!
          </p>
          <button className="glass px-8 py-4 rounded-lg hover-lift border border-primary/20 hover:border-primary/40 transition-all duration-300">
            <span className="font-semibold">Start a Project</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-3 h-3 bg-primary rounded-full blur-sm"
        animate={{ 
          y: [-20, 20, -20],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-40 right-10 w-4 h-4 bg-accent rounded-full blur-sm"
        animate={{ 
          x: [-15, 15, -15],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
};

export default Projects;