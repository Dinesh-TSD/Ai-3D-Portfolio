import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Smartphone, 
  Globe, 
  Sparkles,
  Brain,
  Filter
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
  category: string;
}

const PROJECTS_KEY = 'portfolio_projects';

const defaultProjects: Project[] = [
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
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard. Built with modern technologies for scalability.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "JWT"],
    image: "/placeholder.svg",
    liveUrl: "https://ecommerce.com",
    githubUrl: "https://github.com/user/ecommerce",
    featured: false,
    category: "Full-Stack"
  },
  {
    id: 3,
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration. Features message history, user authentication, and intelligent responses using OpenAI API.",
    technologies: ["React", "Node.js", "Socket.io", "OpenAI API", "MongoDB"],
    image: "/placeholder.svg",
    liveUrl: "https://aichat.com",
    githubUrl: "https://github.com/user/aichat",
    featured: true,
    category: "AI/ML"
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["React", "Firebase", "TypeScript", "Tailwind CSS", "DnD Kit"],
    image: "/placeholder.svg",
    liveUrl: "https://taskapp.com",
    githubUrl: "https://github.com/user/taskapp",
    featured: false,
    category: "Frontend"
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with real-time data, charts, and location-based forecasts. Features beautiful visualizations and responsive design.",
    technologies: ["React", "Chart.js", "Weather API", "Geolocation", "CSS3"],
    image: "/placeholder.svg",
    liveUrl: "https://weather.com",
    githubUrl: "https://github.com/user/weather",
    featured: false,
    category: "Frontend"
  },
  {
    id: 6,
    title: "Blog Platform",
    description: "Modern blog platform with markdown support, SEO optimization, and content management system. Built for performance and user experience.",
    technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL", "Vercel"],
    image: "/placeholder.svg",
    liveUrl: "https://blog.com",
    githubUrl: "https://github.com/user/blog",
    featured: true,
    category: "Full-Stack"
  }
];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (stored) {
      try {
        const parsedProjects = JSON.parse(stored);
        if (parsedProjects.length > 0) {
          setProjects(parsedProjects);
        }
      } catch {
        // fallback to defaults if corrupted
      }
    }
  }, []);

  const categories = ['all', 'frontend', 'full-stack', 'ai/ml', 'backend'];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || 
      project.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="min-h-screen bg-gradient-to-br from-background via-surface to-background pt-8 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            My Projects
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web development, AI integration, and modern technologies
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="glass rounded-xl p-6 border border-glass-border mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 glass rounded-lg border border-glass-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50" />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    filter === category
                      ? 'glass border border-primary/40 bg-primary/10 text-primary'
                      : 'glass border border-glass-border hover:border-primary/20 hover:bg-surface/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass rounded-xl border border-glass-border overflow-hidden hover-lift transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs bg-primary/90 text-white rounded-full font-medium">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs bg-surface/90 text-foreground rounded-full font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gradient mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-surface/50 text-foreground/70 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-surface/50 text-foreground/50 rounded-full">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Project Links */}
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
                  
                  <motion.button
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Code2 className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-foreground/70">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
