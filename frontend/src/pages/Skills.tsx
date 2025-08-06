import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaDocker, FaNodeJs, FaFigma, FaGithub, FaBrain, FaRegImage, FaDatabase, FaServer, FaVial, FaCode, FaPalette, FaTools, FaLaptopCode, FaRegCommentDots } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiExpress, SiMongodb, SiMysql, SiPostman, SiOpenai, SiGithubcopilot, SiAnthropic } from 'react-icons/si';
import { MdBuild } from 'react-icons/md';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      description: "Modern web technologies and frameworks",
      icon: FaLaptopCode,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
      skills: [
        { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
        { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
        { name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
        { name: "React", icon: FaReact, color: "text-cyan-500" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-500" },
        { name: "Vite", icon: SiVite, color: "text-purple-500" },
      ]
    },
    {
      title: "Backend Development",
      description: "Server-side technologies and databases",
      icon: FaServer,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
        { name: "Express.js", icon: SiExpress, color: "text-gray-600" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
        { name: "MySQL", icon: SiMysql, color: "text-blue-600" },
        { name: "Postman", icon: SiPostman, color: "text-orange-500" },
      ]
    },
    {
      title: "Development Tools",
      description: "Essential tools for modern development",
      icon: FaTools,
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
        { name: "GitHub", icon: FaGithub, color: "text-gray-800" },
        { name: "Docker", icon: FaDocker, color: "text-blue-600" },
        { name: "Figma", icon: FaFigma, color: "text-purple-600" },
        { name: "VS Code", icon: FaCode, color: "text-blue-500" },
      ]
    },
    {
      title: "AI & Machine Learning",
      description: "Artificial intelligence and automation tools",
      icon: FaBrain,
      color: "text-pink-500",
      bgColor: "bg-pink-500/20",
      skills: [
        { name: "OpenAI", icon: SiOpenai, color: "text-green-600" },
        { name: "GitHub Copilot", icon: SiGithubcopilot, color: "text-blue-500" },
        { name: "Claude", icon: SiAnthropic, color: "text-orange-500" },
        { name: "AI Integration", icon: FaBrain, color: "text-purple-500" },
      ]
    }
  ];

  return (
    <section id="skills" className="min-h-screen bg-gradient-to-br from-background via-surface to-background pt-8 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
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
            <FaBrain className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">My Skills</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Skills & Technologies</span> I Master
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of the technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="glass rounded-xl p-6 border border-glass-border hover-lift transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${category.bgColor}`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gradient">{category.title}</h3>
                  <p className="text-sm text-foreground/70">{category.description}</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-surface/30 border border-glass-border hover:bg-surface/50 transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <skill.icon className={`w-5 h-5 ${skill.color}`} />
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div
          className="mt-16 glass rounded-xl p-8 border border-glass-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gradient mb-2">Additional Expertise</h2>
            <p className="text-foreground/70">Other skills and areas of knowledge</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "UI/UX Design", icon: FaPalette, color: "text-pink-500" },
              { name: "Image Processing", icon: FaRegImage, color: "text-green-500" },
              { name: "Testing", icon: FaVial, color: "text-purple-500" },
              { name: "Communication", icon: FaRegCommentDots, color: "text-blue-500" },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-surface/30 border border-glass-border hover:bg-surface/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (index * 0.1), duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <skill.icon className={`w-6 h-6 ${skill.color}`} />
                <span className="text-sm font-medium text-center text-foreground">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
