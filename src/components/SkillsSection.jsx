import React from 'react';
import { playUiClick } from '../utils/audio';

// LINE 1 TOOLS: Moves towards the RIGHT
const LINE_1_TOOLS = [
  {
    name: 'React.js',
    badge: 'Frontend Core',
    status: 'Component Architecture',
    description: 'Component architecture, Hooks (useState, useEffect, useMemo), Context API & reactive state.',
    cli: 'npm run build',
    iconColor: '#61dafb',
    icon: (
      <svg className="tech-svg" viewBox="0 0 115.3 100" fill="currentColor">
        <path d="M57.6,40.1c-5.5,0-9.9,4.4-9.9,9.9s4.4,9.9,9.9,9.9s9.9-4.4,9.9-9.9S63.1,40.1,57.6,40.1z M111.4,41.9 c-1.2-6.5-4.5-12.7-9.5-17.6c-5-4.9-11.2-8.1-17.7-9.2c-7.9-1.3-16.1-0.2-23.7,3.3c-2.4-4-5.2-7.8-8.4-11.3 C44.8,0.5,35.6-1.5,27.1,1.5c-8.4,3-14.9,9.7-17.7,18.2c-2.5,7.6-1.9,15.9,1.7,23.2c-4.3,2.4-8.2,5.5-11.6,9.2 C-1.1,58.8-0.1,68.9,3,76.5c3.2,7.7,9.5,13.8,17.3,16.8c7.3,2.8,15.5,2.6,22.7-0.7c2.5,4,5.4,7.8,8.7,11.2 c7.2,6.8,16.5,8.8,25.1,5.6c8.4-3.1,14.8-9.8,17.5-18.4c2.4-7.6,1.8-15.8-1.8-23c4.2-2.4,8.1-5.5,11.5-9.1 C111.1,52.2,112.5,46.9,111.4,41.9z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    badge: 'Runtime Engine',
    status: 'Server Runtime',
    description: 'Event-driven server runtime, asynchronous I/O, NPM ecosystem, file systems & modular APIs.',
    cli: 'node server.js',
    iconColor: '#339933',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7.2v9.6L12 22l9-5.2V7.2L12 2zm0 2.3l6.9 4v7.9L12 20.2l-6.9-4V8.3L12 4.3z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    badge: 'NoSQL Database',
    status: 'Document Store',
    description: 'NoSQL document modeling, Mongoose schemas, CRUD operations, indexing & query aggregation.',
    cli: 'mongosh --eval',
    iconColor: '#47a248',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-.3 0-.5.2-.6.5C10.5 4.8 7 9.8 7 14c0 3.3 2.2 6 5 6s5-2.7 5-6c0-4.2-3.5-9.2-4.4-11.5-.1-.3-.3-.5-.6-.5z" />
      </svg>
    ),
  },
  {
    name: 'Firebase',
    badge: 'BaaS & Cloud',
    status: 'Realtime DB & Auth',
    description: 'Cloud Firestore, Realtime Database, Firebase Authentication, Cloud Storage & serverless functions.',
    cli: 'firebase deploy --only hosting',
    iconColor: '#ffca28',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.795 3.992l-2.19-13.68a.54.54 0 0 0-.918-.288L3.376 19.664l7.927 4.46a1.7 1.7 0 0 0 1.625 0l7.757-4.46zM13.3 7.227l-2.14-4.098a.54.54 0 0 0-.964.032L3.665 16.516z" />
      </svg>
    ),
  },
  {
    name: 'Render',
    badge: 'Cloud PaaS',
    status: 'Live Cloud Host',
    description: 'Automated full-stack cloud hosting for Node.js web services, background workers & auto-deploy git hooks.',
    cli: 'render deploy --auto',
    iconColor: '#46e3b7',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 3h7a5 5 0 0 1 5 5c0 2.22-1.44 4.1-3.46 4.75L19 21h-3.8l-3.9-7.5H9V21H6V3zm3 3v5h4a2 2 0 0 0 0-4H9z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    badge: 'CSS Framework',
    status: 'Utility Design',
    description: 'Utility-first styling, responsive design breakpoints, dark mode integration & custom design tokens.',
    cli: 'npx tailwindcss -w',
    iconColor: '#38bdf8',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    name: 'Express.js',
    badge: 'REST Engine',
    status: 'API Controller',
    description: 'Fast minimalist framework, REST API routing, middleware pipeline, validation & error handlers.',
    cli: 'app.listen(PORT)',
    iconColor: '#ffffff',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7h2v2.5z" />
      </svg>
    ),
  },
  {
    name: 'Postman & VS Code',
    badge: 'Dev Suite',
    status: 'Testing & IDE',
    description: 'API testing collections, environment mocking, debugging tools, extensions & productivity linters.',
    cli: 'code . && postman runner',
    iconColor: '#ff6c37',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 15l-4-4 1.4-1.4L11 14.2l6.6-6.6L19 9l-8 8z" />
      </svg>
    ),
  },
  {
    name: 'Bootstrap',
    badge: 'Responsive UI',
    status: 'Component Grid',
    description: '12-column grid systems, responsive containers, modal components, navbars & cross-browser styling.',
    cli: 'bootstrap.bundle.min',
    iconColor: '#7952b3',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 9.4c0-2.3-1.6-3.8-4.2-3.8H8v12.8h5.9c2.8 0 4.6-1.6 4.6-4.2 0-1.8-.9-3-2.4-3.6 1-0.5 1.5-1.7 1.5-1.2zm-6.6-1.5h2.8c1.3 0 2.2.7 2.2 1.8 0 1.2-.9 1.9-2.2 1.9H11V7.9zm3.3 8.3H11v-4.1h3.3c1.5 0 2.4.8 2.4 2.1 0 1.2-.9 2-2.4 2z" />
      </svg>
    ),
  },
];

