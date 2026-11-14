import React, { useState, useRef } from 'react';
import { playUiClick } from '../utils/audio';
import { 
  Award, 
  Code2, 
  Layers, 
  Zap, 
  CheckCircle2,
  Terminal,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

const CHAPTERS = [
  {
    id: "mern-core",
    label: "MERN Core",
    icon: <Code2 size={16} />,
    title: "MERN Stack Mastery",
    subtitle: "Component Architecture & APIs",
    tagline: "FULL-STACK CAPABILITIES",
    content: (
      <>
        <p>
          I dedicated myself to mastering the <strong>MERN stack</strong> (MongoDB, Express.js, React.js, Node.js) through specialized coaching at <strong>Coding Ninjas</strong>, 
          diving deep into modern frontend state management, reusable component libraries, and performant REST API backends.
        </p>
        <p>
          With <strong>Tailwind CSS</strong> and modern CSS techniques, I craft mobile-first, 
          pixel-perfect web designs that scale smoothly across mobile phones, tablets, and desktop displays.
        </p>
        <div className="book-tech-chips">
          <span className="b-chip">React.js</span>
          <span className="b-chip">Node.js</span>
          <span className="b-chip">Express.js</span>
          <span className="b-chip">MongoDB</span>
          <span className="b-chip">Firebase</span>
          <span className="b-chip">Supabase</span>
          <span className="b-chip">Tailwind CSS</span>
        </div>
      </>
    )
  },
  {
    id: "production-impact",
    label: "Production Impact",
    icon: <Award size={16} />,
    title: "Production Delivery",
    subtitle: "Real-World Experience",
    tagline: "CLIENT IMPACT & VELOCITY",
    content: (
      <>
        <p>
          At <strong>Connectia Solution Pvt. Ltd.</strong> (Mangalore) and <strong>AtFingerTip Pvt. Ltd.</strong> (Visakhapatnam), 
          I engineered real-world client platforms, including the digital web portal for <strong>Devshe (<a href="https://devshe.in/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">devshe.in</a>)</strong>, commercial e-commerce stores, and convention booking portals.
        </p>
        <p>
          From dynamic catalogs and category filtering to REST API integrations and continuous deployments on <strong>Vercel</strong> and <strong>Netlify</strong>, 
          I ensure every project is fast, reliable, and production-ready.
        </p>
        <div className="chapter-impact-badge">
          <div className="impact-icon-col">
            <Award size={20} className="text-emerald-400" />
          </div>
          <div className="impact-text-col">
            <div className="impact-title">Live Commercial Deployments</div>
            <div className="impact-sub">Contributed to live client platforms including <strong>devshe.in</strong>, luxury venue catalogs, and high-performance frontend interfaces.</div>
          </div>
        </div>
      </>
    )
  },
  {
    id: "future-vision",
    label: "Future Vision",
    icon: <Zap size={16} />,
    title: "Looking Forward",
    subtitle: "Continuous Innovation",
    tagline: "ALWAYS EVOLVING",
    content: (
      <>
        <p>
          Web technology evolves rapidly, and I continuously sharpen my skills with modern tooling like 
          <strong> Vite</strong>, <strong>Postman API Testing</strong>, automated Git workflows, and progressive web apps.
        </p>
        <p>
          Whether building responsive dashboards, high-converting business websites, or scalable full-stack applications, 
          I am eager to collaborate with visionary teams and bring impactful ideas to life.
        </p>
        <div className="chapter-vision-grid">
          <div className="vision-pill">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>Clean Architecture</span>
          </div>
          <div className="vision-pill">
            <Zap size={14} className="text-cyan-400" />
            <span>High Performance</span>
          </div>
          <div className="vision-pill">
            <Layers size={14} className="text-amber-400" />
            <span>Scalable Components</span>
          </div>
        </div>
      </>
    )
  }
];

export default function AboutSection() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [animDirection, setAnimDirection] = useState('next');
  const [isFlipping, setIsFlipping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isProfileFlipped, setIsProfileFlipped] = useState(false);
  const [isFlippingProfile, setIsFlippingProfile] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [profileTilt, setProfileTilt] = useState({ x: 0, y: 0 });

  const handleCardClick = (e) => {
    // If user clicked inside an anchor tag (e.g. devshe.in) or button, don't trigger next
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    handleNext();
  };

  const handleProfileClick = (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (isFlippingProfile) return;
    playUiClick(920, 'sine', 0.06);
    setIsFlippingProfile(true);
    setTimeout(() => {
      setIsProfileFlipped((prev) => !prev);
      setIsFlippingProfile(false);
    }, 240);
  };

  const goToChapter = (idx) => {
    if (idx === currentChapter || isFlipping) return;
    playUiClick(820 + idx * 50, 'sine', 0.05);
    setAnimDirection(idx > currentChapter ? 'next' : 'prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentChapter(idx);
      setIsFlipping(false);
    }, 280);
  };

  const handleNext = () => {
    if (currentChapter < CHAPTERS.length - 1) {
      goToChapter(currentChapter + 1);
    } else {
      goToChapter(0);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleProfileMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setProfileTilt({ x: rotateX, y: rotateY });
  };

  const activeData = CHAPTERS[currentChapter];

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title text-gradient">
            Behind the <span className="text-gradient-emerald">Journey and Craft</span>
          </h2>
        </div>

        <div className="about-grid">
          {/* Left Column: Interactive Animated Chapter Experience */}
          <div className="chronicle-experience-container">
            {/* Animated Stepper Track (Chapter 01, 02, 03) */}
            <div className="stepper-circuit-track">
              {/* Animated Progress Bar behind nodes */}
              <div className="circuit-bar-bg">
                <div 
                  className="circuit-bar-fill"
                  style={{ width: `${(currentChapter / (CHAPTERS.length - 1)) * 100}%` }}
                >
                  <div className="circuit-energy-glow"></div>
                </div>
              </div>

              {/* Stepper Nodes */}
              <div className="circuit-nodes-row">
                {CHAPTERS.map((ch, idx) => {
                  const isActive = idx === currentChapter;
                  const isPassed = idx < currentChapter;
                  return (
                    <button
                      key={ch.id}
                      className={`circuit-node-btn ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                      onClick={() => goToChapter(idx)}
                      title={`Go to ${ch.title}`}
                    >
                      <div className="node-outer-halo"></div>
                      <div className="node-circle">
                        <span className="node-icon">{ch.icon}</span>
                        {isActive && <span className="node-pulse-ring"></span>}
                      </div>
                      <div className="node-label-wrap">
                        <span className="node-label-name font-display">{ch.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Animated Chapter Card */}
            <div 
              className="chapter-card-3d-wrap"
              style={{ perspective: '1200px' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                handleMouseLeave();
              }}
            >
              <div 
                ref={cardRef}
                onClick={handleCardClick}
                className={`chapter-card-surface glass-panel ${isHovered ? 'hovered' : ''} ${isFlipping ? `flipping-${animDirection}` : 'idle'}`}
                style={{
                  transform: isFlipping 
                    ? undefined 
                    : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.025 : 1}) translateY(${isHovered ? -4 : 0}px)`,
                  transition: isFlipping 
                    ? 'transform 0.28s ease, opacity 0.28s ease' 
                    : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
                  cursor: 'pointer',
                }}
                title="Click card to open next chapter"
              >
                {/* Chapter Heading */}
                <div className="chapter-header-area">
                  <div className="chapter-tagline font-mono">{activeData.tagline}</div>
                  <h3 className="chapter-main-title font-display text-gradient">
                    {activeData.title}
                  </h3>
                  <div className="chapter-subtitle font-mono">
                    {activeData.subtitle}
                  </div>
                </div>

                {/* Chapter Dynamic Body */}
                <div className="chapter-content-body">
                  {activeData.content}
                </div>

                {/* Bottom Navigation & Controls */}
                <div className="chapter-card-footer">
                  <div className="chapter-read-hint font-mono">
                    <span className="pulse-dot"></span>
                    <span className="hint-click-tag">Click card to open next chapter →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Core Competencies as Chapter-Styled 3D Flip Card */}
          <div className="about-details-col">
            <div 
              className="chapter-card-3d-wrap profile-card-wrap"
              style={{ perspective: '1200px' }}
              onMouseMove={handleProfileMouseMove}
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => {
                setIsProfileHovered(false);
                setProfileTilt({ x: 0, y: 0 });
              }}
            >
              <div 
                id="journey-profile-flip-card"
                onClick={handleProfileClick}
                className={`chapter-card-surface glass-panel profile-flip-card ${isProfileHovered ? 'hovered' : ''} ${isFlippingProfile ? 'flipping-next' : 'idle'}`}
                style={{
                  transform: isFlippingProfile 
                    ? undefined 
                    : `rotateX(${profileTilt.x}deg) rotateY(${profileTilt.y}deg) scale(${isProfileHovered ? 1.025 : 1}) translateY(${isProfileHovered ? -4 : 0}px)`,
                  transition: isFlippingProfile 
                    ? 'transform 0.24s ease, opacity 0.24s ease' 
                    : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
                  cursor: 'pointer',
                }}
                role="button"
                tabIndex={0}
                title={isProfileFlipped ? 'Click card to flip back to profile' : 'Click card to view core capabilities'}
              >
                {!isProfileFlipped ? (
                  /* FRONT: Shivani Gampa Profile */
                  <>
                    <div className="chapter-header-area">
                      <div className="chapter-tagline font-mono">ENGINEERING PHILOSOPHY</div>
                      <h3 className="chapter-main-title font-display text-gradient">
                        Shivani Gampa
                      </h3>
                      <div className="chapter-subtitle font-mono">
                        Web Developer • MERN Stack Specialist
                      </div>
                    </div>

                    <div className="chapter-content-body profile-flip-body">
                      <div className="profile-header-integrated">
                        <div className="profile-avatar-box">
                          <img 
                            src="/assets/shivani-avatar.jpg" 
                            alt="Shivani Gampa - Professional Web Developer" 
                            className="profile-photo"
                          />
                          <div className="verified-badge-mini" title="Verified Web Developer">✓</div>
                        </div>
                        <div className="profile-status-block font-mono">
                          <span className="live-status-pill">● Available for Web Projects</span>
                          <span className="location-pill">📍 Telangana, India</span>
                        </div>
                      </div>

                      <p className="profile-bio-text">
                        I build responsive, high-performing web applications with clean architecture and modern user experience. 
                        Equally comfortable with frontend component engineering, REST API integration, state management, and production cloud deployments.
                      </p>

                      <div className="profile-badges-row font-mono">
                        <span className="tech-badge">React.js</span>
                        <span className="tech-badge">JavaScript</span>
                        <span className="tech-badge">Node.js</span>
                        <span className="tech-badge">Tailwind CSS</span>
                        <span className="tech-badge">MongoDB</span>
                        <span className="tech-badge">Firebase</span>
                        <span className="tech-badge">Supabase</span>
                      </div>
                    </div>

                    <div className="chapter-card-footer">
                      <div className="chapter-read-hint font-mono">
                        <span className="pulse-dot"></span>
                        <span className="hint-click-tag">Click card to view core capabilities ↻</span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* BACK: 4 Core Capabilities */
                  <>
                    <div className="chapter-header-area">
                      <div className="chapter-tagline font-mono">CORE CAPABILITIES</div>
                      <h3 className="chapter-main-title font-display text-gradient">
                        Engineering Pillars
                      </h3>
                      <div className="chapter-subtitle font-mono">
                        Reusable UI • Clean APIs • Practical Delivery
                      </div>
                    </div>

                    <div className="chapter-content-body profile-back-body">
                      <div className="capabilities-compact-grid">
                        <div className="cap-item glass-panel">
                          <div className="cap-icon-box emerald">
                            <Code2 size={18} />
                          </div>
                          <div>
                            <h4 className="cap-title">Reusable Components</h4>
                            <p className="cap-desc">Modular React architecture with clean, maintainable, reusable code.</p>
                          </div>
                        </div>

                        <div className="cap-item glass-panel">
                          <div className="cap-icon-box cyan">
                            <Terminal size={18} />
                          </div>
                          <div>
                            <h4 className="cap-title">API Integration</h4>
                            <p className="cap-desc">Seamless REST API orchestration, JSON endpoints, and dynamic feeds.</p>
                          </div>
                        </div>

                        <div className="cap-item glass-panel">
                          <div className="cap-icon-box emerald">
                            <Sparkles size={18} />
                          </div>
                          <div>
                            <h4 className="cap-title">Pixel-Perfect UI</h4>
                            <p className="cap-desc">Mobile-first design with responsive breakpoints and smooth micro-animations.</p>
                          </div>
                        </div>

                        <div className="cap-item glass-panel">
                          <div className="cap-icon-box cyan">
                            <HeartHandshake size={18} />
                          </div>
                          <div>
                            <h4 className="cap-title">Practical Delivery</h4>
                            <p className="cap-desc">Fast turnaround, Git-based version control, and CI/CD on Vercel/Netlify.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="chapter-card-footer">
                      <div className="chapter-read-hint font-mono">
                        <span className="pulse-dot"></span>
                        <span className="hint-click-tag">Click card to flip back to profile ↻</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          padding: 30px 0;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        /* Chronicle Experience Container */
        .chronicle-experience-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Stepper Circuit Track */
        .stepper-circuit-track {
          position: relative;
          padding: 12px 16px;
          background: rgba(10, 15, 25, 0.65);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .circuit-bar-bg {
          position: absolute;
          top: 32px;
          left: 45px;
          right: 45px;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          z-index: 1;
          overflow: hidden;
        }

        .circuit-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%);
          position: relative;
          transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .circuit-energy-glow {
          position: absolute;
          right: 0;
          top: -3px;
          bottom: -3px;
          width: 20px;
          background: #34d399;
          filter: blur(4px);
          border-radius: 50%;
        }

        .circuit-nodes-row {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .circuit-node-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          position: relative;
          transition: transform 0.25s ease;
        }

        .circuit-node-btn:hover {
          transform: translateY(-2px);
        }

        .node-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #0b111e;
          border: 2px solid rgba(255, 255, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.35s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .node-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          transition: all 0.3s ease;
        }

        .circuit-node-btn.passed .node-circle {
          border-color: rgba(16, 185, 129, 0.5);
          background: rgba(16, 185, 129, 0.12);
        }
        .circuit-node-btn.passed .node-icon {
          color: var(--emerald-light);
        }

        .circuit-node-btn.active .node-circle {
          background: #08171d;
          border-color: var(--emerald-primary);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.5), inset 0 0 10px rgba(16, 185, 129, 0.3);
          transform: scale(1.1);
        }

        .circuit-node-btn.active .node-icon {
          color: #ffffff;
          transform: scale(1.15);
        }

        .node-pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1.5px solid var(--emerald-primary);
          animation: ringPulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          opacity: 0.7;
        }

        @keyframes ringPulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.45); opacity: 0; }
        }

        .node-label-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: 4px;
        }

        .node-label-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: color 0.25s ease;
        }

        .circuit-node-btn.active .node-label-name {
          color: #ffffff;
          font-weight: 700;
        }

        /* 3D Chapter Card */
        .chapter-card-3d-wrap {
          perspective: 1200px;
        }

        .chapter-card-surface {
          padding: 32px 30px;
          border-radius: var(--radius-xl);
          background: rgba(10, 16, 28, 0.78);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(16, 185, 129, 0.22);
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 30px rgba(16, 185, 129, 0.06);
          position: relative;
          overflow: hidden;
          will-change: transform, opacity;
          cursor: pointer;
          user-select: none;
        }

        .chapter-card-surface.hovered {
          border-color: rgba(16, 185, 129, 0.55);
          box-shadow: 0 28px 65px -10px rgba(0, 0, 0, 0.85), 0 0 45px rgba(16, 185, 129, 0.25);
        }

        .hint-click-tag {
          font-size: 0.72rem;
          color: var(--emerald-light);
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          margin-left: 8px;
          transition: all 0.25s ease;
          display: inline-block;
        }

        .chapter-card-surface.hovered .hint-click-tag {
          background: rgba(16, 185, 129, 0.3);
          color: #ffffff;
          border-color: rgba(16, 185, 129, 0.65);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
          transform: translateX(3px);
        }

        .chapter-card-surface::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%);
        }

        /* Flip transitions */
        .chapter-card-surface.flipping-next {
          opacity: 0.3;
          transform: perspective(1000px) rotateY(-12deg) translateY(-8px) scale(0.98);
        }

        .chapter-card-surface.flipping-prev {
          opacity: 0.3;
          transform: perspective(1000px) rotateY(12deg) translateY(-8px) scale(0.98);
        }

        .chapter-card-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 18px;
        }

        .topbar-chapter-tag {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--emerald-light);
          letter-spacing: 0.06em;
        }

        .topbar-progress-indicator {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .topbar-pct {
          font-size: 0.7rem;
          color: var(--text-dim);
          letter-spacing: 0.06em;
        }

        .topbar-meter {
          width: 50px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .topbar-meter-fill {
          height: 100%;
          background: var(--emerald-primary);
          transition: width 0.35s ease;
        }

        .chapter-header-area {
          margin-bottom: 16px;
        }

        .chapter-tagline {
          font-size: 0.7rem;
          color: var(--text-dim);
          letter-spacing: 0.12em;
          margin-bottom: 4px;
        }

        .chapter-main-title {
          font-size: 1.7rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .chapter-subtitle {
          font-size: 0.82rem;
          color: var(--emerald-light);
          letter-spacing: 0.04em;
        }

        .chapter-content-body {
          color: var(--text-muted);
          font-size: 0.94rem;
          line-height: 1.7;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 250px;
        }

        .chapter-content-body strong {
          color: #ffffff;
        }

        /* Code Snippet for Chapter 01 */
        .chapter-code-snippet {
          background: #060a12;
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          font-size: 0.78rem;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6);
        }

        .code-header {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-bottom: 8px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #10b981; }

        .code-filename {
          font-size: 0.68rem;
          color: var(--text-dim);
          margin-left: 6px;
        }

        .code-content {
          line-height: 1.6;
        }
        .code-keyword { color: #f43f5e; }
        .code-var { color: #38bdf8; }
        .code-prop { color: #a78bfa; }
        .code-str { color: #34d399; }

        .book-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .b-chip {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .b-chip:hover {
          border-color: rgba(16, 185, 129, 0.4);
          color: var(--emerald-light);
          background: rgba(16, 185, 129, 0.1);
        }

        /* Impact Badge for Chapter 02 */
        .chapter-impact-badge {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.28);
          padding: 14px 16px;
          border-radius: var(--radius-md);
          margin-top: 6px;
        }

        .impact-icon-col {
          padding-top: 2px;
        }

        .impact-title {
          font-family: var(--font-display);
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .impact-sub {
          font-size: 0.82rem;
          color: var(--text-slate);
          line-height: 1.5;
        }

        /* Vision Grid for Chapter 03 */
        .chapter-vision-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 8px;
        }

        .vision-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: #ffffff;
          font-weight: 500;
        }

        /* Card Footer */
        .chapter-card-footer {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 10px;
        }

        .chapter-read-hint {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          transition: all 0.3s ease;
        }

        .chapter-card-surface:hover .chapter-read-hint {
          color: var(--emerald-light);
          border-color: rgba(16, 185, 129, 0.25);
          background: rgba(16, 185, 129, 0.06);
        }

        /* Profile Flip Card - Styled identically to Chapter Cards */
        .profile-card-wrap {
          height: 100%;
        }

        .profile-flip-card {
          min-height: 520px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .profile-flip-body,
        .profile-back-body {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .profile-header-integrated {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .profile-avatar-box {
          position: relative;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, var(--emerald-primary), var(--cyan-primary));
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.35);
          flex-shrink: 0;
        }

        .profile-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center center;
          background: #0f172a;
        }

        .verified-badge-mini {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 20px;
          height: 20px;
          background: var(--emerald-primary);
          color: #05070a;
          font-weight: 800;
          font-size: 0.7rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #070d18;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }

        .profile-status-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .live-status-pill {
          font-size: 0.72rem;
          color: var(--emerald-light);
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.28);
          padding: 3px 9px;
          border-radius: var(--radius-full);
        }

        .location-pill {
          font-size: 0.72rem;
          color: var(--text-dim);
        }

        .profile-bio-text {
          color: var(--text-muted);
          font-size: 0.92rem;
          line-height: 1.6;
          margin-bottom: 14px;
        }

        .profile-badges-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        /* Back Face Capabilities Grid */
        .capabilities-compact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-top: 4px;
          margin-bottom: auto;
        }

        .cap-item {
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: var(--radius-md);
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .cap-item:hover {
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.08);
          transform: translateX(4px);
        }

        .cap-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cap-icon-box.emerald {
          background: rgba(16, 185, 129, 0.12);
          color: var(--emerald-light);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .cap-icon-box.cyan {
          background: rgba(6, 182, 212, 0.12);
          color: var(--cyan-light);
          border: 1px solid rgba(6, 182, 212, 0.25);
        }

        .cap-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.25;
          margin-bottom: 2px;
        }

        .cap-desc {
          font-size: 0.76rem;
          color: var(--text-dim);
          line-height: 1.36;
          margin: 0;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .profile-card-wrap,
          .profile-flip-card {
            min-height: 520px;
          }
        }

        @media (max-width: 600px) {
          .chapter-card-surface,
          .card-flipper-face {
            padding: 20px 16px 18px;
          }
          .profile-card-wrap,
          .profile-flip-card {
            min-height: 480px;
          }
          .profile-avatar-box {
            width: 56px;
            height: 56px;
          }
          .profile-bio-text {
            font-size: 0.82rem;
            line-height: 1.48;
            margin-bottom: 10px;
          }
          .profile-badges-row .tech-badge {
            font-size: 0.65rem;
            padding: 2px 7px;
          }
          .capabilities-compact-grid {
            grid-template-columns: 1fr;
            gap: 7px;
          }
          .cap-item {
            padding: 8px 10px;
            flex-direction: row;
            align-items: center;
            gap: 10px;
          }
          .cap-icon-box {
            width: 28px;
            height: 28px;
            flex-shrink: 0;
          }
          .cap-icon-box svg {
            width: 15px;
            height: 15px;
          }
          .cap-title {
            font-size: 0.8rem;
            margin: 0;
          }
          .cap-desc {
            font-size: 0.68rem;
            line-height: 1.25;
            margin: 0;
          }
          .stepper-circuit-track {
            padding: 10px 12px;
          }
          .circuit-bar-bg {
            left: 25px;
            right: 25px;
          }
          .node-circle {
            width: 32px;
            height: 32px;
          }
          .node-label-name {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
