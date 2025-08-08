import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Coffee } from 'lucide-react';

/**
 * Footer Component
 * Features: Minimal design, animated elements, social links
 */
const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 border-t border-glass-border">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-radial opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo/Branding */}
          <motion.div 
            className="text-xl font-bold text-gradient"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            &lt;DST/&gt;
          </motion.div>

          {/* Copyright & Credits */}
          <motion.div 
            className="flex items-center gap-2 text-muted-foreground text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>© 2025 DINESH Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.div>
            <span>AI,</span>
            <Code className="w-4 h-4 text-primary" />
            <span>and</span>
            <Coffee className="w-4 h-4 text-amber-400" />
          </motion.div>

          {/* Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass px-4 py-2 rounded-lg hover-lift text-sm font-medium transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top ↑
          </motion.button>
        </div>

        {/* Decorative Line */}
        <motion.div 
          className="w-full h-px bg-gradient-primary opacity-30 mt-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </div>
    </footer>
  );
};

export default Footer;