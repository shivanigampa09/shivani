import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let hideTimer = null;

    // Desktop Mouse Handlers
    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsHovered(true);
    const onMouseUp = () => setIsHovered(false);

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Mobile Touch Handlers
    const onTouchStart = (e) => {
      if (hideTimer) clearTimeout(hideTimer);
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        setPos({ x: touch.clientX, y: touch.clientY });
        setTrailingPos({ x: touch.clientX, y: touch.clientY });
        setIsVisible(true);
        setIsHovered(true);
      }
    };

    const onTouchMove = (e) => {
      if (hideTimer) clearTimeout(hideTimer);
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        setPos({ x: touch.clientX, y: touch.clientY });
        if (!isVisible) setIsVisible(true);
      }
    };

    const onTouchEnd = () => {
      setIsHovered(false);
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 700);
    };

    // Attach desktop listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    // Attach mobile touch listeners
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // Smooth trailing animation loop
    let animId;
    const updateTrailing = () => {
      setTrailingPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.24,
          y: prev.y + dy * 0.24,
        };
      });
      animId = requestAnimationFrame(updateTrailing);
    };
    animId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (hideTimer) clearTimeout(hideTimer);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`custom-cursor ${isHovered ? 'active' : ''}`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
      />
      <div
        className="custom-cursor-dot"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </>
  );
}
