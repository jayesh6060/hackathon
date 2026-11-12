import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MasterVideoBackground({ onProgressUpdate }) {
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let rafId = null;

    // Smooth RAF loop to prevent browser frame-seek jitter
    const renderLoop = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.02) {
          video.currentTime = Math.min(
            Math.max(video.currentTime + diff * 0.35, 0),
            video.duration - 0.02
          );
        }
      }
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);

    const onMetadata = () => {
      const dur = video.duration && !isNaN(video.duration) ? video.duration : 9.5;
      setVideoDuration(dur);
      video.pause();
    };

    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('loadeddata', onMetadata);
    video.addEventListener('canplay', onMetadata);
    if (video.readyState >= 1) {
      onMetadata();
    }

    // Master ScrollTrigger tracking the whole page
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const prog = self.progress;
        if (onProgressUpdate) {
          onProgressUpdate(prog);
        }
        const dur = video && video.duration && !isNaN(video.duration) ? video.duration : 9.5;
        targetTime = prog * dur;
      }
    });

    return () => {
      st.kill();
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('loadeddata', onMetadata);
      video.removeEventListener('canplay', onMetadata);
    };
  }, [onProgressUpdate]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {/* Google Flow HTML5 Video Element */}
      <video
        ref={videoRef}
        playsInline
        muted
        preload="auto"
        className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.12] scale-105"
      >
        <source src="/assets/flow-video.mp4" type="video/mp4" />
        <source src="/5011f6a6-9575-4bf1-a612-03867b03c695.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Dark Gradient Vignette for Readability */}
      <div className="absolute inset-0 bg-[#03050d]/65 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#03050d]/80 via-transparent to-[#03050d]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#03050d]/40 to-[#03050d]/95 pointer-events-none" />
      <div className="absolute inset-0 scanlines-subtle opacity-25 pointer-events-none" />

      {/* Subtle Ethereal Ambient Glows (Azure & Indigo) */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
}

