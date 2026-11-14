import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playUiClick, playSuccessChime } from '../utils/audio';
import { 
  Terminal as TerminalIcon, 
  Tv,
  CornerDownLeft
} from 'lucide-react';

const INITIAL_OUTPUT = [
  { text: "=== SHIVANI GAMPA // DEVELOPER TERMINAL v2.6 ===", type: "system" },
  { text: "Type 'help' to view available system commands or click the shortcut chips below.", type: "info" },
  { text: "System initialized. Welcome visitor!", type: "success" },
];

const getFormattedDate = () => new Date().toString();

export default function FaultyTerminal() {
  const [history, setHistory] = useState(INITIAL_OUTPUT);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [scanlines, setScanlines] = useState(true);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    playUiClick(850, 'sine', 0.04);

    const newHistory = [...history, { text: `visitor@shivani:~$ ${raw}`, type: "user" }];
    const cmd = raw.toLowerCase();

    // Add to command history
    setCmdHistory((prev) => [...prev, raw]);
    setCmdHistoryIdx(-1);

    switch (cmd) {
      case 'help':
        newHistory.push({
          text: `AVAILABLE COMMANDS:
  • about        - Summary of Shivani Gampa & background
  • skills       - Technical capabilities & MERN stack matrix
  • projects     - Live commercial sites & GitHub repositories
  • experience   - Connectia Solution & AtFingerTip roles
  • education    - B.Sc. Computer Science degree & GPA
  • contact      - Phone, Email, LinkedIn & GitHub coordinates
  • resume       - Download official Resume PDF
  • sudo hire shivani - Instant offer / interview invitation
  • clear        - Wipe terminal screen`,
          type: "system",
        });
        break;

      case 'about':
        newHistory.push({
          text: `SHIVANI GAMPA — Web Developer (MERN Stack)
Location: Telangana, India
Summary: Web Developer with hands-on experience building responsive and user-friendly web applications using React.js, JavaScript, Node.js, Express.js, HTML, CSS, and Tailwind CSS.
Focus: Scalable web solutions, reusable components, and polished user experiences.`,
          type: "info",
        });
        break;

      case 'skills':
        newHistory.push({
          text: `TECHNICAL SKILLS MATRIX:
• Frontend:   React.js, JavaScript (ES6+), HTML5, CSS3, Vite
• Backend:    Node.js, Express.js, REST APIs, JSON
• Database:   MongoDB, Mongoose ODM, Supabase (PostgreSQL), Firebase
• BaaS/Cloud: Firebase, Supabase, Render, Railway, Vercel, Netlify
• Styling:    Tailwind CSS, Bootstrap, Responsive Web Design
• Tools:      Git, GitHub, VS Code, Postman`,
          type: "success",
        });
        break;

      case 'projects':
        newHistory.push({
          text: `FEATURED LIVE PROJECTS:
[1] Mihika Ayra — Business & Modern E-Commerce Platform
    Stack: React.js, Vite, Tailwind CSS, Netlify
    Live:  https://mihikaayra.netlify.app/

[2] Aishwarya Convention — Luxury Convention Hall & Event Portal
    Stack: HTML5, CSS3, JavaScript, PHP, Google Maps API
    Live:  https://aishwaryaconvention.com

[3] Hotel Ananda Inn — Luxury Hotel, Suites & Convention Centre
    Stack: HTML5, CSS3, Modern JS, PHP, Tailwind CSS, Swiper.js
    Live:  https://www.anandainn.com/

[4] Devshe (devshe.in) — Media, Content, Shopping & Digital Platform
    Client/Company: Connectia Solution Pvt. Ltd.
    Stack: React.js, Vite, Tailwind CSS, REST APIs
    Live:  https://devshe.in/`,
          type: "info",
        });
        break;

      case 'experience':
        newHistory.push({
          text: `WORK EXPERIENCE:
• AtFingerTip Pvt. Ltd. (Web Developer | Visakhapatnam | Feb 2026 – Present)
  Responsive UI development, modern web standards & practical web delivery.

• Connectia Solution Pvt. Ltd. (Web Developer Intern | Mangalore | Dec 2025 – Feb 2026)
  Contributed to Devshe (devshe.in) web platform, developed responsive web apps using React.js & Tailwind CSS, REST APIs, deployed on Vercel.`,
          type: "info",
        });
        break;

      case 'education':
        newHistory.push({
          text: `EDUCATION & PROFESSIONAL COACHING:
• Coding Ninjas
  MERN Stack Web Development Specialization | Full-Stack Coaching & Certification

• Singareni Degree College, Mancherial
  Bachelor of Computer Science (B.Sc.) | 2018 – 2021 | GPA: 79.9%

• Sri Gayathri Junior College, Karimnagar
  MPC (Maths, Physics, Chemistry) | 2016 – 2018 | GPA: 80%

• T.S. Model School, Mandamarri, Mancherial
  Secondary School (SSC) | 2016 | GPA: 80%`,
          type: "info",
        });
        break;

      case 'contact':
        newHistory.push({
          text: `CONNECT WITH SHIVANI:
• Phone:    +91 9398323989
• Email:    gampashivani09@gmail.com
• LinkedIn: https://linkedin.com/in/shivanigampa
• GitHub:   https://github.com/shivanigampa09`,
          type: "success",
        });
        break;

      case 'resume':
        newHistory.push({
          text: "Initiating download for Shivani_Gampa_Resume.pdf...",
          type: "success",
        });
        const link = document.createElement('a');
        link.href = '/Shivani_Gampa_Resume.pdf';
        link.download = 'Shivani_Gampa_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case 'sudo hire shivani':
      case 'hire':
        playSuccessChime();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#06b6d4', '#ffffff']
        });
        newHistory.push({
          text: `ACCESS GRANTED: WELCOME ABOARD! 🎉
Thank you for your interest! Shivani Gampa is thrilled to connect with your team.
Direct contact:
  • Email: gampashivani09@gmail.com
  • Phone: +91 9398323989
Let's build something exceptional together!`,
          type: "special",
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'date':
        newHistory.push({
          text: getFormattedDate(),
          type: "info",
        });
        break;

      default:
        newHistory.push({
          text: `bash: command not found: '${raw}'. Type 'help' for available commands.`,
          type: "error",
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = cmdHistoryIdx === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIdx - 1);
      setCmdHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      if (cmdHistoryIdx < cmdHistory.length - 1 && cmdHistoryIdx !== -1) {
        const nextIdx = cmdHistoryIdx + 1;
        setCmdHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else {
        setCmdHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const executeShortcut = (cmd) => {
    handleCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <section id="terminal" className="terminal-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">INTERACTIVE CLI</span>
          <h2 className="section-title text-gradient">
            Developer <span className="text-gradient-emerald">Terminal</span>
          </h2>
          <p className="section-subtitle">
            Prefer the command line? Query my background, skills, live projects, and credentials right here.
          </p>
        </div>

        {/* Terminal Box */}
        <div className={`terminal-window ${scanlines ? 'crt-scanlines' : ''}`}>
          {/* Terminal Titlebar */}
          <div className="terminal-titlebar">
            <div className="titlebar-controls">
              <span className="ctrl-dot red"></span>
              <span className="ctrl-dot yellow"></span>
              <span className="ctrl-dot green"></span>
            </div>

            <div className="terminal-title font-mono">
              <TerminalIcon size={14} className="text-emerald-400" />
              <span>shivani@portfolio:~ (zsh)</span>
            </div>

            <div className="titlebar-actions">
              <button
                className={`scanline-toggle ${scanlines ? 'active' : ''}`}
                onClick={() => setScanlines(!scanlines)}
                title="Toggle CRT Scanline Effect"
              >
                <Tv size={14} />
                <span>CRT</span>
              </button>
            </div>
          </div>

          {/* Quick Command Suggestions */}
          <div className="terminal-shortcuts-bar">
            <span className="shortcuts-label font-mono">SHORTCUTS:</span>
            <div className="shortcuts-scroll">
              {['help', 'about', 'skills', 'projects', 'experience', 'education', 'contact', 'resume', 'sudo hire shivani', 'clear'].map((c) => (
                <button
                  key={c}
                  className="shortcut-chip font-mono"
                  onClick={() => executeShortcut(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            className="terminal-body font-mono"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, idx) => (
              <div key={idx} className={`term-line term-${line.type}`}>
                <pre className="term-pre">{line.text}</pre>
              </div>
            ))}

            {/* Input Line */}
            <div className="term-input-row">
              <span className="term-prompt">visitor@shivani:~$</span>
              <input
                ref={inputRef}
                type="text"
                className="term-input font-mono"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command... (e.g. 'help')"
                autoComplete="off"
                spellCheck="false"
              />
              <button 
                className="term-send-btn" 
                onClick={() => handleCommand(inputVal)}
                aria-label="Execute command"
              >
                <CornerDownLeft size={14} />
              </button>
            </div>

            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      <style>{`
        .terminal-section {
          position: relative;
          padding: 30px 0 45px;
        }

        .terminal-window {
          max-width: 980px;
          margin: 0 auto;
          background: #070b12;
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: var(--radius-lg);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 30px rgba(16, 185, 129, 0.12);
          overflow: hidden;
          position: relative;
        }

        .terminal-window.crt-scanlines::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
          z-index: 20;
          background-size: 100% 3px, 6px 100%;
          pointer-events: none;
        }

        .terminal-titlebar {
          background: #0d1422;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .titlebar-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ctrl-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .ctrl-dot.red { background-color: #ef4444; }
        .ctrl-dot.yellow { background-color: #f59e0b; }
        .ctrl-dot.green { background-color: #10b981; }

        .terminal-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-slate);
        }

        .titlebar-actions {
          display: flex;
          align-items: center;
        }

        .scanline-toggle {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-dim);
          font-size: 0.72rem;
          padding: 3px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .scanline-toggle.active {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.35);
          color: var(--emerald-light);
        }

        .terminal-shortcuts-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 18px;
          background: rgba(13, 20, 34, 0.6);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          overflow-x: auto;
        }

        .shortcuts-label {
          font-size: 0.68rem;
          color: var(--text-dim);
          white-space: nowrap;
        }

        .shortcuts-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .shortcuts-scroll::-webkit-scrollbar {
          display: none;
        }

        .shortcut-chip {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--emerald-light);
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 0.74rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .shortcut-chip:hover {
          background: rgba(16, 185, 129, 0.18);
          border-color: rgba(16, 185, 129, 0.4);
          transform: translateY(-1px);
        }

        .terminal-body {
          padding: 22px;
          min-height: 380px;
          max-height: 480px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.88rem;
          cursor: text;
        }

        .term-line {
          line-height: 1.55;
        }

        .term-pre {
          font-family: inherit;
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
        }

        .term-system { color: #38bdf8; }
        .term-info { color: #cbd5e1; }
        .term-success { color: #34d399; }
        .term-special { 
          color: #a7f3d0; 
          background: rgba(16, 185, 129, 0.1); 
          padding: 10px; 
          border-radius: 6px; 
          border: 1px dashed rgba(16, 185, 129, 0.4);
        }
        .term-error { color: #f87171; }
        .term-user { color: #facc15; font-weight: 600; margin-top: 6px; }

        .term-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        .term-prompt {
          color: var(--emerald-light);
          font-weight: 600;
          white-space: nowrap;
          font-size: 0.86rem;
        }

        .term-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 0.88rem;
          outline: none;
        }

        .term-send-btn {
          background: transparent;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          padding: 4px;
        }
        .term-send-btn:hover {
          color: var(--emerald-light);
        }

        @media (max-width: 640px) {
          .term-prompt {
            font-size: 0.78rem;
          }
          .terminal-body {
            font-size: 0.8rem;
            min-height: 320px;
          }
        }
      `}</style>
    </section>
  );
}
