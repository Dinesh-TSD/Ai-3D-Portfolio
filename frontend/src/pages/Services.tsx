import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Smartphone, 
  Palette, 
  Database, 
  Globe, 
  Zap,
  Shield,
  Clock,
  Users,
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  features: string[];
  duration: string;
  price: string;
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom web applications built with modern technologies. From simple landing pages to complex web applications with full-stack functionality.",
      icon: Code2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
      features: [
        "Responsive Design",
        "Modern Frameworks (React, Next.js)",
        "Performance Optimization",
        "SEO Optimization",
        "Cross-browser Compatibility",
        "Clean & Maintainable Code"
      ],
      duration: "2-8 weeks",
      price: "$1,500 - $8,000"
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android. Built with React Native for maximum efficiency and performance.",
      icon: Smartphone,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
      features: [
        "iOS & Android Development",
        "React Native Cross-platform",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
        "Performance Monitoring"
      ],
      duration: "4-12 weeks",
      price: "$3,000 - $15,000"
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces designed with user experience in mind. From wireframes to high-fidelity prototypes.",
      icon: Palette,
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Visual Design",
        "User Testing",
        "Design Systems",
        "Interactive Prototypes"
      ],
      duration: "1-4 weeks",
      price: "$800 - $3,500"
    },
    {
      id: 4,
      title: "Backend Development",
      description: "Robust server-side applications and APIs built with Node.js, Python, and modern databases. Scalable and secure solutions.",
      icon: Database,
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
      features: [
        "RESTful APIs",
        "Database Design",
        "Authentication & Security",
        "Cloud Deployment",
        "Performance Optimization",
        "API Documentation"
      ],
      duration: "2-6 weeks",
      price: "$1,200 - $6,000"
    },
    {
      id: 5,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with payment integration, inventory management, and customer analytics.",
      icon: Globe,
      color: "text-teal-500",
      bgColor: "bg-teal-500/20",
      features: [
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Processing",
        "Customer Analytics",
        "Multi-vendor Support",
        "Mobile Commerce"
      ],
      duration: "6-16 weeks",
      price: "$5,000 - $20,000"
    },
    {
      id: 6,
      title: "AI Integration",
      description: "Intelligent features and automation using AI and machine learning. Chatbots, recommendation systems, and data analysis.",
      icon: Zap,
      color: "text-pink-500",
      bgColor: "bg-pink-500/20",
      features: [
        "Chatbot Development",
        "Recommendation Systems",
        "Data Analysis",
        "Natural Language Processing",
        "Machine Learning Models",
        "AI-powered Automation"
      ],
      duration: "3-10 weeks",
      price: "$2,500 - $12,000"
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
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
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">What I Offer</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Services</span> I Provide
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive web development and design services tailored to your needs. 
            From concept to deployment, I handle every aspect of your digital project.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="glass rounded-xl p-8 border border-glass-border hover-lift transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Service Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${service.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gradient">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.duration}</p>
                </div>
              </div>

              {/* Service Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Features
                </h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-lg font-bold text-primary">{service.price}</p>
                </div>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium">Get Quote</span>
                  <ArrowRight className="w-4 h-4" />
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
          <h3 className="text-2xl font-bold text-gradient mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss your requirements and create something amazing together. 
            I'm here to help bring your vision to life.
          </p>
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-lg hover-lift border border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <span className="font-semibold">Get In Touch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