// LINE 2 TOOLS: Moves towards the LEFT
const LINE_2_TOOLS = [
  {
    name: 'JavaScript (ES6+)',
    badge: 'Core Language',
    status: 'Engine & Logic',
    description: 'Modern ES6+ syntax, Async/Await, Promises, Closures, DOM manipulation & event-driven architecture.',
    cli: 'node index.js',
    iconColor: '#f7df1e',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm10.7 13.8c0 1.9 1.1 2.8 2.8 2.8 1.4 0 2.4-.7 2.9-1.5l-1.3-1c-.4.5-.9.8-1.5.8-.8 0-1.2-.4-1.2-1.2v-6.2h-1.7v6.3zm-6.2-1.3c.5.8 1.3 1.3 2.3 1.3 1.1 0 1.9-.6 1.9-1.5 0-1-.8-1.4-2.1-1.9-1.7-.6-2.9-1.4-2.9-2.9 0-1.6 1.3-2.8 3.1-2.8 1.4 0 2.4.5 3.1 1.6l-1.3 1.1c-.4-.7-.9-1-1.7-1-.7 0-1.3.4-1.3 1 0 .7.5 1.1 1.8 1.6 1.9.7 3.2 1.5 3.2 3.2 0 1.8-1.4 3-3.4 3-1.8 0-3-1-3.6-2.2l1.6-1.3z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    badge: 'PostgreSQL BaaS',
    status: 'Auth & Edge DB',
    description: 'Open-source BaaS, relational Postgres database, Row Level Security (RLS), Auth & instant APIs.',
    cli: 'npx supabase start',
    iconColor: '#3ecf8e',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.22 14.288a.792.792 0 0 0 .61 1.316h9.362v8.958a.396.396 0 0 0 .716.233l11.064-14.125a.792.792 0 0 0-.61-1.316z" />
      </svg>
    ),
  },
  {
    name: 'Railway',
    badge: 'Infrastructure',
    status: 'Container Engine',
    description: 'Cloud infrastructure platform for containerized deployments, server runtimes & instant PR previews.',
    cli: 'railway up --detach',
    iconColor: '#a855f7',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.8 2.4A2.4 2.4 0 0 0 2.4 4.8v14.4a2.4 2.4 0 0 0 2.4 2.4h14.4a2.4 2.4 0 0 0 2.4-2.4V4.8a2.4 2.4 0 0 0-2.4-2.4H4.8zm3.6 4.8h7.2c.66 0 1.2.54 1.2 1.2v7.2c0 .66-.54 1.2-1.2 1.2H8.4a1.2 1.2 0 0 1-1.2-1.2V8.4c0-.66.54-1.2 1.2-1.2z" />
      </svg>
    ),
  },
  {
    name: 'Vite',
    badge: 'Build Tool',
    status: 'Instant HMR',
    description: 'High-speed local development, hot module replacement (HMR), optimized bundling & asset pipelines.',
    cli: 'npx vite --host',
    iconColor: '#bd34fe',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.9 3.6L12.5 21.4c-.2.4-.8.4-1 0L2.1 3.6c-.3-.5.1-1.1.7-1l9 1.8 8.4-1.8c.6-.1 1 .5.7 1z" />
      </svg>
    ),
  },
  {
    name: 'REST APIs',
    badge: 'Data Protocols',
    status: 'HTTP Services',
    description: 'API design & integration, HTTP verbs (GET, POST, PUT, DELETE), JSON formatting & Postman testing.',
    cli: 'curl -X GET /api/v1',
    iconColor: '#06b6d4',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
      </svg>
    ),
  },
  {
    name: 'HTML5 & CSS3',
    badge: 'Semantic Web',
    status: 'Layout Mastery',
    description: 'Semantic markup, modern layout techniques (CSS Grid & Flexbox), accessibility & keyframe animations.',
    cli: 'viewport: mobile-first',
    iconColor: '#e34f26',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 5l1.6 14.2L12 22l7.4-2.8L21 5l-9-3zm0 2.2l6.8 2.3-1.3 11.5L12 19.8l-5.5-1.8L5.2 6.5 12 4.2z" />
      </svg>
    ),
  },
  {
    name: 'Git & GitHub',
    badge: 'Version Control',
    status: 'Repository Core',
    description: 'Branch management, pull requests, merge conflict resolution, commit hygiene & team collaboration.',
    cli: 'git push origin main',
    iconColor: '#f05032',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Vercel & Netlify',
    badge: 'Edge Hosting',
    status: 'Global CDN Deploy',
    description: 'Continuous deployment pipelines, custom domain routing, SSL certificates & serverless CDN hosting.',
    cli: 'vercel --prod',
    iconColor: '#38bdf8',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L1 21h22L12 2z" />
      </svg>
    ),
  },
  {
    name: 'Responsive Design',
    badge: 'Mobile-First',
    status: 'Adaptive Layout',
    description: 'Pixel-perfect mobile, tablet & widescreen optimization, touch UX and fluid layout typography.',
    cli: '@media (min-width: 768px)',
    iconColor: '#10b981',
    icon: (
      <svg className="tech-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 6h16v10H4V6zm14 12H6v1h12v-1zM2 4h20v14H2V4z" />
      </svg>
    ),
  },
];

