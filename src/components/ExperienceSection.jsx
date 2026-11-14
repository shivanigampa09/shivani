import React, { useState } from 'react';
import { playUiClick } from '../utils/audio';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  School,
  ExternalLink,
  Code2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'Web Developer',
    company: 'AtFingerTip Pvt. Ltd.',
    location: 'Visakhapatnam, Andhra Pradesh',
    period: 'Joined Feb 2026 – Present',
    type: 'Full-time / Professional',
    current: true,
    description: 'Contributed to client web development initiatives with a sharp focus on responsive interfaces, modern component structures, and practical website delivery.',
    highlights: [
      'Engineered interactive frontend modules adhering to modern web standards and design specifications.',
      'Collaborated on cross-device responsive testing ensuring compatibility across mobile, tablet, and desktop.',
      'Delivered practical web solutions with fast loading times and clean semantic markup.',
    ],
    tech: ['React.js', 'JavaScript', 'HTML5/CSS3', 'Git', 'Responsive Design']
  },
  {
    role: 'Web Developer Intern',
    company: 'Connectia Solution Pvt. Ltd.',
    location: 'Mangalore, Karnataka',
    period: 'Dec 2025 – Feb 2026',
    type: 'Internship & Client Work',
    current: false,
    liveUrl: 'https://devshe.in/',
    clientProject: 'Devshe (devshe.in)',
    description: 'Contributed to client engineering initiatives including developing frontend modules for Devshe (devshe.in) and building responsive web applications with React.js, Tailwind CSS, and REST APIs.',
    highlights: [
      'Contributed to the web platform for Devshe (devshe.in), developing responsive media feeds, content catalogs, and dynamic modules.',
      'Developed responsive web interfaces using React.js and Tailwind CSS with modern component architecture.',
      'Implemented dynamic product listings, category filtering, shopping cart functionality, and REST API data integration.',
      'Built modular, reusable UI components and optimized performance across desktop, tablet, and mobile devices.',
      'Employed Git/GitHub for structured version control and successfully deployed production releases to Vercel.',
    ],
    tech: ['React.js', 'Tailwind CSS', 'REST APIs', 'Vercel', 'Git/GitHub']
  }
];

const EDUCATION = [
  {
    degree: 'MERN Stack Web Development Specialization',
    institution: 'Coding Ninjas',
    location: 'Specialized Full-Stack Program',
    period: 'Comprehensive Coaching & Training',
    score: 'MERN Stack Certified',
    highlight: 'Rigorous coaching in MERN stack (MongoDB, Express.js, React.js, Node.js), modern JavaScript (ES6+), component architecture, dynamic REST APIs, and full-stack software development.',
    icon: <Code2 size={22} className="text-amber-400" />
  },
  {
    degree: 'Bachelor of Computer Science (B.Sc.)',
    institution: 'Singareni Degree College',
    location: 'Mancherial, Telangana',
    period: '2018 – 2021',
    score: 'GPA: 79.9%',
    highlight: 'Comprehensive training in Computer Science fundamentals, programming logic, data structures, and database principles.',
    icon: <GraduationCap size={22} className="text-emerald-400" />
  },
  {
    degree: 'Intermediate (MPC - Maths, Physics, Chemistry)',
    institution: 'Sri Gayathri Junior College',
    location: 'Karimnagar, Telangana',
    period: '2016 – 2018',
    score: 'GPA: 80.0%',
    highlight: 'Rigorous foundation in analytical problem solving, mathematical reasoning, and logical principles.',
    icon: <School size={22} className="text-cyan-400" />
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'T.S. Model School',
    location: 'Mandamarri, Mancherial',
    period: 'Graduated 2016',
    score: 'GPA: 80.0%',
    highlight: 'Strong academic performance with distinctions in science and mathematics.',
    icon: <Award size={22} className="text-purple-400" />
  }
];

