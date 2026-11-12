import React, { useEffect, useState } from 'react';

export default function CyberCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering an interactive element
      const target = e.target;
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    // Smooth lerp loop for the outer reticle ring
    const loop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      {/* Center pinpoint */}
      <div
        className="fixed w-2 h-2 rounded-full bg-[#00f0ff] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#00f0ff]"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />

      {/* Trailing Cyber Crosshair Ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-12 h-12 border-2 border-[#ff007a] rounded-full shadow-[0_0_20px_rgba(255,0,122,0.8)] rotate-45 scale-125'
            : isClicked
            ? 'w-8 h-8 border border-cyan-400 rounded-full scale-90'
            : 'w-10 h-10 border border-cyan-400/50 rounded-full'
        }`}
        style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
      >
        {/* Reticle corner ticks */}
        {isHovered && (
          <>
            <span className="absolute -top-1 w-1.5 h-1.5 bg-[#ff007a]" />
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#ff007a]" />
            <span className="absolute -left-1 w-1.5 h-1.5 bg-[#ff007a]" />
            <span className="absolute -right-1 w-1.5 h-1.5 bg-[#ff007a]" />
          </>
        )}
      </div>
    </div>
  );
}

