import React, { useState, useRef } from 'react';
import { playUiClick } from '../utils/audio';
import { 
  ExternalLink, 
  Sparkles, 
  X, 
  CheckCircle, 
  ArrowUpRight, 
  Building2, 
  Globe
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

// The 4 Real Commercial Production Projects
const PROJECTS = [
  // 1. Devshe (devshe.in) - FLAGSHIP FEATURE
  {
    id: 'connectia-devshe',
    title: 'Devshe (devshe.in)',
    tagline: 'Media, Content, Shopping & Digital Platform',
    category: 'commercial',
    categoryLabel: 'Digital Media & Commerce',
    clientContext: 'Client Web Platform • Connectia Solution Pvt. Ltd.',
    domainDisplay: 'devshe.in',
    statusText: 'Live in Production',
    liveUrl: 'https://devshe.in/',
    githubUrl: 'https://github.com/shivanigampa09',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['React.js', 'Vite', 'Tailwind CSS', 'REST APIs', 'Cloud Deploy'],
    accentColor: '#10b981',
    isHero: true,
    icon: <Globe size={20} className="text-emerald-400" />,
    summary: 'Engineered as part of web development work at Connectia Solution Pvt. Ltd. A modern, dynamic digital web platform for Devshe Media featuring rich multimedia content, category filtering, interactive shopping & advertising feeds, built with React.js, Vite, and responsive mobile architecture.',
    bullets: [
      'Developed responsive frontend modules and content showcase sections for Devshe (devshe.in) during tenure at Connectia Solution.',
      'Built with React.js and Vite, implementing dynamic categorization, responsive media feeds, and digital advertisement placement workflows.',
      'Engineered reusable UI components and optimized mobile-first layout responsiveness across devices.',
      'Integrated RESTful API endpoints for real-time content synchronization and low-latency rendering.',
      'Deployed with production CI/CD workflows and optimized SEO discoverability.',
    ],
    metrics: [
      { label: 'Live Domain', val: 'devshe.in' },
      { label: 'Client Partner', val: 'Connectia Solution' },
      { label: 'Status', val: 'Live Production' },
    ]
  },

  // 2. Hotel Ananda Inn (anandainn.com)
  {
    id: 'anandainn',
    title: 'Hotel Ananda Inn',
    tagline: 'Luxury Hotel, Suites & 5-Star Convention Centre',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Suites',
    clientContext: 'Commercial Client • Bhimavaram, AP',
    domainDisplay: 'anandainn.com',
    statusText: 'Live in Production',
    liveUrl: 'https://www.anandainn.com/',
    githubUrl: 'https://github.com/shivanigampa09',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    tags: ['HTML5/CSS3', 'Modern JS', 'Tailwind CSS', 'Swiper.js', 'PHP'],
    accentColor: '#f59e0b',
    isHero: false,
    icon: <Building2 size={20} className="text-amber-400" />,
    summary: 'A premier hospitality and convention web experience engineered for Hotel Ananda Inn (Bhimavaram, AP). Features responsive room showcases for King Suites and Executive Rooms, banquet facilities, Swiper.js touch sliders, and online reservation inquiry workflows.',
    bullets: [
      'Developed a responsive multi-page luxury hotel website with modern typography, smooth hero sliders, and rich visual presentation.',
      'Engineered interactive room showcases for King Suites, Business Rooms, and Classic Rooms with detailed amenity specifications.',
      'Created dedicated showcase sections for the Convention Centre, Auditorium Stage, and 5-Star Banquet Hall for weddings and corporate gatherings.',
      'Integrated interactive Swiper sliders, AOS scroll animations, Google Maps location embed, and reservation inquiry forms.',
      'Optimized mobile performance, cross-browser rendering, and asset loading across all smartphone, tablet, and desktop viewports.',
    ],
    metrics: [
      { label: 'Live Site', val: 'anandainn.com' },
      { label: 'Interactive UI', val: 'Swiper.js & AOS' },
      { label: 'Status', val: 'Live Production' },
    ]
  },

  // 3. Mihika Ayra (mihikaayra.netlify.app)
  {
    id: 'mihika-ayra',
    title: 'Mihika Ayra',
    tagline: 'Global Imports, Exports & Commercial Platform',
    category: 'commercial',
    categoryLabel: 'Global Trade & Export',
    clientContext: 'Commercial Client • Global Imports & Exports',
    domainDisplay: 'mihikaayra.netlify.app',
    statusText: 'Live in Production',
    liveUrl: 'https://mihikaayra.netlify.app/',
    githubUrl: 'https://github.com/shivanigampa09',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    tags: ['React.js', 'Vite', 'Tailwind CSS', 'Git/GitHub', 'Netlify'],
    accentColor: '#06b6d4',
    isHero: false,
    icon: <Globe size={20} className="text-cyan-400" />,
    summary: 'A fast, high-converting commercial web platform engineered for Mihika Ayra global imports and exports. Features dynamic international trade catalogs, product categories, responsive mobile architecture, and seamless cloud deployment on Netlify.',
    bullets: [
      'Developed a modern, responsive business web platform for global imports and exports using React.js, Vite, and Tailwind CSS.',
      'Architected structured product categories, global trade service showcases, and intuitive inquiry workflows.',
      'Built modular, reusable React components and flexible responsive layouts for a smooth experience across devices.',
      'Employed Git & GitHub for structured version control and iterative project management.',
      'Deployed the website to Netlify with automated CI/CD production pipelines.',
    ],
    metrics: [
      { label: 'Domain', val: 'Global Imports & Exports' },
      { label: 'Deployment', val: 'Netlify Cloud' },
      { label: 'Status', val: 'Live Production' },
    ]
  },

  // 4. Aishwarya Convention (aishwaryaconvention.com)
  {
    id: 'aishwarya-convention',
    title: 'Aishwarya Convention',
    tagline: 'Convention Hall & Luxury Event Venue Portal',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Venues',
    clientContext: 'Client Portal • Convention Centre',
    domainDisplay: 'aishwaryaconvention.com',
    statusText: 'Live in Production',
    liveUrl: 'https://aishwaryaconvention.com',
    githubUrl: 'https://github.com/shivanigampa09',
    image: '/assets/aishwarya-convention.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Google Maps API'],
    accentColor: '#38bdf8',
    isHero: false,
    icon: <Building2 size={20} className="text-sky-400" />,
    summary: 'A luxury convention hall website featuring interactive photo sliders, gallery view, Google Maps integration, and PHP-powered booking enquiry workflows.',
    bullets: [
      'Developed a professional, responsive convention hall website using HTML5, CSS3, modern JavaScript, and PHP.',
      'Created interactive image sliders, event photo gallery, client testimonials, contact form, and Google Maps embed.',
      'Implemented robust PHP-based email functionality for instant contact-form enquiries and reservations.',
      'Carefully optimized load performance, responsive layouts, and cross-browser rendering for mobile, tablet, and desktop.',
    ],
    metrics: [
      { label: 'Platform', val: 'PHP / JS / CSS3' },
      { label: 'Features', val: 'Gallery & Sliders' },
      { label: 'Status', val: 'Live Production' },
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects (4)' },
  { id: 'commercial', label: 'Commercial & E-Commerce' },
  { id: 'hospitality', label: 'Hospitality & Luxury Venues' },
];

// Interactive 3D Bento Card Component
function BentoProjectCard({ project, isHero = false, onOpenModal }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`bento-project-card glass-panel ${isHero ? 'hero-bento' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -5 : 0}px)`,
        transition: isHovered 
          ? 'transform 0.12s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onClick={() => onOpenModal(project)}
    >
      {/* Top Luminous Neon Line */}
      <div 
        className="bento-neon-line"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
      ></div>

      {/* Internal Cursor Radial Spotlight Glow */}
      <div className="bento-ambient-spotlight"></div>

      {isHero ? (
        /* HERO PANORAMIC CARD (Devshe devshe.in) */
        <div className="hero-bento-layout">
          {/* Visual Showcase Side */}
          <div className="hero-visual-side">
            <img 
              src={project.image} 
              alt={project.title} 
              className="bento-img" 
              loading="lazy"
            />
            <div className="bento-img-gradient"></div>

            <div className="bento-badge-dock font-mono">
              <span className="live-pulse-dot"></span>
              <span>{project.statusText}</span>
            </div>

            <div className="hero-domain-pill font-mono">
              <Globe size={13} className="text-emerald-400" />
              <span>{project.domainDisplay}</span>
            </div>
          </div>

          {/* Content Narrative Side */}
          <div className="hero-content-side">
            <div className="bento-header-row">
              <div className="bento-cat-tag font-mono">
                {project.categoryLabel}
              </div>
              <span className="client-badge font-mono">{project.clientContext}</span>
            </div>

            <h3 className="bento-title font-display text-gradient">
              {project.title}
            </h3>

            <p className="bento-tagline font-mono">{project.tagline}</p>
            <p className="bento-summary">{project.summary}</p>

            <div className="bento-tech-chips">
              {project.tags.map((t) => (
                <span key={t} className="bento-chip font-mono">
                  {t}
                </span>
              ))}
            </div>

            <div className="bento-action-row">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bento-btn-primary font-mono"
                  onClick={(e) => {
                    e.stopPropagation();
                    playUiClick(860, 'sine', 0.04);
                  }}
                >
                  <span>Launch Live Site</span>
                  <ArrowUpRight size={15} />
                </a>
              )}

              <button 
                className="bento-btn-secondary font-mono"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(project);
                }}
              >
                <span>Architecture</span>
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bento-btn-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  playUiClick(720, 'sine', 0.04);
                }}
                title="View Codebase on GitHub"
                aria-label="GitHub Repository"
              >
                <GithubIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD BENTO CARDS */
        <div className="standard-bento-layout">
          {/* Image Banner */}
          <div className="standard-visual-box">
            <img 
              src={project.image} 
              alt={project.title} 
              className="bento-img" 
              loading="lazy"
            />
            <div className="bento-img-gradient"></div>

            <div className="standard-top-bar">
              <div className="bento-badge-dock font-mono">
                <span className="live-pulse-dot"></span>
                <span>{project.statusText}</span>
              </div>
              <div className="bento-cat-tag font-mono">
                {project.categoryLabel}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="standard-content-box">
            <div className="standard-header-row">
              <div className="standard-icon-dock" style={{ borderColor: `${project.accentColor}35` }}>
                {project.icon}
              </div>
              <div>
                <h3 className="bento-title font-display">{project.title}</h3>
                <span className="client-badge font-mono">{project.clientContext}</span>
              </div>
            </div>

            <p className="bento-summary clamp-3">{project.summary}</p>

            <div className="bento-tech-chips">
              {project.tags.map((t) => (
                <span key={t} className="bento-chip font-mono">
                  {t}
                </span>
              ))}
            </div>

            <div className="bento-action-row">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bento-btn-primary font-mono"
                  onClick={(e) => {
                    e.stopPropagation();
                    playUiClick(860, 'sine', 0.04);
                  }}
                >
                  <span>Live Site</span>
                  <ArrowUpRight size={14} />
                </a>
              )}

              <button 
                className="bento-btn-secondary font-mono"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(project);
                }}
              >
                <span>Architecture</span>
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bento-btn-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  playUiClick(720, 'sine', 0.04);
                }}
                title="View Codebase on GitHub"
                aria-label="GitHub Repository"
              >
                <GithubIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  const openModal = (proj) => {
    playUiClick(880, 'sine', 0.05);
    setSelectedProject(proj);
  };

  const closeModal = () => {
    playUiClick(700, 'sine', 0.04);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <h2 className="section-title text-gradient">
            My <span className="text-gradient-emerald">Projects</span>
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="bento-filter-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`bento-filter-btn font-mono ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => {
                playUiClick(820, 'sine', 0.04);
                setActiveFilter(cat.id);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Bento Showcase Matrix */}
        <div className="bento-showcase-matrix">
          {/* Flagship Hero Card if all or commercial is selected */}
          {filteredProjects.find(p => p.id === 'connectia-devshe') && (
            <BentoProjectCard 
              project={PROJECTS[0]} 
              isHero={true} 
              onOpenModal={openModal} 
            />
          )}

          {/* Remaining Projects in 2-Column Responsive Grid */}
          <div className="bento-subgrid">
            {filteredProjects
              .filter(p => p.id !== 'connectia-devshe')
              .map((project) => (
                <BentoProjectCard 
                  key={project.id} 
                  project={project} 
                  isHero={false} 
                  onOpenModal={openModal} 
                />
              ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="modal-image-wrap">
              <img src={selectedProject.image} alt={selectedProject.title} className="modal-img" />
              <div className="modal-image-gradient"></div>
              <div className="modal-badge-overlay">
                <div className="glow-pill font-mono">
                  <Sparkles size={14} className="text-emerald-400" />
                  <span>{selectedProject.tagline}</span>
                </div>
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-title-row">
                <div>
                  <h3 className="modal-title font-display text-gradient">
                    {selectedProject.title}
                  </h3>
                  <p className="modal-subtitle font-mono">{selectedProject.tagline}</p>
                </div>
                {selectedProject.liveUrl && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-primary"
                    onClick={() => playUiClick()}
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              <div className="modal-metrics-bar">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="metric-box">
                    <span className="metric-label font-mono">{m.label}</span>
                    <span className="metric-val">{m.val}</span>
                  </div>
                ))}
              </div>

              <div className="modal-section-block">
                <h4 className="modal-section-heading">Key Implementation Highlights</h4>
                <ul className="modal-bullets-list">
                  {selectedProject.bullets.map((b, idx) => (
                    <li key={idx} className="modal-bullet-item">
                      <CheckCircle size={17} className="text-emerald-400 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-section-block">
                <h4 className="modal-section-heading">Technologies Used</h4>
                <div className="project-tech-tags">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="tech-badge large font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-footer-strip">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  onClick={() => playUiClick()}
                >
                  <GithubIcon size={16} />
                  <span>View GitHub / Codebase</span>
                </a>
                <button className="btn-outline font-mono" onClick={closeModal}>
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .projects-section {
          position: relative;
          padding: 30px 0 35px;
        }

        /* Filter Row */
        .bento-filter-row {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .bento-filter-btn {
          background: rgba(13, 19, 29, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          padding: 7px 18px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .bento-filter-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .bento-filter-btn.active {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
          border: 1px solid rgba(16, 185, 129, 0.45);
          color: var(--emerald-light);
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.15);
        }

        /* Bento Showcase Matrix */
        .bento-showcase-matrix {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .bento-subgrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Bento Card Common */
        .bento-project-card {
          position: relative;
          border-radius: 22px;
          background: rgba(10, 16, 28, 0.85);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 16px 45px -10px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          cursor: pointer;
        }

        .bento-neon-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2.5px;
          opacity: 0.5;
          z-index: 3;
          transition: opacity 0.3s ease, height 0.3s ease;
        }

        .bento-project-card:hover .bento-neon-line {
          opacity: 1;
          height: 3.5px;
        }

        .bento-ambient-spotlight {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            350px circle at var(--mouse-x, -999px) var(--mouse-y, -999px),
            rgba(16, 185, 129, 0.12),
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        .bento-project-card:hover {
          border-color: rgba(16, 185, 129, 0.4);
          box-shadow: 
            0 24px 60px -12px rgba(0, 0, 0, 0.85),
            0 0 35px rgba(16, 185, 129, 0.14);
        }

        /* HERO BENTO LAYOUT (Devshe devshe.in) */
        .hero-bento-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          min-height: 380px;
          position: relative;
          z-index: 2;
        }

        .hero-visual-side {
          position: relative;
          min-height: 380px;
          overflow: hidden;
          background: #020408;
        }

        .bento-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bento-project-card:hover .bento-img {
          transform: scale(1.05);
        }

        .bento-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.25) 0%,
            transparent 40%,
            rgba(10, 16, 28, 0.95) 100%
          );
        }

        .bento-badge-dock {
          position: absolute;
          top: 16px;
          left: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(7, 11, 20, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: var(--emerald-light);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        .hero-domain-pill {
          position: absolute;
          bottom: 18px;
          left: 18px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(10, 16, 28, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          font-weight: 600;
        }

        .live-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .hero-content-side {
          padding: 32px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }

        .bento-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .bento-cat-tag {
          font-size: 0.7rem;
          color: var(--emerald-light);
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          letter-spacing: 0.04em;
        }

        .standard-top-bar {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          z-index: 2;
        }

        .standard-top-bar .bento-badge-dock {
          position: static;
          padding: 4px 10px;
          font-size: 0.68rem;
          white-space: nowrap;
        }

        .standard-top-bar .bento-cat-tag {
          position: static;
          background: rgba(10, 16, 28, 0.85);
          backdrop-filter: blur(10px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 4px 10px;
          font-size: 0.68rem;
          white-space: nowrap;
        }

        .client-badge {
          font-size: 0.72rem;
          color: var(--text-dim);
          letter-spacing: 0.03em;
        }

        .bento-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .bento-tagline {
          font-size: 0.8rem;
          color: var(--text-dim);
          margin: 0;
        }

        .bento-summary {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        .bento-summary.clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bento-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .bento-chip {
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .bento-action-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 6px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .bento-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 182, 212, 0.22) 100%);
          border: 1px solid rgba(16, 185, 129, 0.45);
          color: #ffffff;
          padding: 7px 15px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .bento-btn-primary:hover {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(6, 182, 212, 0.35) 100%);
          border-color: rgba(16, 185, 129, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
        }

        .bento-btn-secondary {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .bento-btn-secondary:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.22);
        }

        .bento-btn-icon {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          transition: all 0.25s ease;
        }

        .bento-btn-icon:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          transform: scale(1.08);
        }

        /* STANDARD BENTO LAYOUT */
        .standard-bento-layout {
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          z-index: 2;
        }

        .standard-visual-box {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #020408;
        }

        .standard-content-box {
          padding: 22px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 12px;
        }

        .standard-header-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .standard-icon-dock {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5, 7, 10, 0.88);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }

        .modal-dialog {
          position: relative;
          width: 100%;
          max-width: 780px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 24px;
          background: rgba(11, 16, 26, 0.95);
          border: 1px solid rgba(16, 185, 129, 0.3);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(239, 68, 68, 0.8);
          border-color: #ef4444;
          transform: scale(1.08);
        }

        .modal-image-wrap {
          position: relative;
          height: 260px;
          overflow: hidden;
        }

        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-image-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(11, 16, 26, 0.95) 100%);
        }

        .modal-badge-overlay {
          position: absolute;
          bottom: 20px;
          left: 28px;
        }

        .glow-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: var(--emerald-light);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
        }

        .modal-content {
          padding: 24px 32px 32px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .modal-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
        }

        .modal-title {
          font-size: 1.85rem;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .modal-subtitle {
          font-size: 0.85rem;
          color: var(--emerald-light);
          margin: 0;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
          color: #05070a;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35);
          transition: all 0.25s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
        }

        .modal-metrics-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 14px;
        }

        .metric-box {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-label {
          font-size: 0.72rem;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .metric-val {
          font-size: 0.92rem;
          font-weight: 600;
          color: #ffffff;
        }

        .modal-section-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .modal-section-heading {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .modal-bullets-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .modal-footer-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 12px;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 9px 18px;
          border-radius: var(--radius-full);
          font-size: 0.84rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .btn-outline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--text-muted);
          padding: 9px 18px;
          border-radius: var(--radius-full);
          font-size: 0.84rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-outline:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        @media (max-width: 992px) {
          .hero-bento-layout {
            grid-template-columns: 1fr;
          }
          .hero-visual-side {
            min-height: 240px;
          }
          .bento-subgrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .bento-showcase-matrix {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .bento-subgrid {
            display: contents;
          }

          .hero-bento-layout {
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .hero-visual-side {
            position: relative;
            min-height: 115px;
            height: 115px;
          }

          .hero-content-side {
            padding: 12px 10px 14px;
            display: flex;
            flex-direction: column;
            gap: 7px;
            flex: 1;
          }

          .standard-visual-box {
            height: 115px;
          }

          .standard-content-box {
            padding: 11px 9px 13px;
            gap: 6px;
          }

          .standard-header-row {
            gap: 7px;
            align-items: flex-start;
          }

          .standard-header-row > div:last-child {
            flex: 1;
            min-width: 0;
          }

          .bento-title {
            font-size: 0.84rem;
            line-height: 1.22;
            font-weight: 700;
            word-break: break-word;
            overflow-wrap: break-word;
          }

          .bento-summary {
            font-size: 0.72rem;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .bento-tagline {
            display: none;
          }

          .client-badge {
            font-size: 0.62rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }

          .bento-tech-chips {
            gap: 4px;
          }

          .bento-chip {
            font-size: 0.6rem;
            padding: 2px 6px;
          }

          .bento-action-row {
            margin-top: auto;
            gap: 6px;
            padding-top: 6px;
          }

          .bento-btn-primary {
            padding: 5px 8px;
            font-size: 0.7rem;
            gap: 4px;
          }

          .bento-btn-secondary {
            display: none;
          }

          .bento-btn-icon {
            width: 28px;
            height: 28px;
          }

          .standard-icon-dock {
            width: 24px;
            height: 24px;
            border-radius: 7px;
            margin-top: 1px;
            flex-shrink: 0;
          }

          .standard-icon-dock svg {
            width: 13px;
            height: 13px;
          }

          .standard-top-bar {
            top: 7px;
            left: 7px;
            right: 7px;
            gap: 4px;
          }

          .standard-top-bar .bento-badge-dock,
          .standard-top-bar .bento-cat-tag {
            font-size: 0.58rem;
            padding: 2px 6px;
          }

          .hero-domain-pill {
            bottom: 7px;
            left: 7px;
            font-size: 0.62rem;
            padding: 2px 7px;
          }

          .bento-badge-dock {
            top: 7px;
            left: 7px;
            font-size: 0.58rem;
            padding: 2px 6px;
          }

          .modal-content {
            padding: 20px 16px;
          }

          .modal-metrics-bar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
