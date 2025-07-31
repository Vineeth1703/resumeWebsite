import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faCode, faPaintBrush, faServer, faDatabase, faTools,
  faRobot, faMicrochip, faSatelliteDish, faSun, faMoon, faBars,
  faTimes, faExternalLinkAlt, faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ParticlesBg from './ParticlesBg'; // This component remains separate for clarity

// --- DATA ---
// All your data is now stored here at the top of the file.

const personalInfo = {
  name: "Vineeth H Kumar",
  title: "Electronics Engineer | Embedded Enthusiast | Problem Solver",
  location: "Mulki, Karnataka",
  email: "vineethkumar1703@gmail.com",
  phone: "+91 9036551579",
  avatar: "/NNM22EC205.jpg",
  resume: "/Vineeth.pdf",
  socials: [
    { name: "GitHub", url: "https://github.com/Vineeth1703", icon: faGithub },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/vineeth-h-kumar-a7858a24b/", icon: faLinkedin },
    { name: "Email", url: "mailto:vineethkumar1703@gmail.com", icon: faEnvelope },
  ],
  about: "I am an Electronics and Communication Engineering graduate with a deep passion for building intelligent embedded systems. I thrive at the intersection of hardware and software, leveraging my skills in circuit design, microcontroller programming, and IoT to create practical, smart solutions that tackle real-world challenges.",
};

const skills = [
  { name: 'Embedded C/C++', icon: faMicrochip, level: 95 },
  { name: 'Python', icon: faCode, level: 90 },
  { name: 'VLSI Design', icon: faRobot, level: 85 },
  { name: 'React.js & Web Dev', icon: faPaintBrush, level: 80 },
  { name: 'IoT & Cloud', icon: faSatelliteDish, level: 88 },
  { name: 'PCB Design (KiCad)', icon: faTools, level: 92 },
  { name: 'MATLAB/Simulink', icon: faServer, level: 85 },
  { name: 'Git & GitHub', icon: faDatabase, level: 90 },
];

const projects = [
  {
    title: 'Smart Agri-Bot',
    description: 'An IoT-powered agricultural bot using ESP32 for precision seeding, real-time soil monitoring, and automated irrigation. Increased efficiency by 40%.',
    tags: ['ESP32', 'IoT', 'C++', 'Sensors', 'Automation'],
    liveUrl: '#',
    sourceUrl: '#',
    image: 'https://placehold.co/600x400/1a1a2e/e94560?text=Agri-Bot',
  },
  {
    title: 'Real-Time Fall Detection System',
    description: 'Engineered a wearable device using MPU6050 and an ESP8266 to detect falls in real-time, sending instant alerts to caregivers via a web dashboard.',
    tags: ['MPU6050', 'IoT', 'Firebase', 'Wearable Tech'],
    liveUrl: '#',
    sourceUrl: '#',
    image: 'https://placehold.co/600x400/1a1a2e/e94560?text=Fall+Detection',
  },
  {
    title: 'FPGA Based 32-bit RISC CPU',
    description: 'Designed and implemented a 5-stage pipelined 32-bit RISC processor on a Xilinx FPGA, capable of executing a custom instruction set.',
    tags: ['Verilog', 'FPGA', 'Xilinx', 'CPU Design'],
    liveUrl: '#',
    sourceUrl: '#',
    image: 'https://placehold.co/600x400/1a1a2e/e94560?text=RISC+CPU',
  },
];

const experience = [
    {
        role: "Electronics Product Development Intern",
        company: "Experimind Labs Pvt Ltd",
        date: "June 2025 – July 2025",
        description: "Contributed to the full lifecycle of an electronics product, from schematic design and PCB layout to firmware development and testing. Developed the 'Anubhav Kit' for STEM labs.",
    },
    {
        role: "Electrical Maintenance Intern",
        company: "MESCOM",
        date: "Jul 3 2024 – Jul 20 2024",
        description: "Assisted in the daily monitoring and maintenance of a high-voltage electrical substation, gaining practical experience in power systems and safety protocols.",
    },
];

const education = [
    {
        degree: "B.Tech in Electronics & Communication",
        institution: "Nitte Mahalinga Adyanthaya Memorial Institute of Technology (NMAMIT)",
        date: "2022 - 2026",
    },
    {
        degree: "P.U.E (Pre-University Education)",
        institution: "Madeliene PU College",
        date: "2020 - 2022",
    },
     {
        degree: "SSLC",
        institution: "Bethany Engish Medium High School",
        date: "2017-2020",
    },
];

// --- Timeline Sub-Component ---
const TimelineItem = ({ data, isLeft }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="mb-8 flex justify-between items-center w-full"
      variants={itemVariants}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-pink-500 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white"></h1>
      </div>
      <div className="order-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-1 font-bold text-lg">{data.role || data.degree}</h3>
        <p className="text-sm font-medium leading-snug tracking-wide text-pink-500">{data.company || data.institution}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{data.date}</p>
        {data.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{data.description}</p>}
      </div>
    </motion.div>
  );
};


