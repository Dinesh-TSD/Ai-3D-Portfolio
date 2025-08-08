import React from 'react';
import Navigation from '../components/Navigation';
import Hero from './Hero';
import About from './About';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import Skills from './Skills';
import Services from './Services';
import Projects from './Projects';
import Pricing from './Pricing';
import Contact from './Contact';

/**
 * Main Portfolio Page
 * Features: Full-page sections, smooth scroll, 3D elements, AI assistant
 */
const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section with 3D Laptop */}
        <Hero />
        
        {/* About Section */}
        <About />
        
        {/* Skills Section */}
        <Skills />
        
        {/* Services Section */}
        <Services />
        
        {/* Projects Showcase */}
        <Projects />
        
        {/* Pricing Section */}
        <Pricing />
        
        {/* Contact Section */}
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* AI Assistant Chatbot */}
      <AIAssistant />
    </div>
  );
};

export default Index;
