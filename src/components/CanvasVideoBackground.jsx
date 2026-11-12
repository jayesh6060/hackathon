import React, { useRef, useEffect, useState } from 'react';

const TOTAL_FRAMES = 120;

export default function CanvasVideoBackground({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const heroArtworkRef = useRef(null);

  const loadedMapRef = useRef(new Map());
  const lastGoodImageRef = useRef(null);

  // 1. Preload widescreen master artwork (16:9 Landscape - Full Bleed)
  useEffect(() => {
    const heroImg = new Image();
    heroImg.src = '/assets/clockit-landscape-artwork.jpg';
    heroImg.onload = () => {
      heroArtworkRef.current = heroImg;
    };
  }, []);

  // 2. High-performance direct scroll listener (bypasses React render bottlenecks)
  useEffect(() => {
    const updateScrollTarget = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const prog = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      targetProgressRef.current = prog;
      targetFrameRef.current = prog * (TOTAL_FRAMES - 1);
    };

    updateScrollTarget();
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', updateScrollTarget);

    return () => {
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', updateScrollTarget);
    };
  }, []);

  // Update target when prop changes
  useEffect(() => {
    if (typeof scrollProgress === 'number') {
      targetProgressRef.current = Math.min(Math.max(scrollProgress, 0), 1);
      targetFrameRef.current = targetProgressRef.current * (TOTAL_FRAMES - 1);
    }
  }, [scrollProgress]);

  // 3. Preload vertical frames for mobile/portrait viewports
  useEffect(() => {
    const images = [];
    let isCancelled = false;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = () => {
        if (!isCancelled) {
          loadedMapRef.current.set(i, img);
          setLoadedCount(prev => prev + 1);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, []);

  // 4. Main 60-120fps Hardware Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    let animationFrameId = null;

    // High-DPI canvas resizing
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Reliable frame retriever for mobile
    const getBestAvailableImage = (targetIndex) => {
      const targetInt = Math.round(targetIndex);
      
      const loaded = loadedMapRef.current.get(targetInt);
      if (loaded && loaded.complete && loaded.naturalWidth > 0) return loaded;

      const arrImg = imagesRef.current[targetInt];
      if (arrImg && arrImg.complete && arrImg.naturalWidth > 0) return arrImg;

      for (let offset = 1; offset < 16; offset++) {
        const left = loadedMapRef.current.get(targetInt - offset);
        if (left && left.complete && left.naturalWidth > 0) return left;
        const right = loadedMapRef.current.get(targetInt + offset);
        if (right && right.complete && right.naturalWidth > 0) return right;
      }

      if (lastGoodImageRef.current) return lastGoodImageRef.current;
      return heroArtworkRef.current || imagesRef.current[0] || null;
    };

    // Draw frame onto canvas
    const renderFrame = () => {
      // Butter-smooth momentum lerp (10% damping gives silky inertia)
      const diffProgress = targetProgressRef.current - smoothProgressRef.current;
      smoothProgressRef.current += diffProgress * 0.10;

      const diffFrame = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diffFrame * 0.10;

      const clampedProg = Math.min(Math.max(smoothProgressRef.current, 0), 1);
      const clampedCurrent = Math.min(
        Math.max(currentFrameRef.current, 0),
        TOTAL_FRAMES - 1
      );

      if (ctx) {
        const cw = canvas.width;
        const ch = canvas.height;
        const isLandscape = cw >= ch;

        // Clear canvas with deep space base background color
        ctx.fillStyle = '#101A2B';
        ctx.fillRect(0, 0, cw, ch);

        if (isLandscape) {
          // ========================================================
          // DESKTOP / WIDESCREEN: 100% FULL-BLEED MASTER ARTWORK
          // Shows full floating islands on both sides with cinematic parallax
          // ========================================================
          const heroImg = heroArtworkRef.current || getBestAvailableImage(0);

          if (heroImg && heroImg.complete && heroImg.naturalWidth > 0) {
            const hvw = heroImg.naturalWidth;
            const hvh = heroImg.naturalHeight;

            // Base scale fills the screen 100% edge-to-edge
            const baseScale = Math.max(cw / hvw, ch / hvh);

            // Cinematic Parallax Dynamics:
            // 1. Subtle forward push-in zoom (1.0 -> 1.12)
            const zoom = 1.0 + clampedProg * 0.12;
            const nw = hvw * baseScale * zoom;
            const nh = hvh * baseScale * zoom;

            // 2. Gentle lateral drift
            const driftX = Math.sin(clampedProg * Math.PI) * (cw * 0.012);
            const ox = (cw - nw) / 2 + driftX;

            // 3. Smooth vertical elevation glide from celestial portal to citadel grounds
            const elevationFactor = 0.20 + clampedProg * 0.42;
            const oy = (ch - nh) * elevationFactor;

            // Draw full master landscape artwork
            ctx.drawImage(heroImg, ox, oy, nw, nh);

            // Celestial Sun-Wheel Portal Aura (rotates & pulses with scroll)
            const portalCenterX = cw * 0.5 + driftX;
            const portalCenterY = oy + nh * 0.28;
            const auraRadius = Math.min(cw, ch) * 0.42;

            const portalAura = ctx.createRadialGradient(
              portalCenterX,
              portalCenterY,
              20,
              portalCenterX,
              portalCenterY,
              auraRadius
            );
            portalAura.addColorStop(0, 'rgba(246, 164, 58, 0.24)');
            portalAura.addColorStop(0.35, 'rgba(56, 189, 248, 0.12)');
            portalAura.addColorStop(0.70, 'rgba(255, 113, 56, 0.04)');
            portalAura.addColorStop(1, 'rgba(16, 26, 43, 0.0)');

            ctx.fillStyle = portalAura;
            ctx.fillRect(0, 0, cw, ch);
          }
        } else {
          // ========================================================
          // MOBILE / PORTRAIT: HIGH-RES 9:16 VIDEO FRAMES
          // Natural fit for vertical phone screens with sub-frame blending
          // ========================================================
          const fFloor = Math.floor(clampedCurrent);
          const fCeil = Math.min(fFloor + 1, TOTAL_FRAMES - 1);
          const subFrameFraction = clampedCurrent - fFloor;

          const imgA = getBestAvailableImage(fFloor);
          const imgB = getBestAvailableImage(fCeil);
          const primaryImg = imgA || heroArtworkRef.current;

          if (primaryImg && primaryImg.complete && primaryImg.naturalWidth > 0) {
            lastGoodImageRef.current = primaryImg;

            const vw = primaryImg.naturalWidth;
            const vh = primaryImg.naturalHeight;
            const scale = Math.max(cw / vw, ch / vh);
            const nw = vw * scale;
            const nh = vh * scale;
            const ox = (cw - nw) / 2;
            const oy = (ch - nh) * 0.5;

            ctx.drawImage(primaryImg, ox, oy, nw, nh);

            if (subFrameFraction > 0.03 && imgB && imgB !== primaryImg && imgB.complete && imgB.naturalWidth > 0) {
              ctx.save();
              ctx.globalAlpha = subFrameFraction;
              ctx.drawImage(imgB, ox, oy, nw, nh);
              ctx.restore();
            }
          }
        }

        // Clean Translucent Vignette:
        // Top 15% soft tint for header legibility, 100% crystal-clear in middle, subtle base
        const vignette = ctx.createLinearGradient(0, 0, 0, ch);
        vignette.addColorStop(0, 'rgba(16, 26, 43, 0.40)');
        vignette.addColorStop(0.12, 'rgba(16, 26, 43, 0.08)');
        vignette.addColorStop(0.50, 'rgba(16, 26, 43, 0.0)');
        vignette.addColorStop(0.85, 'rgba(16, 26, 43, 0.15)');
        vignette.addColorStop(1, 'rgba(16, 26, 43, 0.50)');

        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, cw, ch);
        // Note: No heavy black side vignettes, leaving the landscape islands fully visible!
      }

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    animationFrameId = requestAnimationFrame(renderFrame);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
      {/* 60-120fps Hardware Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block filter brightness-[0.98] contrast-[1.04]"
      />

      {/* Atmospheric Golden Spire Ambient Halo */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F6A43A]/10 rounded-full blur-[170px] pointer-events-none transition-opacity duration-700"
        style={{
          opacity: 0.5 + Math.sin(smoothProgressRef.current * Math.PI) * 0.4
        }}
      />
    </div>
  );
}
