import React, { useState, useEffect } from 'react';
import { playUiClick, toggleSound } from '../utils/audio';
import { FileDown, Volume2, VolumeX } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBrandClick = (e) => {
    e.preventDefault();
    playUiClick(750, 'sine', 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playUiClick(880, 'triangle', 0.08);
    }
  };

  const handleResumeDownload = () => {
    playUiClick(900, 'sine', 0.1);
    const link = document.createElement('a');
    link.href = '/Shivani_Gampa_Resume.pdf';
    link.download = 'Shivani_Gampa_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="navbar-fixed-container">
      <nav className={`navbar-pill ${scrolled ? 'scrolled' : ''}`}>
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          className="nav-brand"
          onClick={handleBrandClick}
          title="Scroll to top"
        >
          <div className="brand-avatar-mini">
            <span className="brand-text">SG</span>
            <span className="brand-dot"></span>
          </div>
          <span className="brand-fullname">Shivani</span>
        </a>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Sound Toggle */}
          <button 
            className="icon-btn" 
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            aria-label="Toggle Sound"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Resume Download CTA */}
          <button 
            className="btn-resume" 
            onClick={handleResumeDownload}
            title="Download Shivani Gampa Resume PDF"
          >
            <FileDown size={15} />
            <span>Resume</span>
          </button>
        </div>
      </nav>

      <style>{`
        .navbar-fixed-container {
          position: fixed;
          top: 16px;
          left: 0;
          right: 0;
          z-index: 999;
          display: flex;
          justify-content: center;
          padding: 0 16px;
          pointer-events: none;
        }

        .navbar-pill {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: rgba(10, 15, 24, 0.78);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: var(--radius-full);
          padding: 8px 18px;
          max-width: 760px;
          width: 100%;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(16, 185, 129, 0.08);
          transition: all 0.3s ease;
        }

        .navbar-pill.scrolled {
          background: rgba(8, 12, 20, 0.92);
          border-color: rgba(16, 185, 129, 0.25);
          box-shadow: 0 12px 35px -5px rgba(0, 0, 0, 0.8), 0 0 20px rgba(16, 185, 129, 0.15);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #ffffff;
          transition: opacity 0.2s ease;
        }
        .nav-brand:hover {
          opacity: 0.9;
        }

        .brand-avatar-mini {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border: 1.5px solid var(--emerald-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
        }

        .brand-text {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.82rem;
          color: #ffffff;
          letter-spacing: -0.05em;
        }

        .brand-dot {
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--emerald-primary);
          border: 1.5px solid #05070a;
        }

        .brand-fullname {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: -0.02em;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .icon-btn:hover {
          color: var(--emerald-light);
          background: rgba(16, 185, 129, 0.12);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .btn-resume {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #ffffff;
          padding: 7px 15px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);
        }
        .btn-resume:hover {
          background: var(--emerald-primary);
          color: #05070a;
          transform: translateY(-1px);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }

        @media (max-width: 480px) {
          .navbar-pill {
            padding: 6px 14px;
          }
          .brand-fullname {
            font-size: 0.88rem;
          }
          .btn-resume {
            padding: 6px 12px;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </header>
  );
}
