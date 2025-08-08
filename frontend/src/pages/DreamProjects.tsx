import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Brain, 
  Globe, 
  Smartphone, 
  Code2, 
  Sparkles,
  ArrowLeft,
  ExternalLink,
  Github
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DreamProject {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: 'planned' | 'in-progress' | 'concept';
  estimatedDuration: string;
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

const DreamProjects: React.FC = () => {
  const dreamProjects: DreamProject[] = [
    {
      id: 1,
      title: "AI-Powered Personal Assistant",
      description: "A comprehensive AI assistant that integrates with all your devices, learns your habits, and helps manage your daily life. Features natural language processing, task automation, and predictive analytics.",
      category: "AI/ML",
      technologies: ["Python", "TensorFlow", "React Native", "Node.js", "MongoDB", "OpenAI API"],
      status: "planned",
      estimatedDuration: "6-8 months",
      complexity: "expert",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/20"
    },
    {
      id: 2,
      title: "Virtual Reality Social Platform",
      description: "A VR social networking platform where users can create avatars, attend virtual events, collaborate in 3D spaces, and build immersive communities. Think Meta but more developer-focused.",
      category: "VR/AR",
      technologies: ["Unity", "C#", "WebXR", "Three.js", "WebRTC", "AWS"],
      status: "concept",
      estimatedDuration: "12-18 months",
      complexity: "expert",
      icon: Globe,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20"
    },
    {
      id: 3,
      title: "Blockchain-Based Freelance Platform",
      description: "A decentralized freelance marketplace using smart contracts for secure payments, reputation systems, and automated dispute resolution. Eliminates middlemen and reduces fees.",
      category: "Blockchain",
      technologies: ["Solidity", "React", "Node.js", "IPFS", "Ethereum", "Web3.js"],
      status: "in-progress",
      estimatedDuration: "8-10 months",
      complexity: "advanced",
      icon: Rocket,
      color: "text-green-500",
      bgColor: "bg-green-500/20"
    },
    {
      id: 4,
      title: "AI Code Review Assistant",
      description: "An intelligent code review tool that analyzes pull requests, suggests improvements, detects bugs, and provides detailed explanations. Integrates with GitHub, GitLab, and Bitbucket.",
      category: "Developer Tools",
      technologies: ["Python", "Machine Learning", "React", "FastAPI", "PostgreSQL", "Docker"],
      status: "planned",
      estimatedDuration: "4-6 months",
      complexity: "advanced",
      icon: Code2,
      color: "text-orange-500",
      bgColor: "bg-orange-500/20"
    },
    {
      id: 5,
      title: "Smart Home Energy Management",
      description: "An IoT platform that optimizes home energy consumption using AI. Monitors all devices, predicts usage patterns, and automatically adjusts settings for maximum efficiency and cost savings.",
      category: "IoT",
      technologies: ["Python", "React Native", "MQTT", "TensorFlow", "AWS IoT", "Raspberry Pi"],
      status: "concept",
      estimatedDuration: "6-9 months",
      complexity: "intermediate",
      icon: Smartphone,
      color: "text-teal-500",
      bgColor: "bg-teal-500/20"
    },
    {
      id: 6,
      title: "Real-Time Collaborative Whiteboard",
      description: "A web-based collaborative whiteboard with real-time drawing, text, shapes, and video conferencing. Perfect for remote teams, online education, and creative brainstorming sessions.",
      category: "Collaboration",
      technologies: ["React", "Canvas API", "WebRTC", "Socket.io", "Node.js", "Redis"],
      status: "planned",
      estimatedDuration: "3-5 months",
      complexity: "intermediate",
      icon: Sparkles,
      color: "text-pink-500",
      bgColor: "bg-pink-500/20"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'text-blue-500 bg-blue-500/20';
      case 'in-progress': return 'text-yellow-500 bg-yellow-500/20';
      case 'concept': return 'text-purple-500 bg-purple-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'text-green-500';
      case 'intermediate': return 'text-yellow-500';
      case 'advanced': return 'text-orange-500';
      case 'expert': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-6 py-4">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <section className="py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        
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
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Future Vision</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Dream Projects</span> I Want to Build
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These are the ambitious projects that fuel my passion for technology. Each one represents a unique challenge 
              and an opportunity to push the boundaries of what's possible in software development.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dreamProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass rounded-xl p-8 border border-glass-border hover-lift transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Project Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${project.bgColor}`}>
                    <project.icon className={`w-6 h-6 ${project.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gradient mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 text-xs rounded-full bg-surface/50 text-foreground/70`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Details */}
                <div className="space-y-4">
                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-surface/50 text-foreground/70 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Duration</h4>
                      <p className="text-sm text-muted-foreground">{project.estimatedDuration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Complexity</h4>
                      <p className={`text-sm ${getComplexityColor(project.complexity)}`}>
                        {project.complexity.charAt(0).toUpperCase() + project.complexity.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Learn More</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface/50 text-foreground hover:bg-surface/70 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">Track Progress</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16 glass rounded-xl p-8 border border-glass-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gradient mb-4">Interested in Collaborating?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If any of these projects excite you or you'd like to work together on something amazing, 
              let's connect and turn these dreams into reality!
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 glass px-6 py-3 rounded-lg hover-lift border border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <span className="font-semibold">Get In Touch</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DreamProjects;
