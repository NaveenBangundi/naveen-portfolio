import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, X, CornerDownLeft } from 'lucide-react';
import { playClickZap } from '../utils/sound';

export default function TerminalHud({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { text: 'Naveen Bangundi [Version 2.0.26 - MERN Engine]', type: 'system' },
    { text: 'Type "help" to see available terminal commands.', type: 'info' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playClickZap();
    const newHistory = [...history, { text: `naveen@portfolio:~$ ${inputVal}`, type: 'user' }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          text: 'Available Commands:\n  • about    - Overview of Naveen Bangundi\n  • skills   - Technical arsenal & frameworks\n  • projects - Key engineering projects\n  • contact  - Email, phone, & social links\n  • hire     - Recruiter inquiry & availability\n  • clear    - Clear terminal logs\n  • exit     - Close the terminal HUD',
          type: 'info'
        });
        break;
      case 'about':
        newHistory.push({
          text: 'Naveen Bangundi is an MCA Graduate (Kristu Jayanti University, CGPA 8.02) and Full Stack Developer with hands-on enterprise experience at Daylink Tech Labs. Specialized in building performant, modern MERN & Next.js applications.',
          type: 'output'
        });
        break;
      case 'skills':
        newHistory.push({
          text: 'Frontend: React.js, Next.js, Vue.js, Tailwind CSS, HTML5, CSS3\nBackend: Node.js, Express.js, Nest.js, Flask, REST APIs\nDatabases: MongoDB, MySQL, SQLite\nLanguages: JavaScript (ES6+), TypeScript, Java, Python, SQL\nTools: Git, GitHub, VS Code, Cursor, Postman, Vercel',
          type: 'output'
        });
        break;
      case 'projects':
        newHistory.push({
          text: '1. Edeal India E-Commerce Platform (Next.js, Nest.js, MongoDB, Tailwind CSS)\n2. App Graph Builder (React.js, Interactive Canvas, SVG Graphing)\n3. Beauty Salon Management Platform (Sneha Herbal Beauty Parlor - Next.js, React, QR Feedback)\n4. Ganesh Tours & Travels Platform (React 19, Fare Calculator, Tour Booking)\n5. Role-Based Attendance Management System (React.js, Flask, SQLite)',
          type: 'output'
        });
        break;
      case 'contact':
        newHistory.push({
          text: 'Email: naveenbangundi1@gmail.com\nPhone: +91 7619388228\nLocation: Bengaluru, Karnataka, India\nGitHub: github.com/NaveenBangundi\nLinkedIn: linkedin.com/in/naveen-bangundi1',
          type: 'output'
        });
        break;
      case 'hire':
      case 'sudo hire':
        newHistory.push({
          text: 'STATUS: Ready for immediate joining! Open for Full-Time Software Engineer / Full Stack Developer roles. Email: naveenbangundi1@gmail.com | Phone: +91 7619388228',
          type: 'success'
        });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'exit':
        onClose();
        return;
      default:
        newHistory.push({
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`,
          type: 'error'
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="terminal-hud"
        style={{ width: 'min(100%, 720px)', margin: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="t-dot t-red" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="t-dot t-yellow"></span>
            <span className="t-dot t-green"></span>
          </div>
          <div className="terminal-title">naveen@developer-core:~ (bash)</div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="terminal-body" style={{ maxHeight: '380px' }}>
          {history.map((line, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 6,
                whiteSpace: 'pre-line',
                color:
                  line.type === 'user'
                    ? '#00f2fe'
                    : line.type === 'success'
                    ? '#10b981'
                    : line.type === 'error'
                    ? '#f87171'
                    : line.type === 'info'
                    ? '#38bdf8'
                    : '#cbd5e1'
              }}
            >
              {line.text}
            </div>
          ))}
          <div className="terminal-input-row">
            <span className="terminal-prompt">naveen@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              className="terminal-input"
              autoFocus
              placeholder="Type command (e.g. help, hire)..."
            />
            <CornerDownLeft size={14} color="#64748b" />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
