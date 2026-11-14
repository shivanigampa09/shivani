import React, { useState, useRef } from 'react';
import { playUiClick } from '../utils/audio';
import { QrCode, Sparkles, RefreshCw } from 'lucide-react';

export default function InteractiveLanyard() {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -16;
    const rotY = ((x - centerX) / centerX) * 16;

    setRotate({ x: rotX, y: rotY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const handleFlip = () => {
    playUiClick(950, 'sine', 0.08);
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="lanyard-container">
      {/* Top Lanyard Strap and Clasp */}
      <div className="lanyard-strap-assembly">
        <div className="lanyard-ribbon">
          <span className="ribbon-text">SHIVANI GAMPA • MERN STACK • 2026</span>
        </div>
        <div className="lanyard-clip">
          <div className="clip-loop"></div>
          <div className="clip-metal"></div>
          <div className="badge-hole"></div>
        </div>
      </div>

      {/* 3D Perspective Card Wrapper */}
      <div
        className="lanyard-3d-wrap"
        style={{ perspective: '1100px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          className={`lanyard-card ${isFlipped ? 'flipped' : ''}`}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y + (isFlipped ? 180 : 0)}deg)`,
          }}
        >
          {/* Card Front */}
          <div className="card-face card-front">
            {/* Holographic light sheen reflection */}
            <div
              className="card-glare"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(52, 211, 153, 0.2) 30%, transparent 60%)`,
                opacity: glare.opacity,
              }}
            />

            {/* Photo Avatar */}
            <div className="card-photo-wrapper">
              <div className="photo-ring">
                <img
                  src="/assets/shivani-avatar.jpg"
                  alt="Shivani Gampa - Web Developer"
                  className="card-photo"
                />
              </div>
            </div>

            {/* Details */}
            <div className="card-details">
              <h3 className="card-name">SHIVANI GAMPA</h3>
              <p className="card-role">WEB DEVELOPER • MERN STACK</p>

              {/* Skills Tags */}
              <div className="card-tags">
                <span className="card-tag">React.js</span>
                <span className="card-tag">Node.js</span>
                <span className="card-tag">MongoDB</span>
                <span className="card-tag">Tailwind</span>
              </div>
            </div>

            {/* Card Footer Barcode & Flip Hint */}
            <div className="card-bottom">
              <div className="barcode-simulation">
                <div className="bar b1"></div>
                <div className="bar b2"></div>
                <div className="bar b3"></div>
                <div className="bar b1"></div>
                <div className="bar b4"></div>
                <div className="bar b2"></div>
                <div className="bar b3"></div>
                <div className="bar b1"></div>
                <div className="bar b4"></div>
                <div className="bar b2"></div>
                <div className="bar b1"></div>
                <div className="bar b3"></div>
              </div>
              <button
                className="flip-btn"
                onClick={handleFlip}
                title="Click to flip badge"
                aria-label="Flip Badge"
              >
                <RefreshCw size={13} /> Flip
              </button>
            </div>
          </div>

          {/* Card Back */}
          <div className="card-face card-back">
            <div className="card-header-bar">
              <div className="dev-tag">
                <Sparkles size={14} className="icon-pulse" />
                <span>EXPERIENCE</span>
              </div>
              <button className="flip-btn-small" onClick={handleFlip}>
                <RefreshCw size={12} /> Front
              </button>
            </div>

            <div className="card-back-body">
              <div className="back-info-group">
                <div className="back-label">CURRENT STATUS</div>
                <div className="back-val-title">AtFingerTip Pvt. Ltd.</div>
                <div className="back-val-sub">Web Developer • Visakhapatnam</div>
              </div>

              <div className="back-info-group">
                <div className="back-label">PREVIOUS INTERNSHIP</div>
                <div className="back-val-title">Connectia Solution Pvt. Ltd.</div>
                <div className="back-val-sub">Web Developer Intern • Mangalore</div>
              </div>

              <div className="back-info-group">
                <div className="back-label">CORE FOCUS</div>
                <div className="back-val-title">Responsive Web Apps & MERN Stack</div>
                <div className="back-val-sub">Clean Architecture • Scalable UI</div>
              </div>
            </div>

            <div className="card-back-footer">
              <QrCode size={36} className="qr-icon" />
              <div className="qr-text">
                <div>github.com/shivanigampa09</div>
                <div>SECURE PROFILE</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lanyard-hint">
        <Sparkles size={13} className="text-emerald-400" />
        <span>Hover to tilt • Click <b>Flip</b> for credentials</span>
      </div>

      <style>{`
        .lanyard-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          user-select: none;
        }

        .lanyard-strap-assembly {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 20;
          margin-bottom: -10px;
        }

        .lanyard-ribbon {
          width: 32px;
          height: 65px;
          background: linear-gradient(180deg, #090e17 0%, #10b981 50%, #064e3b 100%);
          border: 1px solid rgba(16, 185, 129, 0.4);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          position: relative;
        }

        .ribbon-text {
          writing-mode: vertical-rl;
          font-family: var(--font-mono);
          font-size: 8px;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .lanyard-clip {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .clip-loop {
          width: 22px;
          height: 8px;
          background: #475569;
          border-radius: 3px;
        }

        .clip-metal {
          width: 14px;
          height: 18px;
          background: linear-gradient(135deg, #cbd5e1 0%, #64748b 50%, #334155 100%);
          border-radius: 2px;
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 5px rgba(0, 0, 0, 0.6);
        }

        .badge-hole {
          width: 18px;
          height: 5px;
          background: #05070a;
          border-radius: 4px;
          border: 1.5px solid #64748b;
          margin-top: 2px;
        }

        .lanyard-3d-wrap {
          width: 320px;
          height: 480px;
          cursor: grab;
          position: relative;
          z-index: 10;
        }

        .lanyard-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 22px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(145deg, rgba(17, 24, 39, 0.92) 0%, rgba(10, 15, 26, 0.96) 100%);
          border: 1px solid rgba(16, 185, 129, 0.3);
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(16, 185, 129, 0.15);
          overflow: hidden;
        }

        .card-front {
          transform: rotateY(0deg);
        }

        .card-back {
          transform: rotateY(180deg);
          border-color: rgba(6, 182, 212, 0.35);
        }

        .card-glare {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: overlay;
          transition: opacity 0.25s ease;
          border-radius: 22px;
          z-index: 25;
        }

        .card-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 12px;
          position: relative;
          z-index: 2;
        }

        .dev-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--emerald-light);
          letter-spacing: 0.08em;
        }

        .status-live-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-text {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--emerald-light);
          font-weight: 600;
        }

        .card-photo-wrapper {
          display: flex;
          justify-content: center;
          position: relative;
          margin: 12px 0;
          z-index: 2;
        }

        .photo-ring {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, rgba(255, 255, 255, 0.1) 100%);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.25);
        }

        .card-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center center;
          background-color: #0f172a;
          display: block;
        }

        .verified-badge {
          position: absolute;
          bottom: 2px;
          right: 90px;
          background: #10b981;
          color: #05070a;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #0b0f17;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .card-details {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .card-name {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.02em;
          margin-bottom: 4px;
        }

        .card-role {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--emerald-light);
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .card-id-code {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-dim);
          margin-bottom: 12px;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
        }

        .card-tag {
          font-size: 0.7rem;
          font-family: var(--font-mono);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 12px;
          position: relative;
          z-index: 2;
        }

        .barcode-simulation {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 22px;
          opacity: 0.6;
        }
        .bar { background-color: #cbd5e1; width: 2px; }
        .b1 { height: 18px; }
        .b2 { height: 22px; width: 3px; }
        .b3 { height: 14px; }
        .b4 { height: 20px; width: 4px; }

        .flip-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: var(--emerald-light);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .flip-btn:hover {
          background: rgba(16, 185, 129, 0.25);
          transform: scale(1.05);
        }

        .flip-btn-small {
          background: rgba(6, 182, 212, 0.15);
          border: 1px solid rgba(6, 182, 212, 0.35);
          color: #67e8f9;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.68rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .card-back-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 10px 0;
          text-align: left;
        }

        .back-info-group {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 8px 12px;
          border-radius: 10px;
        }

        .back-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--emerald-light);
          letter-spacing: 0.1em;
          margin-bottom: 2px;
        }

        .back-val-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #ffffff;
        }

        .back-val-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .back-tags {
          display: flex;
          gap: 6px;
          margin-top: 4px;
        }

        .card-back-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 10px;
        }

        .qr-icon {
          color: #67e8f9;
          background: rgba(6, 182, 212, 0.1);
          padding: 4px;
          border-radius: 6px;
        }

        .qr-text {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-dim);
          line-height: 1.4;
        }

        .lanyard-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .lanyard-3d-wrap {
            width: 290px;
            height: 440px;
          }
          .photo-ring {
            width: 120px;
            height: 120px;
          }
          .verified-badge {
            right: 75px;
          }
        }
      `}</style>
    </div>
  );
}
