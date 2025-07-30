import { useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faSquareGithub, faSquareLinkedin } from '@fortawesome/free-brands-svg-icons';


// import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);


  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      {/* Navbar */}
      <header className="p-4 border-b border-slate-700">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-br from-[#F3CFE9] to-[#8B47B5] bg-clip-text text-transparent">
            IAm<span>Music</span>
          </h1>
          {/* <nav className="space-x-6 text-sm">
            <a href="#about" className="nav-glow">About</a>
            <a href="#projects" className="nav-glow">Projects</a>
            <a href="#contact" className="nav-glow">Contact</a>
        </nav> */}


        <nav className="space-x-6 text-sm">
          <a href="#about" className="nav-glow bg-gradient-to-br from-pink-400 to-purple-500 bg-clip-text text-transparent">About</a>
          <a href="#projects" className="nav-glow bg-gradient-to-br from-pink-400 to-purple-500 bg-clip-text text-transparent">Projects</a>
          <a href="#contact" className="nav-glow bg-gradient-to-br from-pink-400 to-purple-500 bg-clip-text text-transparent">Contact</a>
        </nav>



        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center px-4">
        <h2 className="text-4xl font-bold mb-2">Hey, I'm Akshara</h2>
        <p className="text-lg text-gray-400 mb-6">Model Enthusiasist | UI | PostgreSQL</p>
        <a
          href="/Akshara_resume.pdf"  // Make sure this file is in `public/`
          download
          className="inline-block px-6 py-2 border border-pink-700 text-rose-400 rounded hover:bg-pink-900 hover:text-rose-100 transition"
        >
          Download Resume
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 border-t border-slate-800 px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">About Me</h3>
          <p className="text-gray-400">
          I'm a B.Tech Information Science student with a strong foundation in data science, machine learning, and statistical analysis. Through academic and personal projects, I've built real-world, data-driven applications. I aim to apply my skills in environments that value clean code, intelligent systems, and practical innovation
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 border-t border-slate-800 px-4">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Projects</h3>
          <ul className="space-y-4 text-gray-300">
            <li>
              <strong className="text-white">NSFW Content Blocker</strong><br />
              Real-time NSFW content blocker using Vision Transformers with 99.15% precision and sub-100ms latency
            </li>
            <li>
              <strong className="text-white">Transformer Ensembles for Fake News Detection</strong><br />
              Multimodal fake news detector combining ViT and BERT/DeBERTa with 12% improved accuracy using late fusion
            </li>
          </ul>
        </div>
      </section>

      <section id="contact" className="py-16 border-t border-slate-800 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Contact Me</h3>
          
          <div className="flex justify-center space-x-6 text-lg text-gray-300">
            <a href="mailto:bhatakshara9900@gmail.com" className="hover:text-sky-400">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              mailMe
            </a>
            <a href="https://github.com/Akshara026" className="hover:text-sky-400" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faSquareGithub} className="mr-1" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/akshara-g-bhat-42177b311" className="hover:text-sky-400" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faSquareLinkedin} className="mr-1" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-700 text-center text-gray-500 text-sm">
        © 2025 KaisexX — Resume Site
      </footer>
    </div>
  );
}

export default App;
