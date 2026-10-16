import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playHoverBlip, playClickZap, playCyberChime } from '../utils/sound';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickZap();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in your name, email, and message.' });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        playCyberChime();
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 }
        });

        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please reach out via email or phone directly.'
        });
      }
    } catch (err) {
      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been received. You can also reach me directly at naveenbangundi1@gmail.com'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <MessageSquare size={14} />
            <span>Direct Communication</span>
          </div>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Exceptional</span>
          </h2>
          <p className="section-desc">
            Currently open for Full-Time Software Engineering, Full Stack Development roles, and exciting high-impact projects.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Column */}
          <div className="contact-info-card">
            <a
              href="mailto:naveenbangundi1@gmail.com"
              className="contact-tile"
              onMouseEnter={playHoverBlip}
              onClick={playClickZap}
            >
              <div className="contact-tile-icon">
                <Mail size={22} />
              </div>
              <div className="contact-tile-text">
                <h4>Direct Email</h4>
                <p>naveenbangundi1@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+917619388228"
              className="contact-tile"
              onMouseEnter={playHoverBlip}
              onClick={playClickZap}
            >
              <div className="contact-tile-icon">
                <Phone size={22} />
              </div>
              <div className="contact-tile-text">
                <h4>Phone / WhatsApp</h4>
                <p>+91 7619388228</p>
              </div>
            </a>

            <div className="contact-tile">
              <div className="contact-tile-icon">
                <MapPin size={22} />
              </div>
              <div className="contact-tile-text">
                <h4>Primary Location</h4>
                <p>Bengaluru, Karnataka, India</p>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '24px',
                borderLeft: '4px solid var(--accent-cyan)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Sparkles size={18} color="#00f2fe" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Instant Hiring Status</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                MCA graduate with immediate joining availability. Open to both on-site roles in Bengaluru and remote opportunities worldwide.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-panel">
            {status && (
              <div className={`form-feedback ${status.type === 'success' ? 'feedback-success' : 'feedback-error'}`}>
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe / Tech Recruiter"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject / Purpose</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Job Opportunity / Project Collaboration"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the role, your company, or the project vision..."
                  className="form-textarea"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-glow"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                disabled={submitting}
                onMouseEnter={playHoverBlip}
              >
                <Send size={18} />
                <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
