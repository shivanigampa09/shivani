import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playUiClick, playSuccessChime } from '../utils/audio';
import { ChevronDown } from 'lucide-react';

const HELLO_ITEMS = ['H', 'E', 'L', 'L', 'O', '.', '.', '.'];

export default function HelloIntro({ onComplete }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [isDismissed, setIsDismissed] = useState(false);

  const containerRef = useRef(null);
  const targetProgress = useRef(0);
  const animFrameId = useRef(null);
  const touchStartY = useRef(0);

  // Sequential letter entrance animation on mount
  useEffect(() => {
    // Lock scroll at the very top of window
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    HELLO_ITEMS.forEach((_, idx) => {
      setTimeout(() => {
        setRevealedCount(idx + 1);
        playUiClick(580 + idx * 75, 'sine', 0.04);
      }, 300 + idx * 140);
    });

    // Reveal subtitle: SHIVANI GAMPA • WEB DEVELOPER
    const subTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 300 + HELLO_ITEMS.length * 140 + 100);

    // Reveal scroll down prompt
    const promptTimer = setTimeout(() => {
      setShowPrompt(true);
    }, 300 + HELLO_ITEMS.length * 140 + 400);

    return () => {
      clearTimeout(subTimer);
      clearTimeout(promptTimer);
      document.body.style.overflow = '';
    };
  }, []);

  const triggerFinish = useCallback(() => {
    setIsDismissed(true);
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    playSuccessChime();
    if (onComplete) onComplete();
  }, [onComplete]);

  // Smooth lerp progress updater
  useEffect(() => {
    const updateProgress = () => {
      // Keep scroll locked at top while intro is fading
      if (!isDismissed) {
        window.scrollTo(0, 0);
      }

      let shouldFinish = false;
      setScrollProgress((prev) => {
        const diff = targetProgress.current - prev;
        if (Math.abs(diff) < 0.005) {
          if (targetProgress.current >= 1 && !isDismissed) {
            shouldFinish = true;
          }
          return targetProgress.current;
        }
        const next = prev + diff * 0.18;
        if (next >= 0.98 && !isDismissed) {
          shouldFinish = true;
        }
        return next;
      });

      if (shouldFinish && !isDismissed) {
        triggerFinish();
      }
      animFrameId.current = requestAnimationFrame(updateProgress);
    };

    animFrameId.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isDismissed, onComplete, triggerFinish]);

  const handleUnlockInstantly = () => {
    targetProgress.current = 1;
  };

  // Wheel & touch listeners with preventDefault so page NEVER scrolls down underneath
  useEffect(() => {
    const handleWheel = (e) => {
      if (isDismissed) return;
      // Prevent the background page from scrolling down
      e.preventDefault();
      window.scrollTo(0, 0);

      if (e.deltaY > 0) {
        // Any slight scroll down smoothly triggers the unlock transition
        targetProgress.current = Math.min(1, targetProgress.current + 0.35);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isDismissed) return;
      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY;
      if (delta > 10) {
        e.preventDefault();
        targetProgress.current = 1;
      }
    };

    const handleKeyDown = (e) => {
      if (isDismissed) return;
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
        targetProgress.current = 1;
      }
    };

    // passive: false is REQUIRED to allow e.preventDefault()
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  // Visual transformations based on scroll progress
  const letterScale = 1 + scrollProgress * 3.5;
  const letterOpacity = Math.max(0, 1 - scrollProgress * 1.6);
  const letterSpacing = `${0.1 + scrollProgress * 0.9}em`;
  const curtainOpacity = Math.max(0, 1 - scrollProgress * scrollProgress);
  const curtainTranslateY = -scrollProgress * 20;

  return (
    <div
      ref={containerRef}
      className="hello-intro-overlay"
      style={{
        opacity: curtainOpacity,
        transform: `translate3d(0, ${curtainTranslateY}%, 0)`,
        pointerEvents: scrollProgress >= 0.9 ? 'none' : 'auto',
      }}
      onClick={handleUnlockInstantly}
    >
      {/* Background Deep Space Canvas Glow */}
      <div className="intro-bg-ambient" />

      {/* Center "HELLO..." Typography */}
      <div 
        className="hello-center-stage"
        style={{
          transform: `scale(${letterScale}) translateZ(0)`,
          opacity: letterOpacity,
          letterSpacing: letterSpacing,
        }}
      >
        <div className="hello-letters-row">
          {HELLO_ITEMS.map((char, idx) => {
            const isDot = char === '.';
            const isRevealed = idx < revealedCount;
            return (
              <span
                key={idx}
                className={`hello-char ${isDot ? 'dot-char' : 'letter-char'} ${isRevealed ? 'revealed' : ''}`}
                style={{
                  transitionDelay: `${idx * 0.04}s`,
                }}
                onMouseEnter={() => playUiClick(650 + idx * 60, 'sine', 0.03)}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Subtitle Identity: SHIVANI GAMPA • WEB DEVELOPER */}
        <div className={`hello-sub-bar ${showSubtitle ? 'visible' : ''}`}>
          <span className="sub-tag font-mono">SHIVANI GAMPA</span>
          <span className="sub-divider">•</span>
          <span className="sub-role font-mono">WEB DEVELOPER</span>
        </div>
      </div>

      {/* Bottom Scroll / Interaction Prompt */}
      <div 
        className={`intro-scroll-prompt ${showPrompt ? 'visible' : ''}`}
        style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
      >
        <div className="scroll-mouse-icon">
          <div className="mouse-wheel-dot"></div>
        </div>
        <div className="prompt-text-group font-mono">
          <span className="prompt-main">SCROLL DOWN TO ENTER</span>
          <span className="prompt-hint">or click anywhere to explore</span>
        </div>
        <div className="prompt-arrow-bounce">
          <ChevronDown size={20} className="text-emerald-400" />
        </div>

        {/* Progress Bar */}
        {scrollProgress > 0 && (
          <div className="intro-progress-track">
            <div 
              className="intro-progress-fill" 
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        )}
      </div>

      <style>{`
        .hello-intro-overlay {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background-color: #000000;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
          transition: opacity 0.35s ease-out, transform 0.35s ease-out;
        }

        .intro-bg-ambient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 65%),
            radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 100% 100%, 32px 32px;
          pointer-events: none;
        }

        .hello-center-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform-origin: center center;
          transition: transform 0.08s linear, opacity 0.08s linear, letter-spacing 0.08s linear;
          position: relative;
          z-index: 10;
        }

        .hello-letters-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: clamp(2px, 0.6vw, 8px);
        }

        .hello-char {
          font-family: var(--font-display);
          font-size: clamp(4rem, 13vw, 10.5rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1;
          display: inline-block;
          opacity: 0;
          transform: translateY(35px) scale(0.9);
          filter: blur(10px);
          cursor: pointer;
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.2s ease,
                      text-shadow 0.2s ease;
          pointer-events: auto;
        }

        .hello-char.revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
          text-shadow: 
            0 0 30px rgba(16, 185, 129, 0.4),
            0 0 60px rgba(16, 185, 129, 0.2),
            0 4px 20px rgba(0, 0, 0, 0.9);
        }

        /* Hover Interactive Glow & Lift */
        .hello-char:hover {
          color: var(--emerald-light);
          transform: translateY(-8px) scale(1.08);
          text-shadow: 
            0 0 35px rgba(16, 185, 129, 0.9),
            0 0 70px rgba(16, 185, 129, 0.5),
            0 0 100px rgba(6, 182, 212, 0.4);
        }

        .dot-char {
          color: var(--emerald-light);
          text-shadow: 0 0 35px var(--emerald-primary);
        }

        /* Subtitle Identity Bar */
        .hello-sub-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hello-sub-bar.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .sub-tag {
          font-size: clamp(0.75rem, 1.8vw, 0.95rem);
          color: #e2e8f0;
          letter-spacing: 0.25em;
          font-weight: 600;
        }

        .sub-divider {
          color: var(--emerald-primary);
          font-size: 1rem;
        }

        .sub-role {
          font-size: clamp(0.75rem, 1.8vw, 0.95rem);
          color: var(--emerald-light);
          letter-spacing: 0.2em;
          font-weight: 600;
        }

        /* Bottom Scroll Prompt */
        .intro-scroll-prompt {
          position: absolute;
          bottom: 45px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          z-index: 20;
          pointer-events: none;
        }

        .intro-scroll-prompt.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-mouse-icon {
          width: 22px;
          height: 36px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 12px;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .mouse-wheel-dot {
          width: 4px;
          height: 8px;
          background: var(--emerald-light);
          border-radius: 2px;
          margin-top: 6px;
          animation: mouseScroll 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          box-shadow: 0 0 8px var(--emerald-primary);
        }

        @keyframes mouseScroll {
          0% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }

        .prompt-text-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .prompt-main {
          font-size: 0.8rem;
          color: #ffffff;
          letter-spacing: 0.22em;
          font-weight: 600;
        }

        .prompt-hint {
          font-size: 0.7rem;
          color: var(--text-dim);
          letter-spacing: 0.08em;
        }

        .prompt-arrow-bounce {
          animation: bounceArrow 1.6s ease-in-out infinite;
        }

        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        .intro-progress-track {
          width: 140px;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 6px;
        }

        .intro-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%);
          border-radius: 2px;
          transition: width 0.08s linear;
        }

        @media (max-width: 640px) {
          .hello-sub-bar {
            gap: 8px;
            margin-top: 16px;
          }
          .intro-scroll-prompt {
            bottom: 30px;
          }
        }
      `}</style>
    </div>
  );
}
