import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  X, 
  MessageCircle, 
  Lightbulb,
  Code,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

/**
 * AI Assistant Component
 * Features: Chatbot interface, animated messages, smart suggestions
 */
const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Alex's AI assistant. I can help you learn more about his work, skills, or suggest project ideas. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { icon: Code, text: "Show me Alex's projects", category: "projects" },
    { icon: Lightbulb, text: "What technologies does Alex use?", category: "skills" },
    { icon: MessageCircle, text: "How can I contact Alex?", category: "contact" },
    { icon: Sparkles, text: "What makes Alex unique?", category: "about" }
  ];

  // AI Response Generator (Mock intelligent responses)
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      return "Alex has worked on 50+ projects including modern web applications, mobile apps, and AI-powered tools. His portfolio showcases expertise in React, TypeScript, Next.js, and innovative UI/UX design. Would you like me to highlight a specific project type?";
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
      return "Alex specializes in:\n• Frontend: React, TypeScript, Next.js, Tailwind CSS\n• Backend: Node.js, Python, PostgreSQL\n• Mobile: React Native, Flutter\n• AI/ML: TensorFlow, OpenAI APIs\n• Design: Figma, Adobe Creative Suite\n\nHe's passionate about emerging technologies and AI integration!";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
      return "You can reach Alex through:\n• Email: alex@example.com\n• LinkedIn: /in/alexsmith\n• GitHub: /alexsmith\n\nHe's currently available for freelance projects and full-time opportunities. Feel free to reach out for collaborations!";
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return "Alex has 3+ years of professional development experience, specializing in creating innovative digital solutions. He started coding at 16 and has since worked with startups and enterprises, always focusing on user-centric design and cutting-edge technology.";
    }
    
    if (lowerMessage.includes('unique') || lowerMessage.includes('different') || lowerMessage.includes('special')) {
      return "What sets Alex apart:\n• AI-first approach to development\n• Obsession with user experience\n• Rapid prototyping and iteration\n• Strong design sensibility\n• Continuous learning mindset\n\nHe combines technical expertise with creative vision to build truly exceptional products!";
    }
    
    // Default response with suggestions
    return "That's a great question! I'd love to help you learn more about Alex. You could ask me about his projects, technical skills, experience, or how to get in touch with him. What interests you most?";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-primary rounded-full shadow-glow-primary flex items-center justify-center hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      >
        <Bot className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] glass rounded-2xl border border-glass-border shadow-glass overflow-hidden"
            initial={{ scale: 0, opacity: 0, originX: 1, originY: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-glass-border bg-surface/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything about Alex</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'glass border border-glass-border'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="glass border border-glass-border p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-glass-border">
                <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion.text}
                      onClick={() => handleSendMessage(suggestion.text)}
                      className="text-left p-2 glass rounded-lg hover:bg-surface/50 transition-colors duration-200 text-xs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2">
                        <suggestion.icon className="w-3 h-3 text-primary" />
                        <span>{suggestion.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-glass-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;