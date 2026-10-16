import React from 'react';
import { ArrowUp, Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { playHoverBlip, playClickZap } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    playClickZap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div className="nav-brand-badge" style={{ width: 30, height: 30, fontSize: '0.85rem' }}>NB</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem' }}>
                Naveen<span className="gradient-text"> Bangundi</span>
              </span>
            </div>
            <p className="footer-copy">
              Full Stack Developer & MCA Engineer • Built with MERN Stack, React 19, Three.js & Vanilla CSS
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a
              href="https://github.com/NaveenBangundi"
              target="_blank"
              rel="noreferrer"
              className="social-icon-link"
              onMouseEnter={playHoverBlip}
            >
              <GithubIcon size={18} />
            </a>

            <a
              href="https://linkedin.com/in/naveen-bangundi1"
              target="_blank"
              rel="noreferrer"
              className="social-icon-link"
              onMouseEnter={playHoverBlip}
            >
              <LinkedinIcon size={18} />
            </a>

            <a
              href="mailto:naveenbangundi1@gmail.com"
              className="social-icon-link"
              onMouseEnter={playHoverBlip}
            >
              <Mail size={18} />
            </a>

            <button
              onClick={scrollToTop}
              className="icon-btn"
              title="Return to top"
              onMouseEnter={playHoverBlip}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: 20, borderTop: '1px solid var(--border-subtle)', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Naveen Bangundi. All rights reserved. Crafted with precision & 3D aesthetics.
        </div>
      </div>
    </footer>
  );
}
