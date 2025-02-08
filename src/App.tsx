import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, GraduationCap, User, Send, Menu, X, FileText } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formRef.current) return;
  
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
  
    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) throw new Error('Failed to send message');
      
      toast.success('Message sent successfully!');
      formRef.current.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="bottom-right" />

      {/* Header Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold"
            >
              Pratik<span className="text-blue-400">.</span>
            </motion.h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: 'About', id: 'about' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Education', id: 'education' },
                { name: 'Resume', id: 'resume' },
                { name: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900 border-t border-gray-800"
            >
              <nav className="container mx-auto px-6 py-4 space-y-4">
                {[
                  { name: 'About', id: 'about' },
                  { name: 'Skills', id: 'skills' },
                  { name: 'Projects', id: 'projects' },
                  { name: 'Education', id: 'education' },
                  { name: 'Resume', id: 'resume' },
                  { name: 'Contact', id: 'contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/70" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold mb-6">Pratik Sindhiya</h1>
            <div className="text-2xl mb-8 text-blue-400">
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer',
                  2000,
                  'B.Tech Student at IIIT Vadodara',
                  2000,
                  'Open Source Contributor',
                  2000,
                ]}
                repeat={Infinity}
              />
            </div>
            <div className="flex gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/PRATIKSINDHIYA"
                className="bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/pratiksindhiya/"
                className="bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-20" id="about">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <User className="text-blue-400" size={32} />
              <h2 className="text-4xl font-bold">About Me</h2>
            </div>
            <div className="max-w-3xl">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                I'm a passionate Full-Stack Developer and B.Tech student at IIIT Vadodara, specializing in building exceptional digital experiences. With expertise in React.js, JavaScript, and Web Development, I create efficient and scalable solutions that solve real-world problems.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-800" id="skills">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <Code2 className="text-blue-400" size={32} />
              <h2 className="text-4xl font-bold">Skills</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  "title": "Programming Languages",
                  "skills": ["JavaScript", "Python", "Java", "C", "HTML", "CSS"]
                },
                {
                  "title": "Frameworks & Libraries",
                  "skills": ["React.js", "Node.js", "Express.js", "Bootstrap", "TailwindCSS" , "Next.js"]
                },
                {
                  "title": "Tools & Technologies",
                  "skills": ["VS Code", "Postman", "MongoDB", "MySQL", "Oracle", "SQL"]
                }
              ]
                .map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-gray-900 p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">{category.title}</h3>
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="bg-gray-800 rounded-lg p-3">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20" id="projects">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <Briefcase className="text-blue-400" size={32} />
              <h2 className="text-4xl font-bold">Projects</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
  {
    "title": "Pixabay Image Search",
    "description": "A responsive image search application using the Pixabay API with advanced filtering and infinite scroll",
    "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055",
    "link": "https://github.com/PRATIKSINDHIYA/PixabaySearcher"
  },
  {
    "title": "Railway Management System",
    "description": "Full-stack railway booking and management system with real-time tracking",
    "image": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2084",
    "link": "https://github.com/PRATIKSINDHIYA/RailwayManagementSystem"
  },
  {
    "title": "Gemini-Ai Clone",
    "description": "A clone of Gemini-Ai featuring AI-powered capabilities",
    "image": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/final_keyword_header.width-1200.format-webp.webp",
    "link": "https://github.com/PRATIKSINDHIYA/Gemini-Ai_Clone"
  },
  {
    "title": "Firebase Student Portal",
    "description": "A student portal built using Firebase with authentication and real-time database features",
    "image": "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2084",
    "link": "https://github.com/PRATIKSINDHIYA/FirebaseStudentPortal"
  },
  {
    "title": "ListenUp Web Player",
    "description": "A web-based music player that allows users to stream and play music",
    "image": "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=2084",
    "link": "https://github.com/PRATIKSINDHIYA/ListenUpWebPlayer"
  },
  {
    "title": "Weather Forecasting",
    "description": "A weather forecasting application that provides real-time weather updates and future predictions",
    "image": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2084",
    "link": "https://github.com/PRATIKSINDHIYA/All_FrontendProject/tree/main/Weather_Forecasting"
  }
]
.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300"
                    >
                      View Project <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-gray-800" id="education">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <GraduationCap className="text-blue-400" size={32} />
              <h2 className="text-4xl font-bold">Education & Achievements</h2>
            </div>
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900 p-6 rounded-xl mb-8"
              >
                <h3 className="text-xl font-semibold mb-2">INDIAN INSTITUTE OF INFORMATION TECHNOLOGY VADODARA,GUJARAT</h3>
                <h3 className="text-xl font-semibold mb-2">B.Tech in Computer Science</h3>
                <p className="text-gray-400">IIIT Vadodara | 2022 - 2026</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900 p-6 rounded-xl mb-8"
              >
                <h3 className="text-xl font-semibold mb-2">SHRI BAJPAI CONVENT HIGHER SECONDARY SCHOOL</h3>
                <p className="text-gray-400">Senior Secondary Education (2021)</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-900 p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-4">ACHIEVEMENTS</h3>
                <ul className="space-y-3 text-gray-300">
                  {/* <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Published research paper on ML algorithms
                  </li> */}
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Open Source Contributor
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Secured 1st place in school chess competitions
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-20 bg-gray-800" id="resume">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <FileText className="text-blue-400" size={32} />
              <h2 className="text-4xl font-bold">Resume</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900 rounded-xl p-8 space-y-8">
                {/* Summary */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Professional Summary</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Full-Stack Developer and B.Tech student at IIIT Vadodara, specializing in React.js, JavaScript, and Web Development. Experienced in building responsive web applications with user-friendly interfaces. Currently enhancing backend development skills with Express.js and MongoDB.
                  </p>
                </div>

                {/* Technical Skills */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Technical Skills</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white mb-2">Programming Languages</h4>
                      <p className="text-gray-300">HTML, CSS, JavaScript, Python, Java, C, SQL</p>
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Frameworks & Libraries</h4>
                      <p className="text-gray-300">React.js, Redux, Tailwind CSS, Bootstrap, Express.js (Basic), Node.js (Basic)</p>
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Tools & Platforms</h4>
                      <p className="text-gray-300">Git, GitHub, Postman, Figma, Excel</p>
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Core Concepts</h4>
                      <p className="text-gray-300">Web Development, Data Structures and Algorithms</p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white">B.Tech in Computer Science</h4>
                      <p className="text-gray-400">Indian Institute of Information Technology Vadodara, Gujarat</p>
                      <p className="text-gray-400">2020 - Present | CPI: 6.5</p>
                    </div>
                    <div>
                      <h4 className="text-white">Senior Secondary Education</h4>
                      <p className="text-gray-400">Shri Bajpai Convent Higher Secondary School</p>
                      <p className="text-gray-400">(2021)</p>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="pt-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/src/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    <FileText size={18} />
                    Download Resume
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" id="contact">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <Mail className="text-blue-400" size={32} />
              <h2 className="text-4xl font-bold">Get in Touch</h2>
            </div>
            <div className="max-w-xl mx-auto">
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  Send Message <Send size={18} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Pratik Sindhiya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;