import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, ArrowRight, Download, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { playHoverBlip, playClickZap } from '../utils/sound';
import { attachTilt } from '../utils/tilt';

const ROLES = [
  'Full Stack MERN Developer',
  'Next.js & React Architect',
  'Node.js & REST API Engineer',
  'MCA Graduate (CGPA: 8.02)'
];

export default function Hero({ stats }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const updateSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Attach 3D tilt
  useEffect(() => {
    if (cardRef.current) {
      return attachTilt(cardRef.current, 15);
    }
  }, []);

  const handleScrollTo = (id) => {
    playClickZap();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = () => {
    playClickZap();
    fetch('http://localhost:5000/api/stats/resume-download', { method: 'POST' }).catch(() => {});
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Intro & Bio */}
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="pulse-dot"></span>
              <span>Available for Full-Time & Internship Opportunities</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <br />
              <span className="gradient-text">Naveen Bangundi</span>
            </h1>

            <div className="hero-roles">
              <span>&gt; {displayText}</span>
              <span className="cursor-blink">|</span>
            </div>

            <p className="hero-bio">
              MCA graduate based in <strong>Bengaluru, Karnataka</strong> with hands-on enterprise experience in developing responsive, high-performance web applications using <strong>React.js, Next.js, Node.js, and MongoDB</strong>. Dedicated to crafting intuitive user interfaces, rock-solid REST APIs, and modern 3D digital experiences.
            </p>

            <div className="hero-cta-group">
              <button
                className="btn btn-primary btn-glow"
                onClick={() => handleScrollTo('projects')}
                onMouseEnter={playHoverBlip}
              >
                <span>Explore Featured Work</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="/Naveen_Bangundi_Resume.pdf"
                download="Naveen_Bangundi_Resume.pdf"
                className="btn btn-secondary"
                onClick={handleResumeDownload}
                onMouseEnter={playHoverBlip}
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-social-links">
              <a
                href="https://github.com/NaveenBangundi"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
                title="GitHub"
                onMouseEnter={playHoverBlip}
                onClick={playClickZap}
              >
                <GithubIcon size={20} />
              </a>

              <a
                href="https://linkedin.com/in/naveen-bangundi1"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
                title="LinkedIn"
                onMouseEnter={playHoverBlip}
                onClick={playClickZap}
              >
                <LinkedinIcon size={20} />
              </a>

              <a
                href="mailto:naveenbangundi1@gmail.com"
                className="social-icon-link"
                title="Email Naveen"
                onMouseEnter={playHoverBlip}
                onClick={playClickZap}
              >
                <Mail size={20} />
              </a>

              <a
                href="tel:+917619388228"
                className="social-icon-link"
                title="Direct Phone Call"
                onMouseEnter={playHoverBlip}
                onClick={playClickZap}
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Holographic Profile Avatar */}
          <div className="avatar-3d-wrap">
            <div className="floating-pill pill-1">
              <Sparkles size={16} />
              <span>MCA 2024-2026</span>
            </div>

            <div className="floating-pill pill-2">
              <MapPin size={16} />
              <span>Bengaluru, IN</span>
            </div>

            <div className="avatar-3d-card tilt-card" ref={cardRef}>
              <div className="avatar-img-container">
                <img
                  src="/naveen-photo.jpg"
                  alt="Naveen Bangundi"
                  className="avatar-img"
                />
                <div className="avatar-hud-overlay"></div>
              </div>

              <div className="avatar-badge-floating">
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Full Stack Developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Metrics Strip */}
        <div className="metrics-strip">
          <div className="metric-item">
            <div className="metric-value">8.02</div>
            <div className="metric-label">MCA CGPA (Kristu Jayanti)</div>
          </div>

          <div className="metric-item">
            <div className="metric-value">100%</div>
            <div className="metric-label">Clean Code & Architecture</div>
          </div>

          <div className="metric-item">
            <div className="metric-value">Full Stack</div>
            <div className="metric-label">React, Next.js, Node, Mongo</div>
          </div>

          <div className="metric-item">
            <div className="metric-value">{stats ? stats.views : '150+'}</div>
            <div className="metric-label">Portfolio Live Impressions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
