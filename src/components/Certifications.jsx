import React, { useState, useEffect, useRef } from 'react';
import { Award, ExternalLink, Eye, X, CheckCircle2, Download, Calendar, Sparkles } from 'lucide-react';
import { playHoverBlip, playClickZap, playCyberChime } from '../utils/sound';
import { attachTilt } from '../utils/tilt';

const CERTIFICATES = [
  {
    id: 'ai-springboard',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Infosys Springboard',
    issueDate: 'May 7, 2025',
    category: 'Artificial Intelligence',
    image: '/certificates/cert_ai.jpg',
    verifyUrl: 'https://verify.onwingspan.com',
    skillsCovered: ['AI Fundamentals', 'Machine Learning Concepts', 'Cognitive Systems', 'AI Ethics']
  },
  {
    id: 'agentic-uipath',
    title: 'Introduction to Agentic Automation',
    issuer: 'UiPath (Diploma of Completion)',
    issueDate: 'Nov 7, 2025',
    category: 'Agentic AI & Automation',
    image: '/certificates/cert_uipath.jpg',
    verifyUrl: 'https://www.uipath.com',
    skillsCovered: ['Agentic Workflows', 'Autonomous RPA', 'AI Agents', 'Process Automation']
  },
  {
    id: 'java-springboard',
    title: 'Java Programming Fundamentals',
    issuer: 'Infosys Springboard',
    issueDate: 'Jan 16, 2025',
    category: 'Core Java & OOP',
    image: '/certificates/cert_java.jpg',
    verifyUrl: 'https://verify.onwingspan.com',
    skillsCovered: ['Core Java', 'OOP Principles', 'Collections Framework', 'Exception Handling']
  },
  {
    id: 'pseudocode-springboard',
    title: 'Programming Fundamentals: Systematic Design with Pseudocode',
    issuer: 'Infosys Springboard',
    issueDate: 'Dec 17, 2024',
    category: 'Algorithms & Logic Design',
    image: '/certificates/cert_programming.jpg',
    verifyUrl: 'https://verify.onwingspan.com',
    skillsCovered: ['Algorithm Design', 'Structured Pseudocode', 'Flowcharting', 'Modular Logic']
  }
];

function CertCard({ cert, onSelect }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      return attachTilt(cardRef.current, 10);
    }
  }, []);

  return (
    <div
      className="project-card tilt-card"
      ref={cardRef}
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(cert)}
      onMouseEnter={playHoverBlip}
    >
      <div className="project-banner" style={{ height: '210px', position: 'relative', overflow: 'hidden' }}>
        <img
          src={cert.image}
          alt={cert.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transition: 'transform 0.5s ease',
            opacity: 0.92
          }}
          className="cert-thumb"
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7, 10, 22, 0.2) 0%, rgba(7, 10, 22, 0.85) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }}
          className="cert-overlay"
        >
          <div
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem', pointerEvents: 'none' }}
          >
            <Eye size={16} />
            <span>Click to View Full Certificate</span>
          </div>
        </div>

        <span className="project-category-badge" style={{ zIndex: 2 }}>{cert.category}</span>
      </div>

      <div className="project-card-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-cyan)', fontSize: '0.82rem', marginBottom: 6 }}>
          <Calendar size={13} />
          <span>Issued: {cert.issueDate}</span>
        </div>

        <h3 className="project-title" style={{ fontSize: '1.2rem', marginBottom: 6 }}>{cert.title}</h3>
        <p className="project-subtitle" style={{ color: '#c084fc', marginBottom: 12 }}>{cert.issuer}</p>

        <div className="tech-tags" style={{ marginBottom: 16 }}>
          {cert.skillsCovered.map((skill, idx) => (
            <span key={idx} className="tech-tag">{skill}</span>
          ))}
        </div>

        <div className="project-actions" style={{ paddingTop: 12 }}>
          <button
            className="btn btn-secondary"
            style={{ width: '100%', padding: '9px 16px', fontSize: '0.85rem' }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(cert);
            }}
          >
            <Eye size={15} />
            <span>Inspect Verified Credential</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  const handleOpen = (cert) => {
    playClickZap();
    playCyberChime();
    setActiveCert(cert);
  };

  const handleClose = () => {
    playClickZap();
    setActiveCert(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="certifications">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Award size={14} />
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-title">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-desc">
            Accredited certifications across Artificial Intelligence, Agentic Automation, Core Java, and Algorithmic Design. Click on any certificate to view the verified document.
          </p>
        </div>

        <div className="projects-grid">
          {CERTIFICATES.map((cert) => (
            <CertCard key={cert.id} cert={cert} onSelect={handleOpen} />
          ))}
        </div>
      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      {activeCert && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 8, 20, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={handleClose}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '920px',
              width: '100%',
              maxHeight: '92vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(10, 16, 35, 0.95)',
              border: '1px solid rgba(0, 242, 254, 0.35)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 242, 254, 0.25)',
              borderRadius: '24px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid var(--border-subtle)',
                background: 'rgba(15, 23, 46, 0.8)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'rgba(0, 242, 254, 0.1)',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00f2fe'
                  }}
                >
                  <Award size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                    {activeCert.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    {activeCert.issuer} • Issued on {activeCert.issueDate}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <a
                  href={activeCert.image}
                  download={`${activeCert.id}.jpg`}
                  className="icon-btn"
                  title="Download Certificate"
                  onMouseEnter={playHoverBlip}
                >
                  <Download size={18} />
                </a>

                <a
                  href={activeCert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-btn"
                  title="Verify Online"
                  onMouseEnter={playHoverBlip}
                >
                  <ExternalLink size={18} />
                </a>

                <button
                  className="icon-btn"
                  onClick={handleClose}
                  title="Close (Esc)"
                  onMouseEnter={playHoverBlip}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div
              style={{
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#040712'
              }}
            >
              <img
                src={activeCert.image}
                alt={activeCert.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '68vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              />
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '14px 24px',
                borderTop: '1px solid var(--border-subtle)',
                background: 'rgba(12, 18, 38, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} />
                <span>Verified Candidate: <strong>NAVEEN BANGUNDI</strong></span>
              </div>

              <a
                href={activeCert.image}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ padding: '7px 18px', fontSize: '0.82rem' }}
                onMouseEnter={playHoverBlip}
              >
                <span>Open Full Resolution</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