export default function ExperienceSection() {
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="experience" className="exp-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title text-gradient">
            Experience & <span className="text-gradient-emerald">Education</span>
          </h2>
        </div>

        <div className="exp-edu-layout">
          {/* Left Column: Work Experience Timeline */}
          <div className="timeline-column">
            <div className="column-title-row">
              <div className="col-icon emerald">
                <Briefcase size={20} />
              </div>
              <h3 className="column-heading font-display">Work Experience</h3>
            </div>

            <div className="timeline-track">
              {EXPERIENCES.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  {/* Glowing Node */}
                  <div className={`timeline-node ${item.current ? 'current' : ''}`}>
                    <div className="node-dot"></div>
                  </div>

                  {/* Content Card */}
                  <div className="timeline-card glass-panel">
                    <div className="timeline-top">
                      <div>
                        <div className="badge-row">
                          <span className="exp-type-badge font-mono">{item.type}</span>
                          {item.current && (
                            <span className="current-badge">
                              <span className="pulse-dot"></span> Current Role
                            </span>
                          )}
                        </div>
                        <h4 className="exp-role">{item.role}</h4>
                        <h5 className="exp-company">{item.company}</h5>
                      </div>
                    </div>

                    <div className="exp-meta-strip font-mono">
                      <span className="exp-meta-item">
                        <Calendar size={13} className="text-emerald-400" />
                        {item.period}
                      </span>
                      <span className="exp-meta-item">
                        <MapPin size={13} className="text-emerald-400" />
                        {item.location}
                      </span>
                    </div>

                    <p className="exp-desc">
                      {item.description}
                    </p>

                    <div className="exp-highlights-box">
                      <div className="highlights-label font-mono">KEY RESPONSIBILITIES & ACCOMPLISHMENTS</div>
                      <ul className="highlights-list">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="highlight-item">
                            <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="exp-tech-strip">
                      {item.tech.map((t, i) => (
                        <span key={i} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>

                    {item.liveUrl && (
                      <div className="exp-live-client-wrap">
                        <a 
                          href={item.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="exp-live-client-link"
                        >
                          <span className="pulse-dot-mini"></span>
                          <span>Live Client Platform: <strong>{item.clientProject}</strong></span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education Cards */}
          <div id="education" className="education-column">
            <div 
              id="education-toggle-header"
              className="column-title-row edu-accordion-trigger clickable"
              onClick={() => {
                playUiClick(860, 'sine', 0.05);
                setIsEducationOpen(!isEducationOpen);
              }}
              role="button"
              tabIndex={0}
              title={isEducationOpen ? 'Click to collapse education' : 'Click to open education'}
            >
              <div className="col-icon cyan">
                <GraduationCap size={20} />
              </div>
              <div className="edu-title-group">
                <h3 className="column-heading font-display">Academic Background</h3>
                <span className="edu-toggle-pill font-mono">
                  {isEducationOpen ? 'Click to hide details' : 'Click to view details (4)'}
                </span>
              </div>
              <div className={`edu-chevron-box ${isEducationOpen ? 'open' : ''}`}>
                <ChevronDown size={18} />
              </div>
            </div>

            {/* When CLOSED: Clean 1-click open teaser */}
            {!isEducationOpen && (
              <div className="edu-collapsed-wrapper">
                <div 
                  className="edu-teaser-banner glass-panel clickable"
                  onClick={() => {
                    playUiClick(860, 'sine', 0.05);
                    setIsEducationOpen(true);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="edu-teaser-left">
                    <div className="edu-teaser-badges font-mono">
                      <span className="edu-count-badge">4 Qualifications</span>
                      <span className="edu-degree-badge">B.Sc. • MERN • 12th • 10th</span>
                    </div>
                    <h4 className="edu-teaser-headline font-display">
                      Academic Background & Credentials
                    </h4>
                    <p className="edu-teaser-sub">
                      Computer Science degree, MERN Stack certification from Coding Ninjas, and academic distinctions.
                    </p>
                  </div>
                  <button 
                    className="edu-action-btn font-mono"
                    onClick={(e) => {
                      e.stopPropagation();
                      playUiClick(860, 'sine', 0.05);
                      setIsEducationOpen(true);
                    }}
                  >
                    <span>Open Details</span>
                    <ChevronDown size={14} />
                  </button>
                </div>

                {/* Summary of Credentials (Always handy) */}
                <div className="bonus-info-card glass-panel">
                  <div className="bonus-header">
                    <Sparkles size={18} className="text-emerald-400" />
                    <span className="font-display font-bold text-white">Summary of Credentials</span>
                  </div>
                  <div className="bonus-body font-mono text-sm">
                    <div className="bonus-row">
                      <span className="b-label">Core Focus:</span>
                      <span className="b-val text-emerald-300">Responsive Web Apps & MERN Stack</span>
                    </div>
                    <div className="bonus-row">
                      <span className="b-label">Location:</span>
                      <span className="b-val text-emerald-400">Telangana, India</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* When OPEN: Full Qualifications Stack */}
            {isEducationOpen && (
              <div className="education-cards-stack edu-animated-open">
                {EDUCATION.map((edu, idx) => (
                  <div 
                    key={idx} 
                    className="edu-card glass-panel"
                    onMouseMove={handleCardMouseMove}
                  >
                    <div className="edu-header">
                      <div className="edu-icon-wrap">
                        {edu.icon}
                      </div>
                      <div className="edu-title-box">
                        <div className="edu-score-pill font-mono">{edu.score}</div>
                        <h4 className="edu-degree">{edu.degree}</h4>
                        <h5 className="edu-institution">{edu.institution}</h5>
                      </div>
                    </div>

                    <div className="edu-meta font-mono">
                      <span>
                        <Calendar size={13} className="text-cyan-400" /> {edu.period}
                      </span>
                      <span>
                        <MapPin size={13} className="text-cyan-400" /> {edu.location}
                      </span>
                    </div>

                    <p className="edu-highlight-text">
                      {edu.highlight}
                    </p>
                  </div>
                ))}

                {/* Credentials Summary Card */}
                <div className="bonus-info-card glass-panel">
                  <div className="bonus-header">
                    <Sparkles size={18} className="text-emerald-400" />
                    <span className="font-display font-bold text-white">Summary of Credentials</span>
                  </div>
                  <div className="bonus-body font-mono text-sm">
                    <div className="bonus-row">
                      <span className="b-label">Core Focus:</span>
                      <span className="b-val text-emerald-300">Responsive Web Apps & MERN Stack</span>
                    </div>

                    <div className="bonus-row">
                      <span className="b-label">Location:</span>
                      <span className="b-val text-emerald-400">Telangana, India</span>
                    </div>
                  </div>
                </div>

                {/* Close Button Strip */}
                <div className="edu-collapse-strip">
                  <button 
                    className="edu-close-btn font-mono"
                    onClick={() => {
                      playUiClick(750, 'sine', 0.05);
                      setIsEducationOpen(false);
                    }}
                  >
                    <span>Close Education Details</span>
                    <ChevronUp size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .exp-section {
          position: relative;
          padding: 30px 0;
        }

        .exp-edu-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 40px;
          align-items: start;
        }

        .column-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .col-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .col-icon.emerald {
          background: rgba(16, 185, 129, 0.12);
          color: var(--emerald-light);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .col-icon.cyan {
          background: rgba(6, 182, 212, 0.12);
          color: #67e8f9;
          border: 1px solid rgba(6, 182, 212, 0.25);
        }

        .column-heading {
          font-size: 1.45rem;
          font-weight: 800;
          color: #ffffff;
        }

        /* Timeline Track */
        .timeline-track {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-left: 24px;
        }
        .timeline-track::before {
          content: '';
          position: absolute;
          top: 15px;
          bottom: 20px;
          left: 4px;
          width: 2px;
          background: linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.2) 100%);
        }

        .timeline-item {
          position: relative;
        }

        .timeline-node {
          position: absolute;
          top: 24px;
          left: -24px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #05070a;
          border: 2px solid var(--emerald-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(-50%);
          z-index: 2;
        }
        .node-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--emerald-light);
        }
        .timeline-node.current {
          border-color: #34d399;
          box-shadow: 0 0 12px var(--emerald-primary);
        }

        .timeline-card {
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .exp-type-badge {
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-slate);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .current-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-family: var(--font-mono);
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: var(--emerald-light);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .exp-role {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
        }

        .exp-company {
          font-size: 0.95rem;
          color: var(--emerald-light);
          font-weight: 600;
          margin-top: 2px;
        }

        .exp-meta-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.78rem;
          color: var(--text-dim);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 8px 0;
        }

        .exp-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .exp-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .exp-highlights-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 14px;
          border-radius: 10px;
        }

        .highlights-label {
          font-size: 0.68rem;
          color: var(--emerald-light);
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.84rem;
          color: var(--text-slate);
          line-height: 1.5;
        }

        .exp-tech-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .exp-live-client-wrap {
          margin-top: 6px;
          padding-top: 12px;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
        }

        .exp-live-client-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--emerald-light);
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .exp-live-client-link:hover {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.15);
        }

        .pulse-dot-mini {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: pulseGlow 2s infinite;
        }

        /* Education Stack */
        .education-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .edu-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .edu-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .edu-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .edu-title-box {
          flex: 1;
        }

        .edu-score-pill {
          display: inline-block;
          font-size: 0.72rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--emerald-light);
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 4px;
        }

        .edu-degree {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
        }

        .edu-institution {
          font-size: 0.86rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .edu-meta {
          display: flex;
          gap: 14px;
          font-size: 0.76rem;
          color: var(--text-dim);
        }
        .edu-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .edu-highlight-text {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .bonus-info-card {
          padding: 22px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.07) 0%, rgba(6, 182, 212, 0.07) 100%);
          border-color: rgba(16, 185, 129, 0.25);
        }

        .bonus-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .bonus-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bonus-row {
          display: flex;
          justify-content: space-between;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .edu-accordion-trigger {
          cursor: pointer;
          user-select: none;
          padding: 8px 12px;
          margin: -8px -12px 20px;
          border-radius: var(--radius-md);
          transition: background 0.2s ease;
        }
        .edu-accordion-trigger:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .edu-title-group {
          flex: 1;
        }

        .edu-toggle-pill {
          display: inline-block;
          font-size: 0.72rem;
          color: var(--cyan-light);
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          margin-top: 3px;
        }

        .edu-chevron-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: transform 0.3s ease, background 0.25s ease, color 0.25s ease;
        }
        .edu-chevron-box.open {
          transform: rotate(180deg);
          color: var(--cyan-light);
          background: rgba(6, 182, 212, 0.15);
          border-color: rgba(6, 182, 212, 0.35);
        }

        .edu-collapsed-wrapper {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .edu-teaser-banner {
          padding: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          cursor: pointer;
          border: 1px dashed rgba(6, 182, 212, 0.35);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(16, 185, 129, 0.04) 100%);
          transition: all 0.3s ease;
        }
        .edu-teaser-banner:hover {
          border-color: rgba(6, 182, 212, 0.6);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(6, 182, 212, 0.15);
        }

        .edu-teaser-left {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .edu-teaser-badges {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .edu-count-badge {
          font-size: 0.68rem;
          color: #67e8f9;
          background: rgba(6, 182, 212, 0.15);
          border: 1px solid rgba(6, 182, 212, 0.3);
          padding: 2px 7px;
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        .edu-degree-badge {
          font-size: 0.68rem;
          color: var(--text-dim);
        }

        .edu-teaser-headline {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
        }

        .edu-teaser-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .edu-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.35);
          color: #67e8f9;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .edu-action-btn:hover {
          background: rgba(6, 182, 212, 0.25);
          border-color: #67e8f9;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.2);
        }

        .edu-animated-open {
          animation: eduFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes eduFadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .edu-collapse-strip {
          display: flex;
          justify-content: center;
          margin-top: 6px;
        }

        .edu-close-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .edu-close-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
        }

        @media (max-width: 960px) {
          .exp-edu-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
