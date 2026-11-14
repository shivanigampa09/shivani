import React, { useState, useEffect } from 'react';
import InteractiveLanyard from './InteractiveLanyard';
import { playUiClick } from '../utils/audio';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Zap, 
  Clock,
  Rocket
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const ROLES = [
  'React.js Developer',
  'MERN Stack Engineer',
  'Responsive UI Specialist',
  'REST API Integrator',
  'Tailwind CSS Enthusiast'
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  // Decrypted text matrix glitch effect for the main title
  const targetName = "SHIVANI GAMPA";
  const [glitchName, setGlitchName] = useState(targetName);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let iteration = 0;
    const interval = setInterval(() => {
      setGlitchName(
        targetName
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetName[index];
            }
            if (letter === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetName.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for roles
  useEffect(() => {
    const fullRole = ROLES[roleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullRole.substring(0, currentText.length - 1));
        setTypingSpeed(45);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullRole.substring(0, currentText.length + 1));
        setTypingSpeed(110);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullRole) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && currentText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setTypingSpeed(110);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const handleScrollTo = (id) => {
    playUiClick(800, 'sine', 0.05);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="section-container hero-grid">
        {/* Left Column: Intro Content */}
        <div className="hero-content">
          {/* Heading with Decrypted / Matrix Glitch Effect */}
          <div className="hero-title-area">
            <p className="hero-greeting">
              <span className="code-bracket">&lt;</span> Hello World, I'm <span className="code-bracket">/&gt;</span>
            </p>
            <h1 className="hero-name font-display text-gradient">
              {glitchName}
            </h1>
          </div>

          {/* Rotating Role subtitle */}
          <div className="hero-role-wrapper">
            <span className="role-prefix">I build modern web apps as a </span>
            <span className="role-highlight font-mono">
              {currentText}
              <span className="cursor-blink">|</span>
            </span>
          </div>

          {/* Bio paragraph from resume */}
          <p className="hero-bio">
            Web Developer with hands-on experience building responsive and user-friendly web applications using 
            <strong className="text-white"> React.js</strong>, <strong className="text-white">JavaScript</strong>, 
            <strong className="text-white"> Node.js</strong>, <strong className="text-white">Express.js</strong>, 
            and <strong className="text-white">Tailwind CSS</strong>. Focused on creating scalable solutions, 
            reusable components, and polished user experiences.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions">
            <button 
              className="btn-primary"
              onClick={() => handleScrollTo('projects')}
            >
              <span>Explore Projects</span>
              <ArrowRight size={17} />
            </button>
            <a 
              href="mailto:gampashivani09@gmail.com"
              className="btn-secondary"
              onClick={() => playUiClick()}
            >
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Social Links & Quick Contact */}
          <div className="hero-social-strip">
            <span className="social-label font-mono">FIND ME ON:</span>
            <div className="social-links">
              <a 
                href="https://github.com/shivanigampa09" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn" 
                title="GitHub - shivanigampa09"
                onClick={() => playUiClick()}
              >
                <GithubIcon size={18} />
                <span>GitHub</span>
              </a>
              <a 
                href="https://linkedin.com/in/shivanigampa" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn" 
                title="LinkedIn - shivanigampa"
                onClick={() => playUiClick()}
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>
              <a 
                href="mailto:gampashivani09@gmail.com" 
                className="social-btn" 
                title="Email Shivani"
                onClick={() => playUiClick()}
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
              <a 
                href="tel:9398323989" 
                className="social-btn" 
                title="Call Shivani"
                onClick={() => playUiClick()}
              >
                <Phone size={18} />
                <span>+91 9398323989</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Lanyard Card */}
        <div className="hero-lanyard-wrapper">
          <InteractiveLanyard />
        </div>
      </div>

      {/* Hero Stats Strip */}
      <div className="hero-stats-bar">
        <div className="section-container stats-grid">
          <div className="stat-card glass-panel">
            <div className="stat-icon-wrap emerald">
              <Clock size={22} />
            </div>
            <div className="stat-text">
              <div className="stat-value font-display text-gradient-emerald">100%</div>
              <div className="stat-desc">Delivery In Time</div>
            </div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-icon-wrap cyan">
              <Zap size={22} />
            </div>
            <div className="stat-text">
              <div className="stat-value font-display text-gradient-cyan">10+</div>
              <div className="stat-desc">Modern Tech Skills</div>
            </div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-icon-wrap emerald">
              <CheckCircle2 size={22} />
            </div>
            <div className="stat-text">
              <div className="stat-value font-display text-gradient-emerald">100%</div>
              <div className="stat-desc">Responsive & Clean Code</div>
            </div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-icon-wrap cyan">
              <Rocket size={22} />
            </div>
            <div className="stat-text">
              <div className="stat-value font-display text-gradient-cyan">Fast</div>
              <div className="stat-desc">Performance & Scalability</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 85px;
          position: relative;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
          padding-top: 16px;
          padding-bottom: 28px;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hero-status-pill {
          align-self: flex-start;
          margin-bottom: 4px;
        }

        .hero-greeting {
          font-family: var(--font-mono);
          font-size: 1.05rem;
          color: var(--emerald-light);
          margin-bottom: 6px;
        }

        .code-bracket {
          color: #64748b;
        }

        .hero-name {
          font-size: clamp(2.6rem, 5.5vw, 4.4rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .hero-role-wrapper {
          font-size: 1.25rem;
          color: var(--text-slate);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }

        .role-highlight {
          color: var(--emerald-light);
          font-weight: 700;
          background: rgba(16, 185, 129, 0.1);
          padding: 2px 10px;
          border-radius: 6px;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .cursor-blink {
          display: inline-block;
          animation: blink 1s step-end infinite;
          color: var(--emerald-light);
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-bio {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px;
          margin-top: 10px;
        }

        .hero-social-strip {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .social-label {
          font-size: 0.75rem;
          color: var(--text-dim);
          letter-spacing: 0.12em;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 7px 14px;
          border-radius: var(--radius-full);
          color: var(--text-slate);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }
        .social-btn:hover {
          background: rgba(16, 185, 129, 0.12);
          border-color: rgba(16, 185, 129, 0.35);
          color: var(--emerald-light);
          transform: translateY(-2px);
        }

        .hero-lanyard-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-stats-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 15, 25, 0.4);
          backdrop-filter: blur(12px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding-top: 18px;
          padding-bottom: 18px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
        }

        .stat-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-icon-wrap.emerald {
          background: rgba(16, 185, 129, 0.12);
          color: var(--emerald-light);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .stat-icon-wrap.cyan {
          background: rgba(6, 182, 212, 0.12);
          color: #67e8f9;
          border: 1px solid rgba(6, 182, 212, 0.25);
        }

        .stat-value {
          font-size: 1.85rem;
          font-weight: 800;
          line-height: 1.1;
        }

        .stat-desc {
          font-size: 0.84rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 50px;
          }
          .hero-content {
            align-items: center;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-social-strip {
            align-items: center;
          }
          .social-links {
            justify-content: center;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .hero-grid {
            gap: 32px;
            padding-top: 8px;
            padding-bottom: 24px;
          }
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .hero-name {
            font-size: 2.2rem;
          }
          .hero-role-wrapper {
            font-size: 1rem;
          }
          .hero-bio {
            font-size: 0.92rem;
            line-height: 1.6;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions .btn-primary,
          .hero-actions .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
