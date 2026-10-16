import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Download, Menu, X, Terminal, Award } from 'lucide-react';
import { toggleSound, playHoverBlip, playClickZap } from '../utils/sound';

export default function Navbar({ onOpenTerminal }) {
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleNavClick = (id) => {
    playClickZap();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    playClickZap();
    fetch('http://localhost:5000/api/stats/resume-download', { method: 'POST' }).catch(() => {});
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'skills', 'experience', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <a href="#hero" className="nav-brand" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>
        <div className="nav-brand-badge">NB</div>
        <span>Naveen<span className="gradient-text">.dev</span></span>
      </a>

      <ul className="nav-links">
        <li>
          <a
            href="#hero"
            className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            onMouseEnter={playHoverBlip}
          >
            Overview
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}
            onMouseEnter={playHoverBlip}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}
            onMouseEnter={playHoverBlip}
          >
            Skills
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}
            onMouseEnter={playHoverBlip}
          >
            Experience
          </a>
        </li>
        <li>
          <a
            href="#certifications"
            className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('certifications'); }}
            onMouseEnter={playHoverBlip}
          >
            Certifications
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            onMouseEnter={playHoverBlip}
          >
            Contact
          </a>
        </li>
      </ul>

      <div className="nav-actions">
        <button
          className="icon-btn"
          title={soundOn ? 'Cyber FX Enabled' : 'Enable Cyber FX'}
          onClick={handleSoundToggle}
          onMouseEnter={playHoverBlip}
        >
          {soundOn ? <Volume2 size={18} color="#00f2fe" /> : <VolumeX size={18} />}
        </button>

        <button
          className="icon-btn"
          title="Open Naveen CLI Terminal"
          onClick={() => { playClickZap(); onOpenTerminal(); }}
          onMouseEnter={playHoverBlip}
        >
          <Terminal size={18} />
        </button>

        <a
          href="/Naveen_Bangundi_Resume.pdf"
          download="Naveen_Bangundi_Resume.pdf"
          className="btn btn-primary"
          style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          onClick={handleResumeDownload}
          onMouseEnter={playHoverBlip}
        >
          <Download size={15} />
          <span>Resume</span>
        </a>

        <button
          className="mobile-toggle icon-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}
