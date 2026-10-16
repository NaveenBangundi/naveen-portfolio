import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Code2, Database, Server, Wrench, FileCode, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playHoverBlip, playClickZap, playCyberChime } from '../utils/sound';

const CATEGORY_ICONS = {
  Frontend: <Code2 size={20} color="#00f2fe" />,
  Languages: <Sparkles size={20} color="#9d4edd" />,
  Backend: <Server size={20} color="#4facfe" />,
  Databases: <Database size={20} color="#10b981" />,
  Tools: <Wrench size={20} color="#f59e0b" />
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [endorsedMap, setEndorsedMap] = useState({});

  const fetchSkills = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/skills');
      const data = await res.json();
      setSkills(data);
    } catch (e) {
      console.warn('Skills offline fallback.');
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEndorse = async (skillId, skillName) => {
    playClickZap();
    playCyberChime();

    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 }
    });

    setEndorsedMap((prev) => ({ ...prev, [skillId]: true }));

    try {
      const res = await fetch(`http://localhost:5000/api/skills/${skillId}/endorse`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setSkills((prev) =>
          prev.map((s) => ((s._id === skillId || s.name === skillName) ? data.skill : s))
        );
      }
    } catch (e) {
      setSkills((prev) =>
        prev.map((s) =>
          (s._id === skillId || s.name === skillName)
            ? { ...s, endorsements: (s.endorsements || 0) + 1 }
            : s
        )
      );
    }
  };

  // Group skills by category
  const categories = ['Frontend', 'Languages', 'Backend', 'Databases', 'Tools'];

  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Zap size={14} />
            <span>Interactive Tech Arsenal</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Live Endorsements</span>
          </h2>
          <p className="section-desc">
            Full-stack engineering capabilities verified through production deployments. Feel free to click <strong>"Endorse"</strong> on any skill to share your endorsement in real time!
          </p>
        </div>

        <div className="skills-categories-grid">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            if (catSkills.length === 0) return null;

            return (
              <div key={cat} className="skill-category-card">
                <div className="skill-cat-header">
                  {CATEGORY_ICONS[cat] || <FileCode size={20} color="#00f2fe" />}
                  <h3 className="skill-cat-title">{cat}</h3>
                </div>

                <div className="skills-list">
                  {catSkills.map((s) => {
                    const isEndorsed = endorsedMap[s._id] || endorsedMap[s.name];
                    return (
                      <div key={s._id || s.name} className="skill-row">
                        <div className="skill-info">
                          <span className="skill-name-wrap">
                            <span>{s.name}</span>
                          </span>

                          <button
                            className="endorse-btn"
                            disabled={isEndorsed}
                            onClick={() => handleEndorse(s._id || s.name, s.name)}
                            onMouseEnter={playHoverBlip}
                            style={isEndorsed ? { background: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981', color: '#10b981' } : {}}
                          >
                            {isEndorsed ? (
                              <>
                                <Check size={12} />
                                <span>Endorsed ({s.endorsements})</span>
                              </>
                            ) : (
                              <>
                                <Zap size={12} />
                                <span>Endorse ({s.endorsements})</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${s.level || 85}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
