import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Building } from 'lucide-react';
import { playHoverBlip } from '../utils/sound';

export default function Experience() {
  const experiences = [
    {
      role: 'Full Stack Developer Intern',
      company: 'Daylink Tech Labs Pvt Ltd',
      location: 'Belgaum, Karnataka',
      period: 'Feb 2026 – Aug 2026',
      description: 'Developed responsive user interfaces for Edeal India, a full-scale enterprise e-commerce platform utilizing Next.js, Nest.js, MongoDB, and Tailwind CSS. Contributed across User, Vendor, and Admin modules, integrated mission-critical REST APIs, solved complex UI bottlenecks, and collaborated within an Agile team structure.'
    },
    {
      role: 'Java Full Stack Trainee',
      company: 'Tap Academy',
      location: 'Bengaluru, Karnataka',
      period: 'Oct 2023 – Apr 2024',
      description: 'Completed comprehensive training in enterprise Java Full Stack Development covering Core Java, JDBC, SQL, Servlets, HTML, CSS, JavaScript, and backend integration. Engineered full-stack web applications following MVC architecture and honed debugging, OOP, and data structures.'
    }
  ];

  const education = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Kristu Jayanti Deemed to be University',
      location: 'Bengaluru, Karnataka',
      period: '2024 – 2026',
      score: 'CGPA: 8.02 / 10',
      details: 'Focused on advanced web architectures, cloud services, software engineering patterns, distributed systems, and modern full-stack development.'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Doddappa Appa College of BCA',
      location: 'Basavakalyan, Karnataka',
      period: '2021 – 2024',
      score: 'CGPA: 7.40 / 10',
      details: 'Built strong foundational knowledge in programming, relational databases (SQL), computer networks, data structures, and algorithm design.'
    }
  ];

  return (
    <section id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>Career Milestones</span>
          </div>
          <h2 className="section-title">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="section-desc">
            A solid track record of industrial software development, high-intensity full-stack training, and recognized academic excellence.
          </p>
        </div>

        <div className="experience-grid">
          {/* Experience Column */}
          <div className="timeline-column">
            <div className="col-header">
              <Briefcase size={24} />
              <span>Industry Experience</span>
            </div>

            {experiences.map((exp, idx) => (
              <div key={idx} className="timeline-card" onMouseEnter={playHoverBlip}>
                <div className="timeline-badge">
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </div>
                <h3 className="timeline-title">{exp.role}</h3>
                <div className="timeline-org">
                  <Building size={14} color="#00f2fe" />
                  <span>{exp.company}</span>
                  <span>•</span>
                  <MapPin size={14} />
                  <span>{exp.location}</span>
                </div>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Education Column */}
          <div className="timeline-column">
            <div className="col-header" style={{ color: '#c084fc' }}>
              <GraduationCap size={24} />
              <span>Academic Degrees</span>
            </div>

            {education.map((edu, idx) => (
              <div key={idx} className="timeline-card" onMouseEnter={playHoverBlip}>
                <div className="timeline-badge" style={{ background: 'rgba(157, 78, 221, 0.15)', borderColor: 'rgba(157, 78, 221, 0.35)', color: '#c084fc' }}>
                  <Calendar size={13} />
                  <span>{edu.period}</span>
                </div>
                <h3 className="timeline-title">{edu.degree}</h3>
                <div className="timeline-org">
                  <Building size={14} color="#c084fc" />
                  <span>{edu.institution}</span>
                  <span>•</span>
                  <strong style={{ color: '#10b981' }}>{edu.score}</strong>
                </div>
                <p className="timeline-desc">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
