const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Project = require('../models/Project');
require('dotenv').config();

// Sample admin user data
const adminUser = {
  username: 'admin',
  email: 'dinesh@example.com',
  password: 'Admin123!',
  role: 'admin',
  profile: {
    firstName: 'Dinesh',
    lastName: 'TS',
    bio: 'Full-stack developer passionate about creating innovative digital solutions',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/dineshts',
      github: 'https://github.com/dineshts',
      twitter: 'https://twitter.com/dineshts',
      instagram: 'https://instagram.com/dineshts',
      youtube: 'https://youtube.com/@dineshts'
    }
  }
};

// Sample projects data
const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
    shortDescription: 'Modern e-commerce platform with React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
    ],
    liveUrl: 'https://ecommerce-demo.com',
    githubUrl: 'https://github.com/dineshts/ecommerce-platform',
    featured: true,
    status: 'completed',
    difficulty: 'advanced',
    tags: ['e-commerce', 'fullstack', 'payment', 'authentication'],
    highlights: [
      'Secure payment processing with Stripe',
      'Real-time inventory management',
      'Responsive design for all devices',
      'Admin dashboard with analytics'
    ],
    challenges: [
      'Implementing secure payment processing',
      'Managing real-time inventory updates',
      'Optimizing performance for large product catalogs'
    ],
    solutions: [
      'Used Stripe API with webhook verification',
      'Implemented WebSocket for real-time updates',
      'Added Redis caching and database indexing'
    ],
    startDate: new Date('2023-01-15'),
    endDate: new Date('2023-04-20'),
    order: 1
  },
  {
    title: 'AI Chat Assistant',
    description: 'An intelligent chatbot powered by OpenAI GPT-3.5, featuring natural language processing, context awareness, and integration with various platforms.',
    shortDescription: 'AI-powered chatbot with OpenAI integration',
    technologies: ['Python', 'OpenAI API', 'React', 'FastAPI', 'PostgreSQL', 'Redis'],
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'
    ],
    liveUrl: 'https://ai-chat-demo.com',
    githubUrl: 'https://github.com/dineshts/ai-chat-assistant',
    featured: true,
    status: 'completed',
    difficulty: 'expert',
    tags: ['ai', 'chatbot', 'openai', 'nlp'],
    highlights: [
      'Natural language understanding',
      'Context-aware conversations',
      'Multi-platform integration',
      'Real-time response generation'
    ],
    challenges: [
      'Managing API rate limits and costs',
      'Implementing context retention',
      'Handling edge cases in conversation flow'
    ],
    solutions: [
      'Implemented token management and caching',
      'Used conversation history with sliding window',
      'Added fallback responses and error handling'
    ],
    startDate: new Date('2023-05-10'),
    endDate: new Date('2023-08-15'),
    order: 2
  },
  {
    title: 'Mobile Fitness App',
    description: 'A React Native fitness tracking app with workout plans, progress tracking, and social features. Includes offline functionality and health data integration.',
    shortDescription: 'Cross-platform fitness app with React Native',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'HealthKit', 'Google Fit'],
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    liveUrl: 'https://fitness-app-demo.com',
    githubUrl: 'https://github.com/dineshts/fitness-app',
    featured: false,
    status: 'completed',
    difficulty: 'intermediate',
    tags: ['mobile', 'fitness', 'react-native', 'health'],
    highlights: [
      'Cross-platform compatibility',
      'Offline workout tracking',
      'Health data integration',
      'Social workout sharing'
    ],
    challenges: [
      'Implementing offline functionality',
      'Integrating with health platforms',
      'Optimizing performance on mobile devices'
    ],
    solutions: [
      'Used AsyncStorage and SQLite for offline data',
      'Implemented platform-specific health APIs',
      'Optimized images and reduced bundle size'
    ],
    startDate: new Date('2023-02-20'),
    endDate: new Date('2023-06-10'),
    order: 3
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing projects and skills. Built with React, TypeScript, and Tailwind CSS with 3D animations and interactive elements.',
    shortDescription: 'Modern portfolio website with 3D animations',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Vite'],
    category: 'frontend',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800'
    ],
    liveUrl: 'https://dineshts-portfolio.com',
    githubUrl: 'https://github.com/dineshts/portfolio',
    featured: true,
    status: 'completed',
    difficulty: 'intermediate',
    tags: ['portfolio', 'react', 'typescript', '3d', 'animations'],
    highlights: [
      '3D laptop model with animations',
      'Smooth scroll interactions',
      'Responsive design',
      'Performance optimized'
    ],
    challenges: [
      'Creating smooth 3D animations',
      'Optimizing performance with large assets',
      'Ensuring accessibility compliance'
    ],
    solutions: [
      'Used Three.js with proper optimization',
      'Implemented lazy loading and code splitting',
      'Added ARIA labels and keyboard navigation'
    ],
    startDate: new Date('2023-09-01'),
    endDate: new Date('2023-10-15'),
    order: 4
  },
  {
    title: 'Task Management API',
    description: 'A RESTful API for task management with user authentication, real-time updates, and advanced filtering. Built with Node.js, Express, and PostgreSQL.',
    shortDescription: 'RESTful task management API with real-time features',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'JWT', 'Redis'],
    category: 'backend',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'
    ],
    liveUrl: 'https://task-api-demo.com',
    githubUrl: 'https://github.com/dineshts/task-management-api',
    featured: false,
    status: 'completed',
    difficulty: 'intermediate',
    tags: ['api', 'backend', 'real-time', 'postgresql'],
    highlights: [
      'RESTful API design',
      'Real-time updates with WebSocket',
      'Advanced filtering and search',
      'Comprehensive documentation'
    ],
    challenges: [
      'Implementing real-time updates',
      'Optimizing database queries',
      'Handling concurrent requests'
    ],
    solutions: [
      'Used Socket.io for real-time communication',
      'Added database indexing and query optimization',
      'Implemented request queuing and rate limiting'
    ],
    startDate: new Date('2023-07-01'),
    endDate: new Date('2023-08-30'),
    order: 5
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('MongoDB connected for seeding...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed admin user
const seedAdminUser = async () => {
  try {
    // Check if admin user already exists using the new method
    const adminExists = await User.adminExists();
    if (adminExists) {
      console.log('Admin user already exists, skipping...');
      const existingAdmin = await User.getAdminUser();
      return existingAdmin;
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(adminUser.password, salt);

    // Create admin user
    const user = new User({
      ...adminUser,
      password: hashedPassword
    });

    await user.save();
    console.log('Admin user created successfully');
    return user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

// Seed projects
const seedProjects = async () => {
  try {
    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Create projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`${projects.length} projects created successfully`);
    return projects;
  } catch (error) {
    console.error('Error creating projects:', error);
    throw error;
  }
};

// Main seeding function
const seedData = async () => {
  try {
    await connectDB();
    
    console.log('Starting data seeding...');
    
    // Seed admin user
    await seedAdminUser();
    
    // Seed projects
    await seedProjects();
    
    console.log('Data seeding completed successfully!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData, seedAdminUser, seedProjects };