// --- Main App Component ---
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  // --- Effects ---
  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'false') {
      setDarkMode(false);
    }
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsScrollVisible(true);
      else setIsScrollVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // --- Handlers ---
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- Framer Motion Variants ---
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="text-4xl font-bold text-pink-500"
        >
          V H K
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`font-sans scroll-smooth transition-colors duration-500 ${
        darkMode ? 'bg-slate-900 text-gray-200' : 'bg-gray-100 text-gray-800'
      }`}>
      <ParticlesBg />
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm"
        >
          <div className="container mx-auto flex justify-between items-center">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="font-medium hover:text-pink-500 transition-colors">
                  {link.name}
                </a>
              ))}
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </button>
            </nav>
            <div className="md:hidden flex items-center">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </button>
              <button onClick={toggleMenu} className="z-50">
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div initial="hidden" animate="visible" exit="hidden" variants={menuVariants} className="md:hidden mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
                {navLinks.map((link) => (
                  <motion.a key={link.name} href={link.href} onClick={toggleMenu} variants={itemVariants} className="block py-2 text-center font-medium hover:text-pink-500 transition-colors">
                    {link.name}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center text-center px-4">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 }}}} className="flex flex-col items-center">
              <motion.img variants={itemVariants} src={personalInfo.avatar} alt="Avatar" className="w-40 h-40 mb-6 rounded-full border-4 border-pink-500 shadow-lg object-cover" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }} />
              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold mb-2">Hey, I'm <span className="text-pink-500">{personalInfo.name}</span></motion.h1>
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-6 max-w-2xl">{personalInfo.title}</motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
                {personalInfo.socials.map((social) => (
                  <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#ec4899' }} className="text-3xl"><FontAwesomeIcon icon={social.icon} /></motion.a>
                ))}
              </motion.div>
              <motion.a variants={itemVariants} href={personalInfo.resume} download className="inline-block px-8 py-3 bg-pink-600 text-white font-bold rounded-lg shadow-lg hover:bg-pink-700 transition-colors transform hover:scale-105">Download Resume</motion.a>
            </motion.div>
          </section>

          {/* About Section */}
          <motion.section id="about" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
            <h2 className="text-4xl font-bold mb-8 text-center">About <span className="text-pink-500">Me</span></h2>
            <div className="max-w-4xl mx-auto text-center text-lg text-gray-600 dark:text-gray-300 leading-relaxed"><p>{personalInfo.about}</p></div>
          </motion.section>

          {/* Skills Section */}
          <motion.section id="skills" className="py-24 bg-white dark:bg-slate-800" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.1 }}}}>
            <h2 className="text-4xl font-bold mb-12 text-center">My <span className="text-pink-500">Skills</span></h2>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              {skills.map((skill) => (
                <motion.div key={skill.name} className="flex flex-col items-center p-6 bg-gray-100 dark:bg-slate-900 rounded-xl shadow-lg" variants={itemVariants} whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(236, 72, 153, 0.3)" }}>
                  <FontAwesomeIcon icon={skill.icon} className="text-5xl text-pink-500 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                  <div className="w-full bg-gray-300 dark:bg-slate-700 rounded-full h-2.5">
                    <motion.div className="bg-pink-500 h-2.5 rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section id="projects" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ visible: { transition: { staggerChildren: 0.2 }}}}>
            <h2 className="text-4xl font-bold mb-12 text-center">Featured <span className="text-pink-500">Projects</span></h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project) => (
                <motion.div key={project.title} className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden group" variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 }}} whileHover={{ y: -10 }}>
                  <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (<span key={tag} className="bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex items-center gap-4">
                      <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-500 transition-colors"><FontAwesomeIcon icon={faGithub} /> Source Code</a>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-500 transition-colors"><FontAwesomeIcon icon={faExternalLinkAlt} /> Live Demo</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section id="experience" className="py-24 bg-white dark:bg-slate-800" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ visible: { transition: { staggerChildren: 0.3 }}}}>
            <h2 className="text-4xl font-bold mb-12 text-center">My <span className="text-pink-500">Journey</span></h2>
            <div className="relative wrap overflow-hidden p-10 h-full">
              <div className="border-2-2 absolute border-opacity-20 border-gray-700 dark:border-gray-300 h-full border" style={{left: '50%'}}></div>
              {experience.map((item, index) => (<TimelineItem key={index} data={item} isLeft={index % 2 === 0} />))}
              {education.map((item, index) => (<TimelineItem key={index} data={item} isLeft={(experience.length + index) % 2 === 0} />))}
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section id="contact" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
            <h2 className="text-4xl font-bold mb-4 text-center">Get In <span className="text-pink-500">Touch</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">I'm currently open to new opportunities and collaborations. Feel free to send me a message!</p>
            <form action={`https://formsubmit.co/${personalInfo.email}`} method="POST" className="max-w-xl mx-auto space-y-6">
              <input type="hidden" name="_captcha" value="false" /><input type="hidden" name="_template" value="box" />
              <motion.input whileFocus={{ scale: 1.02 }} type="text" name="name" placeholder="Your Name" required className="w-full p-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-slate-800/70 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" />
              <motion.input whileFocus={{ scale: 1.02 }} type="email" name="email" placeholder="Your Email" required className="w-full p-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-slate-800/70 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" />
              <motion.textarea whileFocus={{ scale: 1.02 }} name="message" rows="6" placeholder="Your Message" required className="w-full p-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-slate-800/70 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"></motion.textarea>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">Send Message</motion.button>
            </form>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="py-8 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
          <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
            <div className="flex justify-center gap-6 mb-4">
              {personalInfo.socials.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-pink-500 transition-colors"><FontAwesomeIcon icon={social.icon} /></a>
              ))}
            </div>
            <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
            <p className="text-sm mt-2">Built with React, Tailwind CSS, and Framer Motion.</p>
          </div>
        </footer>

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {isScrollVisible && (
            <motion.button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-pink-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-50" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FontAwesomeIcon icon={faArrowUp} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
