import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Zap, 
  Crown, 
  Check, 
  X, 
  ArrowRight,
  Clock,
  Users,
  Shield,
  Target,
  Sparkles
} from 'lucide-react';

interface PricingTier {
  id: number;
  name: string;
  description: string;
  price: number;
  period: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  features: {
    text: string;
    included: boolean;
  }[];
  popular?: boolean;
}

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers: PricingTier[] = [
    {
      id: 1,
      name: "Starter",
      description: "Perfect for small projects and startups",
      price: isAnnual ? 800 : 1000,
      period: isAnnual ? "year" : "project",
      icon: Star,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
      features: [
        { text: "Single Page Website", included: true },
        { text: "Responsive Design", included: true },
        { text: "Basic SEO Setup", included: true },
        { text: "Contact Form", included: true },
        { text: "Social Media Integration", included: true },
        { text: "1 Month Support", included: true },
        { text: "Custom Domain Setup", included: false },
        { text: "Advanced Analytics", included: false },
        { text: "Priority Support", included: false },
        { text: "Content Management System", included: false }
      ]
    },
    {
      id: 2,
      name: "Professional",
      description: "Ideal for growing businesses",
      price: isAnnual ? 2400 : 3000,
      period: isAnnual ? "year" : "project",
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
      popular: true,
      features: [
        { text: "Multi-page Website", included: true },
        { text: "Responsive Design", included: true },
        { text: "Advanced SEO Optimization", included: true },
        { text: "Contact Form & Newsletter", included: true },
        { text: "Social Media Integration", included: true },
        { text: "3 Months Support", included: true },
        { text: "Custom Domain Setup", included: true },
        { text: "Google Analytics", included: true },
        { text: "Priority Support", included: true },
        { text: "Basic CMS", included: true }
      ]
    },
    {
      id: 3,
      name: "Enterprise",
      description: "For large-scale projects and enterprises",
      price: isAnnual ? 8000 : 10000,
      period: isAnnual ? "year" : "project",
      icon: Crown,
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
      features: [
        { text: "Full-stack Web Application", included: true },
        { text: "Custom Design & Branding", included: true },
        { text: "Advanced SEO & Marketing", included: true },
        { text: "User Authentication System", included: true },
        { text: "Database Integration", included: true },
        { text: "6 Months Support", included: true },
        { text: "Custom Domain & SSL", included: true },
        { text: "Advanced Analytics & Reports", included: true },
        { text: "24/7 Priority Support", included: true },
        { text: "Full CMS with Admin Panel", included: true }
      ]
    }
  ];

  const additionalServices = [
    {
      title: "Maintenance & Support",
      description: "Ongoing website maintenance and technical support",
      price: "$200/month",
      icon: Shield
    },
    {
      title: "Performance Optimization",
      description: "Speed optimization and performance improvements",
      price: "$500",
      icon: Zap
    },
    {
      title: "SEO Services",
      description: "Search engine optimization and content strategy",
      price: "$300/month",
      icon: Target
    },
    {
      title: "Content Creation",
      description: "Professional content writing and copywriting",
      price: "$150/page",
      icon: Sparkles
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
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
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Pricing Plans</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Transparent</span> Pricing
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your project. All plans include quality assurance, 
            responsive design, and ongoing support.
          </p>

          {/* Billing Toggle */}
          <motion.div 
            className="inline-flex items-center gap-4 glass px-6 py-3 rounded-full border border-glass-border"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className={`text-sm font-medium transition-colors duration-300 ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Per Project
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-primary' : 'bg-surface/50'
              }`}
            >
              <motion.div
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                animate={{ x: isAnnual ? 24 : 2 }}
                transition={{ duration: 0.3 }}
              />
            </button>
            <span className={`text-sm font-medium transition-colors duration-300 ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Annual (20% off)
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className={`relative glass rounded-xl p-8 border transition-all duration-300 ${
                tier.popular 
                  ? 'border-primary/40 bg-primary/5 scale-105' 
                  : 'border-glass-border hover:border-primary/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: tier.popular ? 1.07 : 1.02 }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="px-4 py-1 text-xs bg-primary text-white rounded-full font-medium">
                    Most Popular
                  </span>
                </motion.div>
              )}

              {/* Tier Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${tier.bgColor} mb-4`}>
                  <tier.icon className={`w-6 h-6 ${tier.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gradient mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-foreground">${tier.price}</span>
                  <span className="text-muted-foreground">/{tier.period}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                  >
                    {feature.included ? (
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  tier.popular
                    ? 'bg-primary text-white hover:bg-primary-light'
                    : 'glass border border-primary/20 text-primary hover:border-primary/40'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gradient mb-4">Additional Services</h3>
          <p className="text-muted-foreground mb-8">
            Need something specific? I offer additional services to enhance your project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-6 border border-glass-border hover-lift transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{service.title}</h4>
                  <p className="text-lg font-bold text-primary">{service.price}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 glass rounded-xl p-8 border border-glass-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gradient mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss your project requirements and find the perfect solution for your needs. 
            I'm here to help you succeed.
          </p>
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-lg hover-lift border border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <span className="font-semibold">Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
