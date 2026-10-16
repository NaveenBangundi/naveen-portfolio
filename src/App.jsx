import React, { useState, useEffect } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalHud from './components/TerminalHud';

export default function App() {
  const [stats, setStats] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    // Fetch stats and register view
    fetch('http://localhost:5000/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.warn('Backend server connecting...'));
  }, []);

  return (
    <div className="app-container">
      {/* 3D WebGL Background Scene */}
      <ThreeCanvas />

      {/* Ambient Lighting Layer */}
      <div className="bg-ambient-layer"></div>

      {/* Main Foreground Content */}
      <div className="site-content">
        <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
        <Hero stats={stats} />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </div>

      {/* Interactive Developer CLI HUD */}
      <TerminalHud isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
}
