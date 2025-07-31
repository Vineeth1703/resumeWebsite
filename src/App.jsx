import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faCode, faPaintBrush, faServer, faDatabase, faTools,
  faRobot, faMicrochip, faSatelliteDish, faSun, faMoon, faBars,
  faTimes, faExternalLinkAlt, faArrowUp, faTimesCircle, faQuoteLeft,
  faLightbulb, faPencilRuler, faLaptopCode, faRocket
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { TypeAnimation } from 'react-type-animation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

// --- DATA ---
const personalInfo = {
  name: "Vineeth H Kumar",
  title: "Electronics Engineer | Embedded Enthusiast | Problem Solver",
  avatar: "/NNM22EC205.jpg",
  resume: "/Vineeth.pdf",
  email: "vineethkumar1703@gmail.com",
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
    description: 'An IoT-powered agricultural bot using ESP32 for precision seeding, real-time soil monitoring, and automated irrigation. This project involved complex sensor integration, motor control, and cloud data transmission, resulting in a 40% increase in operational efficiency compared to manual methods.',
    tags: ['ESP32', 'IoT', 'C++', 'Sensors', 'Automation', 'Firebase'],
    liveUrl: '#',
    sourceUrl: '#',
    image: 'https://placehold.co/600x400/166534/ecfdf5?text=Agri-Bot',
  },
  {
    title: 'Real-Time Fall Detection System',
    description: 'Engineered a wearable device using an MPU6050 accelerometer/gyroscope and an ESP8266 microcontroller. The system uses a custom algorithm to detect falls with 98% accuracy and sends instant alerts to caregivers via a real-time web dashboard built with React and Firebase.',
    tags: ['MPU6050', 'IoT', 'Firebase', 'React', 'Wearable Tech'],
    liveUrl: '#',
    sourceUrl: '#',
    image: 'https://placehold.co/600x400/166534/ecfdf5?text=Fall+Detection',
  },
  {
    title: 'FPGA Based 32-bit RISC CPU',
    description: 'Designed and implemented a 5-stage pipelined 32-bit RISC processor on a Xilinx Artix-7 FPGA. The project involved writing the entire architecture in Verilog, simulating instruction execution, and successfully running benchmark programs on the synthesized hardware.',
    tags: ['Verilog', 'FPGA', 'Xilinx', 'CPU Design', 'Pipelining'],
    liveUrl: '#',
    sourceUrl: '#',
    image: 'https://placehold.co/600x400/166534/ecfdf5?text=RISC+CPU',
  },
];

const experience = [
    { role: "Electronics Product Development Intern", company: "Experimind Labs Pvt Ltd", date: "June 2025 – July 2025", description: "Contributed to the full lifecycle of an electronics product, from schematic design and PCB layout to firmware development and testing. Developed the 'Anubhav Kit' for STEM labs." },
    { role: "Electrical Maintenance Intern", company: "MESCOM", date: "Jul 3 2024 – Jul 20 2024", description: "Assisted in the daily monitoring and maintenance of a high-voltage electrical substation, gaining practical experience in power systems and safety protocols." },
];

const education = [
    { degree: "B.Tech in Electronics & Communication", institution: "Nitte Mahalinga Adyanthaya Memorial Institute of Technology (NMAMIT)", date: "2022 - 2026" },
    { degree: "P.U.E (Pre-University Education)", institution: "Madeliene PU College", date: "2020 - 2022" },
    { degree: "SSLC", institution: "Bethany Engish Medium High School", date: "2017-2020" },
];

const processSteps = [
    { id: 'discover', title: 'Discovery', icon: faLightbulb, description: "It all starts with an idea. I work closely with stakeholders to understand the core problem, define project goals, and map out the requirements for a successful outcome." },
    { id: 'design', title: 'Design', icon: faPencilRuler, description: "In this phase, I create system architectures, schematic diagrams, and user flow maps. The goal is to build a robust and scalable blueprint before writing a single line of code." },
    { id: 'develop', title: 'Development', icon: faLaptopCode, description: "This is where the magic happens. I write clean, efficient code, develop firmware, build and test hardware prototypes, and integrate all components into a cohesive system." },
    { id: 'deploy', title: 'Deployment', icon: faRocket, description: "After rigorous testing, the solution is deployed. I monitor its performance, gather feedback, and provide ongoing support to ensure long-term success and reliability." },
];

const testimonials = [
    { quote: "Vineeth's attention to detail and deep understanding of embedded systems were critical to our project's success. A true professional.", author: "Project Lead, Experimind Labs" },
    { quote: "An incredibly quick learner and a collaborative team player. Vineeth's problem-solving skills are top-notch.", author: "Mentor, MESCOM" },
    { quote: "The fall detection system he designed is not just a concept; it's a life-saving tool. His passion for applying technology for good is inspiring.", author: "University Professor" },
];


