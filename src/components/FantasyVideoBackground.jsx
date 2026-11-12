import React, { useRef, useEffect } from 'react';

export default function FantasyVideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict Scroll-Controlled Playback: NEVER autonomous autoplay!
    video.pause();

    let duration = 9.5; // Default fallback duration until metadata is parsed
    let targetTime = 0;
    let rafId = null;

    const onMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        duration = video.duration;
      }
      video.pause();
      // Force initial frame paint
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
      }
    };

    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('loadeddata', onMetadata);
    video.addEventListener('canplay', onMetadata);
    if (video.readyState >= 1) onMetadata();

    // Continuous RAF lerp loop: interpolates currentTime towards targetTime at 60 FPS
    const updateLoop = () => {
      if (video && duration > 0) {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.005) {
          // Smooth 25% lerp per animation frame for buttery smooth scrubbing
          video.currentTime = Math.min(
            Math.max(video.currentTime + diff * 0.28, 0),
            duration - 0.02
          );
        }
      }
      rafId = requestAnimationFrame(updateLoop);
    };
    rafId = requestAnimationFrame(updateLoop);

    // Track scroll position: scrolling down moves video forward, scrolling up rewinds
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const scrollFraction = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
        targetTime = scrollFraction * duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('loadeddata', onMetadata);
      video.removeEventListener('canplay', onMetadata);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
      {/* Actual Google Flow Video - 100% Scroll-Controlled */}
      <video
        ref={videoRef}
        src="/assets/flow-video.mp4"
        playsInline
        muted
        preload="auto"
        className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08]"
      >
        <source src="/assets/flow-video.mp4" type="video/mp4" />
        <source src="/5011f6a6-9575-4bf1-a612-03867b03c695.mp4" type="video/mp4" />
      </video>

      {/* Subtle Gentle Vignette for Text Legibility without obscuring the artwork */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#101A2B]/45 via-transparent to-[#101A2B]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-[#101A2B]/20 pointer-events-none" />

      {/* Subtle Golden Spire Ambient Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#F6A43A]/10 rounded-full blur-[180px] pointer-events-none" />
    </div>
  );
}
