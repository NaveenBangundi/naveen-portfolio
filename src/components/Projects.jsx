import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Heart, Layers, CheckCircle, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';
import { playHoverBlip, playClickZap } from '../utils/sound';
import { attachTilt } from '../utils/tilt';

const FALLBACK_PROJECTS = [
  {
    title: 'Edeal India E-Commerce Platform',
    subtitle: 'Full-Scale Enterprise Commerce with Multi-Module Dashboards',
    category: 'Full Stack',
    description: 'Comprehensive e-commerce ecosystem built during internship at Daylink Tech Labs. Engineered responsive interfaces across User, Vendor, and Admin portals, optimized REST API performance, and resolved core UI rendering bottlenecks.',
    tags: ['Next.js', 'Nest.js', 'MongoDB', 'Tailwind CSS', 'REST APIs', 'Git'],
    highlights: [
      'Multi-role access (Admin, Vendor, Customer)',
      'Sub-second page transitions with Next.js SSR',
      'Secure payment processing & order lifecycle management',
      'Integrated scalable Nest.js backend microservices'
    ],
    demoUrl: 'https://edealindia.in/',
    githubUrl: 'https://github.com/NaveenBangundi',
    likes: 64
  },
  {
    title: 'App Graph Builder',
    subtitle: 'Interactive Node-Based Architecture & Flowchart Visualizer',
    category: 'Frontend & Interactive',
    description: 'High-performance visual flowchart and interactive graph builder tool for modeling application architectures, node connections, and state transitions with dynamic node linking and exportable diagrams.',
    tags: ['React.js', 'Interactive Canvas', 'SVG Graphing', 'JavaScript', 'Tailwind CSS'],
    highlights: [
      'Drag-and-drop interactive node canvas with dynamic edge routing',
      'Real-time node attribute inspector and state management',
      'Custom connectors, zooming, panning, and graph serialization',
      'Exportable architecture diagrams for team workflows'
    ],
    demoUrl: 'https://github.com/NaveenBangundi/App-Graph-Builder',
    githubUrl: 'https://github.com/NaveenBangundi/App-Graph-Builder',
    likes: 52
  },
  {
    title: 'Beauty Salon Management Platform',
    subtitle: 'Modern Appointment Scheduling & Customer Feedback Hub',
    category: 'Frontend & Full Stack',
    description: 'High-converting salon booking and customer relationship web application (Sneha Herbal Beauty Parlor). Features online appointment scheduling, stylist allocation, responsive mobile-first UI, and instant QR-based customer rating & feedback aggregation.',
    tags: ['Next.js', 'React.js', 'Tailwind CSS', 'QR Code API', 'Vercel'],
    highlights: [
      'Seamless multi-device booking flow',
      'Live stylist availability and time slot engine',
      'Dynamic QR feedback system boosting review engagement',
      'Lighthouse 95+ performance & SEO optimization'
    ],
    demoUrl: 'https://sneha-herbal-beauty-parlor.vercel.app',
    githubUrl: 'https://github.com/NaveenBangundi/Sneha-Herbal-Beauty-Parlor',
    likes: 49
  },
  {
    title: 'Ganesh Tours & Travels Platform',
    subtitle: 'Fleet Showcase, Live Fare Calculator & Tour Booking Engine',
    category: 'Frontend & Full Stack',
    description: 'Modern travel booking and fleet management web platform featuring dynamic distance-based fare calculator, multi-vehicle showcase (Ertiga & fleets), curated tour packages, and direct partner driver profiles.',
    tags: ['React 19', 'Vite', 'Fare Engine', 'Tour Packages', 'Responsive UI'],
    highlights: [
      'Live dynamic fare calculation and route estimate generator',
      'Interactive vehicle fleet album with specifications and 360 preview',
      'Tour package browsing and instant reservation booking form',
      'Dedicated driver partner profile showcase'
    ],
    demoUrl: 'https://ganesh-tours-and-travels-pikv4dqc6-naveenbangundis-projects.vercel.app/',
    githubUrl: 'https://github.com/NaveenBangundi/Ganesh-Tours-and-Travels',
    likes: 45
  },
  {
    title: 'Role-Based Attendance Management System',
    subtitle: 'Enterprise Academic & Institutional Tracking Platform',
    category: 'Full Stack',
    description: 'Robust institutional management platform engineered with React.js frontend, Flask backend, and SQLite database. Includes granular role-based authentication, student/teacher/admin views, real-time analytics, and automated report generation.',
    tags: ['React.js', 'Flask', 'Python', 'SQLite', 'JWT Auth', 'REST APIs'],
    highlights: [
      'Role-based granular permissions (Admin, Teacher, Student)',
      'Real-time automated attendance logging & percentage tracking',
      'One-click exportable PDF & Excel analytical reports',
      'Zero-latency CRUD records with secure JWT authentication'
    ],
    demoUrl: 'https://github.com/NaveenBangundi',
    githubUrl: 'https://github.com/NaveenBangundi',
    likes: 38
  }
];

