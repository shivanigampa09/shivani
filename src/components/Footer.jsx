import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../utils/audio';

export default function Footer() {
  const [celebrated, setCelebrated] = useState(false);

  const handleSparkle = () => {
    playSuccessChime();
    setCelebrated(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.85 },
      colors: ['#10b981', '#34d399', '#06b6d4', '#f59e0b', '#ec4899', '#a855f7']
    });
    setTimeout(() => setCelebrated(false), 2400);
  };

  return (
    <footer className="footer-container">
      <div className="section-container">
        {/* Minimal & Distinctive Thank You Card */}
        <div 
          className={`thankyou-card glass-panel ${celebrated ? 'celebrated' : ''}`}
          onClick={handleSparkle}
          role="button"
          tabIndex={0}
          title="Click to celebrate ✨"
        >
          <div className="thankyou-ambient-glow"></div>

          <h2 className="thankyou-headline font-display">
            Thank <span className="text-gradient-emerald">You</span>
          </h2>

          <p className="thankyou-signature">
            Shivani Gampa • Web Developer
          </p>
        </div>
      </div>

      <style>{`
        .footer-container {
          position: relative;
          z-index: 10;
          padding: 40px 0 60px;
          background: transparent;
        }

        .thankyou-card {
          position: relative;
          max-width: 640px;
          margin: 0 auto;
          padding: 48px 36px;
          text-align: center;
          border-radius: 24px;
          background: rgba(10, 16, 28, 0.75);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(16, 185, 129, 0.28);
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.75),
            0 0 40px rgba(16, 185, 129, 0.08);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }
        .thankyou-card:hover {
          border-color: rgba(16, 185, 129, 0.55);
          transform: translateY(-3px);
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.85),
            0 0 50px rgba(16, 185, 129, 0.18);
        }
        .thankyou-card.celebrated {
          border-color: rgba(52, 211, 153, 0.8);
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.85),
            0 0 60px rgba(16, 185, 129, 0.35);
        }

        .thankyou-ambient-glow {
          position: absolute;
          top: -60%;
          left: 50%;
          transform: translateX(-50%);
          width: 360px;
          height: 200px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 80%);
          filter: blur(45px);
          pointer-events: none;
          z-index: 0;
        }

        .thankyou-headline {
          position: relative;
          z-index: 1;
          font-size: 2.75rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .thankyou-signature {
          position: relative;
          z-index: 1;
          font-size: 1.15rem;
          font-weight: 500;
          color: rgba(226, 232, 240, 0.9);
          letter-spacing: 0.02em;
          margin: 0;
          transition: color 0.3s ease;
        }
        .thankyou-card:hover .thankyou-signature {
          color: var(--emerald-light);
        }

        @media (max-width: 640px) {
          .thankyou-card {
            padding: 36px 22px;
            border-radius: 20px;
          }
          .thankyou-headline {
            font-size: 2.1rem;
          }
          .thankyou-signature {
            font-size: 1rem;
          }
        }
      `}</style>
    </footer>
  );
}
