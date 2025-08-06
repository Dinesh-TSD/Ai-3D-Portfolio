import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaDocker, FaNodeJs, FaFigma, FaGithub, FaBrain, FaRegImage, FaDatabase, FaServer, FaVial, FaCode, FaPalette, FaTools, FaLaptopCode, FaRegCommentDots } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiExpress, SiMongodb, SiMysql, SiPostman, SiOpenai, SiGithubcopilot, SiAnthropic } from 'react-icons/si';
import { MdBuild } from 'react-icons/md';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <FaCode className="w-6 h-6" />,
      skills: [
        { name: "HTML5", icon: <FaHtml5 className="w-6 h-6" /> },
        { name: "CSS3", icon: <FaCss3Alt className="w-6 h-6" /> },
        { name: "JavaScript", icon: <FaJs className="w-6 h-6" /> },
        { name: "React", icon: <FaReact className="w-6 h-6" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-6 h-6" /> },
        { name: "Vite", icon: <SiVite className="w-6 h-6" /> }
      ]
    },
    {
      title: "Backend",
      icon: <FaDatabase className="w-6 h-6" />,
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="w-6 h-6" /> },
        { name: "Express.js", icon: <SiExpress className="w-6 h-6" /> },
        { name: "MongoDB", icon: <SiMongodb className="w-6 h-6" /> },
        { name: "MySQL", icon: <SiMysql className="w-6 h-6" /> }
      ]
    },
    {
      title: "Tools",
      icon: <FaTools className="w-6 h-6" />,
      skills: [
        { name: "Git", icon: <FaGitAlt className="w-6 h-6" /> },
        { name: "VS Code", icon: <FaLaptopCode className="w-6 h-6" /> },
        { name: "Figma", icon: <FaFigma className="w-6 h-6" /> },
        { name: "Postman", icon: <SiPostman className="w-6 h-6" /> },
        { name: "Docker", icon: <FaDocker className="w-6 h-6" /> }
      ]
    },
    {
      title: "AI Tools",
      icon: <FaBrain className="w-6 h-6" />,
      skills: [
        { name: "ChatGPT", icon: <SiOpenai className="w-6 h-6" /> },
        { name: "GitHub Copilot", icon: <SiGithubcopilot className="w-6 h-6" /> },
        { name: "Claude", icon: <SiAnthropic className="w-6 h-6" /> },
        { name: "Midjourney", icon: <FaRegImage className="w-6 h-6" /> }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Skills</span> & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass p-6 rounded-xl border border-glass-border hover:border-primary/30 transition-all duration-300 hover-lift"
              variants={itemVariants}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

                             {/* Skills List */}
               <div className="grid grid-cols-2 gap-4">
                 {category.skills.map((skill, skillIndex) => (
                   <motion.div
                     key={skill.name}
                     className="glass p-4 rounded-lg border border-glass-border hover:border-primary/30 transition-all duration-300 group"
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ 
                       delay: categoryIndex * 0.1 + skillIndex * 0.05,
                       duration: 0.5,
                       ease: "easeOut"
                     }}
                     whileHover={{ 
                       scale: 1.05,
                       y: -5,
                       transition: { duration: 0.2 }
                     }}
                   >
                     <div className="flex flex-col items-center gap-3 text-center">
                       <motion.div
                         className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors duration-300"
                         whileHover={{ 
                           rotate: 360,
                           transition: { duration: 0.6, ease: "easeInOut" }
                         }}
                       >
                         {skill.icon}
                       </motion.div>
                       <span className="text-sm font-medium">{skill.name}</span>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6">Other Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "TypeScript", "Next.js", "Redux", "GraphQL", "REST APIs",
              "JWT", "OAuth", "AWS", "Vercel", "Netlify", "Jest",
              "Cypress", "Webpack", "Babel", "ESLint", "Prettier"
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="glass px-4 py-2 rounded-full text-sm border border-glass-border hover:border-primary/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 