// --- 3D Hero Component ---
const RotatingBox = () => {
    const meshRef = useRef();
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });
    return (
        <Box ref={meshRef} args={[2.5, 2.5, 2.5]}>
            <meshStandardMaterial color="#34D399" wireframe />
        </Box>
    );
};

// --- Magnetic Button Sub-Component ---
const Magnetic = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: 'spring', stiffness: 350, damping: 5, mass: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

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
      <div className="z-20 flex items-center order-1 bg-emerald-500 shadow-xl w-8 h-8 rounded-full">
      </div>
      <div className="order-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-1 font-bold text-lg">{data.role || data.degree}</h3>
        <p className="text-sm font-medium leading-snug tracking-wide text-emerald-500">{data.company || data.institution}</p>
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeProcessTab, setActiveProcessTab] = useState('discover');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // --- Effects ---
  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'false') setDarkMode(false);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const toggleVisibility = () => setIsScrollVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  // --- Handlers ---
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openProjectModal = (project) => setSelectedProject(project);
  const closeProjectModal = () => setSelectedProject(null);

  // --- Framer Motion Variants ---
  const navLinks = [ { name: 'About', href: '#about' }, { name: 'Skills', href: '#skills' }, { name: 'Process', href: '#process' }, { name: 'Projects', href: '#projects' }, { name: 'Experience', href: '#experience' }, { name: 'Contact', href: '#contact' }];
  const menuVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } };
  const sectionVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">V H K</motion.div>
      </div>
    );
  }

  return (
    <div className={`transition-colors duration-500 ${darkMode ? 'dark bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-200' : 'bg-stone-100 text-gray-800'}`}>
      <div className="relative z-10">
        {/* Header */}
        <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="sticky top-0 z-50 p-4 bg-white/80 dark:bg-black/50 backdrop-blur-lg shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">{personalInfo.name}</a>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (<a key={link.name} href={link.href} className="font-semibold hover:text-emerald-500 transition-colors">{link.name}</a>))}
              <Magnetic><button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"><FontAwesomeIcon icon={darkMode ? faSun : faMoon} /></button></Magnetic>
            </nav>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="z-50"><FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" /></button>
            </div>
          </div>
          <AnimatePresence>{isMenuOpen && (<motion.div initial="hidden" animate="visible" exit="hidden" variants={menuVariants} className="md:hidden mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl">{navLinks.map((link) => (<motion.a key={link.name} href={link.href} onClick={toggleMenu} variants={itemVariants} className="block py-2 text-center font-medium hover:text-emerald-500 transition-colors">{link.name}</motion.a>))}</motion.div>)}</AnimatePresence>
        </motion.header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 gap-8">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 }}}} className="flex flex-col items-center md:items-start w-full md:w-1/2">
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold mb-4">Hey, I'm <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">{personalInfo.name}</span></motion.h1>
              <TypeAnimation sequence={[personalInfo.title, 2000, 'A Lifelong Learner and Innovator', 2000]} wrapper="p" speed={50} repeat={Infinity} className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl" />
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-6 mb-8">{personalInfo.socials.map((social) => (<Magnetic key={social.name}><a href={social.url} target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-emerald-500 transition-colors"><FontAwesomeIcon icon={social.icon} /></a></Magnetic>))}</motion.div>
              <Magnetic><motion.a variants={itemVariants} href={personalInfo.resume} download className="inline-block px-8 py-4 bg-emerald-600 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-700 transition-colors transform hover:scale-105">Download Resume</motion.a></Magnetic>
            </motion.div>
            <div className="w-full md:w-1/2 h-96">
                <Suspense fallback={<div className="text-center">Loading 3D Model...</div>}>
                    <Canvas>
                        <OrbitControls enableZoom={false} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[-2, 5, 2]} intensity={1} />
                        <RotatingBox />
                    </Canvas>
                </Suspense>
            </div>
          </section>

          {/* About Section */}
          <motion.section id="about" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">About Me</h2>
            <div className="max-w-4xl mx-auto text-center text-lg text-gray-600 dark:text-gray-300 leading-relaxed"><p>{personalInfo.about}</p></div>
          </motion.section>

          {/* Skills Section */}
          <motion.section id="skills" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.1 }}}}>
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Technical Skills</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              {skills.map((skill) => (<motion.div key={skill.name} className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg" variants={itemVariants} whileHover={{ y: -5, scale: 1.05, boxShadow: "0px 10px 30px rgba(52, 211, 153, 0.2)" }}><FontAwesomeIcon icon={skill.icon} className="text-5xl text-emerald-500 mb-4" /><h3 className="font-semibold text-lg mb-2">{skill.name}</h3><div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5"><motion.div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} /></div></motion.div>))}
            </div>
          </motion.section>
          
          {/* Process Section */}
           <motion.section id="process" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
                <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">My Process</h2>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
                    <div className="flex md:flex-col justify-around md:justify-start">
                        {processSteps.map(step => (
                            <button key={step.id} onClick={() => setActiveProcessTab(step.id)} className={`p-4 text-left font-semibold transition-colors w-full rounded-lg ${activeProcessTab === step.id ? 'text-white bg-emerald-500' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`}>
                                <FontAwesomeIcon icon={step.icon} className="mr-3" /> {step.title}
                            </button>
                        ))}
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div key={activeProcessTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                <h3 className="text-2xl font-bold mb-4">{processSteps.find(s => s.id === activeProcessTab).title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{processSteps.find(s => s.id === activeProcessTab).description}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.section>

          {/* Projects Section */}
          <motion.section id="projects" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ visible: { transition: { staggerChildren: 0.2 }}}}>
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Featured Projects</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, i) => (<motion.div key={i} className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer" variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 }}} onClick={() => openProjectModal(project)}><img src={project.image} alt={project.title} className="w-full h-56 object-cover" /><div className="p-6"><h3 className="text-2xl font-bold mb-2">{project.title}</h3><p className="text-gray-600 dark:text-gray-400 text-sm truncate">{project.description}</p></div></motion.div>))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section id="experience" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ visible: { transition: { staggerChildren: 0.3 }}}}>
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">My Journey</h2>
            <div className="relative wrap overflow-hidden p-10 h-full"><div className="border-2-2 absolute border-opacity-20 border-gray-700 dark:border-gray-300 h-full border" style={{left: '50%'}}></div>{experience.map((item, index) => (<TimelineItem key={`exp-${index}`} data={item} isLeft={index % 2 === 0} />))}{education.map((item, index) => (<TimelineItem key={`edu-${index}`} data={item} isLeft={(experience.length + index) % 2 === 0} />))}</div>
          </motion.section>
          
           {/* Testimonials Section */}
            <motion.section id="testimonials" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
                <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">What Others Say</h2>
                <div className="max-w-3xl mx-auto text-center relative h-48">
                    <AnimatePresence>
                        <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                            <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-emerald-500 mb-4" />
                            <p className="text-xl italic text-gray-600 dark:text-gray-300">"{testimonials[activeTestimonial].quote}"</p>
                            <p className="mt-4 font-semibold text-gray-700 dark:text-gray-200">- {testimonials[activeTestimonial].author}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.section>

          {/* Contact Section */}
          <motion.section id="contact" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
            <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Get In Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">I'm currently open to new opportunities and collaborations. Feel free to send me a message!</p>
            <form action={`https://formsubmit.co/${personalInfo.email}`} method="POST" className="max-w-xl mx-auto space-y-6">
              <input type="hidden" name="_captcha" value="false" /><input type="hidden" name="_template" value="box" />
              <motion.input whileFocus={{ scale: 1.02 }} type="text" name="name" placeholder="Your Name" required className="w-full p-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-slate-800/70 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
              <motion.input whileFocus={{ scale: 1.02 }} type="email" name="email" placeholder="Your Email" required className="w-full p-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-slate-800/70 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
              <motion.textarea whileFocus={{ scale: 1.02 }} name="message" rows="6" placeholder="Your Message" required className="w-full p-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-slate-800/70 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"></motion.textarea>
              <Magnetic><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">Send Message</motion.button></Magnetic>
            </form>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200 dark:border-slate-700">
          <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
            <div className="flex justify-center gap-6 mb-4">{personalInfo.socials.map((social) => (<a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-emerald-500 transition-colors"><FontAwesomeIcon icon={social.icon} /></a>))}</div>
            <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
            <p className="text-sm mt-2">Designed & Built with ❤️</p>
          </div>
        </footer>

        {/* Scroll To Top Button */}
        <AnimatePresence>{isScrollVisible && (<Magnetic><motion.button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-emerald-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-50" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><FontAwesomeIcon icon={faArrowUp} /></motion.button></Magnetic>)}</AnimatePresence>
        
        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999]" onClick={closeProjectModal}>
              <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }} className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-8 relative">
                  <button onClick={closeProjectModal} className="absolute top-4 right-4 text-2xl hover:text-emerald-500 transition-colors"><FontAwesomeIcon icon={faTimesCircle} /></button>
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">{selectedProject.tags.map(tag => (<span key={tag} className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>))}</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedProject.description}</p>
                  <div className="flex items-center gap-6">
                    <a href={selectedProject.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-500 transition-colors font-semibold"><FontAwesomeIcon icon={faGithub} /> Source Code</a>
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-500 transition-colors font-semibold"><FontAwesomeIcon icon={faExternalLinkAlt} /> Live Demo</a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
