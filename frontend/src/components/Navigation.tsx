import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code, Mail, Shield, Zap, Star, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Navigation Component
 * Features: Glassmorphism design, mobile responsive, smooth animations
 */
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Hero', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'pricing', label: 'Pricing', icon: Star },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6">
          <div className={`glass rounded-2xl px-6 py-4 transition-all duration-300 ${
            scrolled ? 'shadow-glass border-glass-border' : ''
          }`}>
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <motion.div 
                className="text-xl font-bold text-gradient cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('hero')}
              >
                &lt;DST/&gt;
              </motion.div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-4 h-4 group-hover:text-primary transition-colors duration-300" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Admin Button */}
              <motion.button 
                onClick={() => navigate('/admin/login')}
                className="glass px-4 py-2 rounded-lg hover-lift border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary group-hover:text-primary-light transition-colors duration-300" />
                  <span className="hidden sm:inline text-sm font-medium">Admin</span>
                </div>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden glass p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="absolute top-20 left-6 right-6 glass rounded-2xl p-6 border border-glass-border"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-surface/50 transition-colors duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5 text-primary group-hover:text-primary-light transition-colors duration-300" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Admin Dashboard Navbar (fixed, glassmorphic, for admin pages only)
export const AdminNavbar: React.FC<{ onLogout?: () => void; user?: any }> = ({ onLogout, user }) => (
  <nav className="glass glass-border border-b border-slate-700/50 p-4 flex items-center justify-between rounded-lg fixed top-0 left-0 right-0 z-40" style={{height:'4rem'}}>
    <div className="flex items-center gap-3">
      <span className="text-xl font-bold text-gradient">Admin Dashboard</span>
      {user && <span className="text-sm text-muted-foreground ml-2">Welcome back, {user.profile?.firstName}</span>}
    </div>
    {onLogout && (
      <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-red-900/40 text-red-400 border border-red-400/20 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
        <span>Logout</span>
      </button>
    )}
  </nav>
);

export default Navigation;