function ProjectCardItem({ project, onLike }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      return attachTilt(cardRef.current, 8);
    }
  }, []);

  return (
    <div className="project-card tilt-card" ref={cardRef}>
      <div className="project-banner">
        <div className="project-banner-pattern"></div>
        <span className="project-category-badge">{project.category}</span>
        
        <button
          className="project-like-btn"
          onClick={() => onLike(project._id || project.title)}
          title="Appreciate Project"
          onMouseEnter={playHoverBlip}
        >
          <Heart size={14} fill={project.likes > 0 ? '#f72585' : 'none'} color={project.likes > 0 ? '#f72585' : 'currentColor'} />
          <span>{project.likes || 0}</span>
        </button>

        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <Layers size={40} color="#00f2fe" style={{ opacity: 0.85 }} />
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
            PROD ARCHITECTURE
          </div>
        </div>
      </div>

      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-desc">{project.description}</p>

        {project.highlights && (
          <ul className="project-highlights">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="highlight-item">
                <CheckCircle size={14} className="highlight-bullet" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="tech-tags">
          {project.tags && project.tags.map((tag, idx) => (
            <span key={idx} className="tech-tag">{tag}</span>
          ))}
        </div>

        <div className="project-actions">
          <a
            href={project.githubUrl || 'https://github.com/NaveenBangundi'}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1 }}
            onMouseEnter={playHoverBlip}
            onClick={playClickZap}
          >
            <GithubIcon size={16} />
            <span>Repository</span>
          </a>

          <a
            href={project.demoUrl || project.githubUrl || 'https://github.com/NaveenBangundi'}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1 }}
            onMouseEnter={playHoverBlip}
            onClick={playClickZap}
          >
            <ExternalLink size={16} />
            <span>View Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      }
    } catch (err) {
      console.warn('Using offline fallback project list.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLike = async (id) => {
    playClickZap();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 }
    });

    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => ((p._id === id || p.title === id) ? { ...p, likes: data.likes } : p))
        );
      }
    } catch (e) {
      setProjects((prev) =>
        prev.map((p) => ((p._id === id || p.title === id) ? { ...p, likes: (p.likes || 0) + 1 } : p))
      );
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Full Stack') return p.category.includes('Full Stack');
    if (selectedFilter === 'Frontend') return p.category.includes('Frontend');
    if (selectedFilter === 'Interactive') return p.category.includes('Interactive');
    return true;
  });

  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Featured Engineering</span>
          </div>
          <h2 className="section-title">
            Real-World <span className="gradient-text">Project Ecosystem</span>
          </h2>
          <p className="section-desc">
            Production-grade full-stack applications, interactive architecture builders, travel platforms, and responsive web portals.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="projects-filter-bar">
          {['All', 'Full Stack', 'Frontend', 'Interactive'].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
              onClick={() => { playClickZap(); setSelectedFilter(filter); }}
              onMouseEnter={playHoverBlip}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <ProjectCardItem key={project._id || idx} project={project} onLike={handleLike} />
          ))}
        </div>
      </div>
    </section>
  );
}
