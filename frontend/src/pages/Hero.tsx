import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Sparkles, Linkedin, Instagram, Github } from 'lucide-react';
import Laptop3D from '../components/Laptop3D';
import { useTypewriter } from '../hooks/useTypewriter';


const Hero: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const roles = [
    'MERN Stack Developer',
    'Full-Stack Developer',
    'React Developer',
    'Node.js Developer',
    'UI/UX Designer'
  ];
  const role = useTypewriter(roles, 80, true);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full blur-sm"
        animate={{
          y: [-20, 20, -20],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-6 h-6 bg-secondary rounded-full blur-sm"
        animate={{
          y: [20, -20, 20],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent rounded-full blur-sm"
        animate={{
          x: [-10, 10, -10],
          y: [-10, 10, -10],
          opacity: [0.2, 0.7, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-6 relative z-10 mt-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 mt-5 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-gradient text-shadow-glow">Dinesh TS</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
                {role}
                <span className="inline-block w-2 h-6 bg-primary align-middle animate-pulse ml-1 rounded-sm" />
              </span>
            </motion.h1>


            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Crafting beautiful, scalable web applications with cutting-edge technologies.
              Passionate about creating exceptional user experiences through innovative design and clean code.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button className="glass px-8 py-4 rounded-lg hover-lift group transition-all duration-300 border border-primary/20 hover:border-primary/40"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  projectsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  <span className="font-semibold">View My Work</span>
                </div>
              </button>

              <button className="glass px-8 py-4 rounded-lg hover-lift transition-all duration-300 border border-glass-border hover:border-secondary/40">
                <span className="font-semibold">Get In Touch</span>
              </button>

              <a
                href="/resume.pdf"
                download="Dinesh_TS_Resume.pdf"
                className="glass px-8 py-4 rounded-lg hover-lift transition-all duration-300 border border-accent/20 hover:border-accent/40 group"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-semibold">Download Resume</span>
                </div>
              </a>
            </motion.div>
            
            {/* Social Icons */}
            <motion.div
              className="flex gap-10 justify-center my-6 "
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-7 h-7 text-primary hover:text-primary-light transition-colors duration-300 hover:scale-110" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-7 h-7 text-primary hover:text-primary-light transition-colors duration-300 hover:scale-110" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-7 h-7 text-primary hover:text-primary-light transition-colors duration-300 hover:scale-110" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6  pt-4 border-t border-glass-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">1+</div>
                <div className="text-sm text-muted-foreground">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Laptop */}
          <motion.div
            className="h-96 lg:h-[500px] relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <Laptop3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary hover:text-primary-light transition-colors duration-300"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
};

export default Hero;