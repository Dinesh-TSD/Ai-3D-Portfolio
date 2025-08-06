import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Rocket, 
  Target, 
  Lightbulb,
  Code2,
  Palette,
  Database,
  Smartphone
} from 'lucide-react';

/**
 * About Section Component
 * Features: Animated skill cards, floating elements, responsive grid
 */
const About: React.FC = () => {
  const skills = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'React, TypeScript, Next.js, Tailwind CSS',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Node.js, Python, PostgreSQL, MongoDB',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'React Native, Flutter, iOS, Android',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Figma, Adobe XD, Sketch, Prototyping',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Always exploring new technologies and creative solutions'
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Building fast, scalable, and efficient applications'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Attention to detail in every line of code and pixel'
    },
    {
      icon: Lightbulb,
      title: 'Creativity',
      description: 'Bringing unique ideas to life through design and code'
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
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
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">About Me</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Passionate Developer</span> with a 
            <br className="hidden sm:block" />
            Vision for the Future
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm a full-stack developer with 3+ years of experience creating digital experiences 
            that combine beautiful design with powerful functionality. I love turning complex 
            problems into simple, elegant solutions.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Story Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass p-8 rounded-2xl hover-lift">
              <h3 className="text-xl font-bold mb-4 text-gradient">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Started coding at 16, fascinated by the power to create anything imaginable. 
                What began as curiosity evolved into a deep passion for crafting digital experiences 
                that make people's lives better.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, I specialize in modern web technologies, AI integration, and creating 
                applications that are not just functional, but truly delightful to use.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl hover-lift">
              <h3 className="text-xl font-bold mb-4 text-gradient">Current Focus</h3>
              <p className="text-muted-foreground leading-relaxed">
                Currently exploring the intersection of AI and web development, building intelligent 
                applications that enhance user experiences. Always learning, always growing, 
                always pushing the boundaries of what's possible.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl hover-lift">
              <h3 className="text-xl font-bold mb-4 text-gradient">My Dream</h3>
              <p className="text-muted-foreground leading-relaxed">
                My dream is to bridge the gap between imagination and innovation — to build digital experiences that not only function but feel alive. I want to create AI-integrated, 3D-powered applications that solve real problems, empower people, and make technology more human.
              </p>
            </div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glass p-6 rounded-xl hover-lift text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            <span className="text-gradient">Technical Expertise</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="glass p-6 rounded-xl hover-lift text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 ${skill.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <skill.icon className={`w-8 h-8 ${skill.color}`} />
                </div>
                <h4 className="font-bold mb-2">{skill.title}</h4>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 right-20 w-3 h-3 bg-secondary rounded-full blur-sm"
        animate={{ 
          y: [-15, 15, -15],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-32 left-16 w-4 h-4 bg-accent rounded-full blur-sm"
        animate={{ 
          x: [-10, 10, -10],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
};

export default About;