// Single moving tool card component
function MovingToolCard({ tool, onClick }) {
  return (
    <div
      className="moving-tool-card glass-panel"
      onClick={() => onClick(tool.name)}
      style={{
        '--tool-color': tool.iconColor,
      }}
    >
      {/* Luminous Top Cyber Accent Line */}
      <div className="tool-card-glow-bar"></div>

      {/* Card Header: Glowing Icon & Live Status */}
      <div className="tool-card-top">
        <div className="tool-icon-dock" style={{ color: tool.iconColor }}>
          {tool.icon}
        </div>
        <div className="tool-status-pill font-mono">
          <span className="status-dot" style={{ backgroundColor: tool.iconColor }}></span>
          <span>{tool.status}</span>
        </div>
      </div>

      {/* Tool Meta */}
      <div className="tool-card-meta">
        <div className="tool-name-row">
          <h3 className="tool-title font-display">{tool.name}</h3>
          <span className="tool-badge-pill font-mono">{tool.badge}</span>
        </div>
        <p className="tool-desc-text">{tool.description}</p>
      </div>

      {/* Terminal CLI Command Footer */}
      <div className="tool-cli-footer font-mono">
        <span className="cli-prompt">❯</span>
        <span className="cli-cmd">{tool.cli}</span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const handleCardClick = () => {
    playUiClick(860, 'sine', 0.04);
  };

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        {/* Clean Header */}
        <div className="section-header text-center">
          <h2 className="section-title text-gradient">
            Tools That Power My <span className="text-gradient-emerald">Development</span>
          </h2>
        </div>
      </div>

      {/* 2-Line Continuous Moving Marquee Showcase */}
      <div className="tools-dual-marquee">
        {/* LINE 1: Moves to the RIGHT */}
        <div className="tools-marquee-row row-right" aria-label="Tools line 1 moving right">
          <div className="tools-marquee-track track-move-right">
            {/* Set A */}
            <div className="tools-marquee-group">
              {LINE_1_TOOLS.map((tool, idx) => (
                <MovingToolCard key={`l1-a-${idx}`} tool={tool} onClick={handleCardClick} />
              ))}
            </div>
            {/* Set B (Seamless loop clone) */}
            <div className="tools-marquee-group" aria-hidden="true">
              {LINE_1_TOOLS.map((tool, idx) => (
                <MovingToolCard key={`l1-b-${idx}`} tool={tool} onClick={handleCardClick} />
              ))}
            </div>
          </div>
        </div>

        {/* LINE 2: Moves to the LEFT */}
        <div className="tools-marquee-row row-left" aria-label="Tools line 2 moving left">
          <div className="tools-marquee-track track-move-left">
            {/* Set A */}
            <div className="tools-marquee-group">
              {LINE_2_TOOLS.map((tool, idx) => (
                <MovingToolCard key={`l2-a-${idx}`} tool={tool} onClick={handleCardClick} />
              ))}
            </div>
            {/* Set B (Seamless loop clone) */}
            <div className="tools-marquee-group" aria-hidden="true">
              {LINE_2_TOOLS.map((tool, idx) => (
                <MovingToolCard key={`l2-b-${idx}`} tool={tool} onClick={handleCardClick} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skills-section {
          position: relative;
          padding: 30px 0 35px;
          overflow: hidden;
        }

        .section-header {
          margin-bottom: 24px;
        }

        /* Dual Marquee Container */
        .tools-dual-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 10px 0 20px;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
        }

        .tools-marquee-row {
          display: flex;
          overflow: hidden;
          user-select: none;
          width: 100%;
        }

        .tools-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }

        /* Hover pauses the row smoothly so user can inspect any card */
        .tools-marquee-row:hover .tools-marquee-track {
          animation-play-state: paused;
        }

        .tools-marquee-group {
          display: flex;
          align-items: stretch;
          gap: 22px;
          padding-right: 22px;
          flex-shrink: 0;
        }

        /* LINE 1: Continuous smooth translation to the RIGHT */
        .track-move-right {
          animation: marqueeScrollRight 40s linear infinite;
        }

        @keyframes marqueeScrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        /* LINE 2: Continuous smooth translation to the LEFT */
        .track-move-left {
          animation: marqueeScrollLeft 40s linear infinite;
        }

        @keyframes marqueeScrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Moving Tool Card */
        .moving-tool-card {
          position: relative;
          width: 320px;
          min-width: 320px;
          flex-shrink: 0;
          padding: 24px 22px 20px;
          border-radius: 20px;
          background: rgba(10, 16, 28, 0.85);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 12px 35px -10px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 15px;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Top Luminous Brand Neon Line */
        .tool-card-glow-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, transparent 0%, var(--tool-color, #10b981) 50%, transparent 100%);
          opacity: 0.6;
          transition: opacity 0.3s ease, height 0.3s ease, box-shadow 0.3s ease;
        }

        .moving-tool-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: var(--tool-color);
          box-shadow: 
            0 18px 45px -8px rgba(0, 0, 0, 0.85),
            0 0 25px rgba(16, 185, 129, 0.15);
        }

        .moving-tool-card:hover .tool-card-glow-bar {
          opacity: 1;
          height: 3.5px;
          box-shadow: 0 0 15px var(--tool-color);
        }

        /* Top Row */
        .tool-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tool-icon-dock {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .moving-tool-card:hover .tool-icon-dock {
          transform: scale(1.1) rotate(2deg);
          border-color: var(--tool-color);
        }

        .tech-svg {
          width: 24px;
          height: 24px;
        }

        .tool-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          letter-spacing: 0.03em;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          box-shadow: 0 0 6px currentColor;
          display: inline-block;
        }

        /* Meta block */
        .tool-card-meta {
          flex: 1;
        }

        .tool-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 7px;
        }

        .tool-title {
          font-size: 1.18rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .tool-badge-pill {
          font-size: 0.68rem;
          color: var(--emerald-light);
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 2px 7px;
          border-radius: 6px;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }

        .tool-desc-text {
          font-size: 0.83rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Bottom CLI Box */
        .tool-cli-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 6px 11px;
          font-size: 0.72rem;
          color: var(--text-dim);
          margin-top: auto;
          transition: all 0.25s ease;
        }

        .cli-prompt {
          color: var(--emerald-light);
          font-weight: 700;
        }

        .cli-cmd {
          color: #94a3b8;
          transition: color 0.25s ease;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .moving-tool-card:hover .tool-cli-footer {
          border-color: rgba(16, 185, 129, 0.25);
          background: rgba(0, 0, 0, 0.55);
        }

        .moving-tool-card:hover .cli-cmd {
          color: #e2e8f0;
        }

        @media (max-width: 640px) {
          .moving-tool-card {
            width: 205px;
            min-width: 205px;
            padding: 12px 13px;
            border-radius: 14px;
            gap: 8px;
          }
          .tool-icon-dock {
            width: 32px;
            height: 32px;
            border-radius: 9px;
          }
          .tech-svg {
            width: 17px;
            height: 17px;
          }
          .tool-role-tag {
            font-size: 0.62rem;
            padding: 2px 6px;
          }
          .tool-card-body {
            gap: 4px;
          }
          .tool-name {
            font-size: 0.92rem;
          }
          .tool-desc {
            font-size: 0.72rem;
            line-height: 1.32;
            max-height: 2.7em;
            -webkit-line-clamp: 2;
          }
          .tool-cli-footer {
            padding: 4px 8px;
            font-size: 0.64rem;
            border-radius: 6px;
            margin-top: 4px;
          }
          .tools-dual-marquee {
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
