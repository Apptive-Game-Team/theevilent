import React, { useEffect, useRef } from 'react';

type Channels = [number, number, number];

interface Palette {
  ember: Channels;
  ash: Channels;
  glow: string;
  backdropEdge: string;
  backdropCenter: string;
}

/**
 * How far each ember strays from the theme's ember colour, per channel. These
 * are the spreads the canvas has always drawn around The Evil Ent's crimson;
 * any other theme gets the same scatter around its own ember colour.
 */
const EMBER_SCATTER: Channels = [27, 20, 10];
const NO_SCATTER: Channels = [0, 0, 0];

const FALLBACK: Palette = {
  ember: [227, 30, 25],
  ash: [90, 70, 60],
  glow: 'rgba(230, 30, 42, 0.6)',
  backdropEdge: 'rgba(5, 4, 4, 0.95)',
  backdropCenter: 'rgba(13, 11, 10, 0.93)',
};

const readChannels = (styles: CSSStyleDeclaration, name: string, fallback: Channels): Channels => {
  const parts = styles.getPropertyValue(name).split(',').map((part) => Number.parseFloat(part));
  return parts.length === 3 && parts.every((part) => Number.isFinite(part))
    ? (parts as Channels)
    : fallback;
};

const readColor = (styles: CSSStyleDeclaration, name: string, fallback: string) =>
  styles.getPropertyValue(name).trim() || fallback;

/** The particle colours of whichever theme is on the document right now. */
const readPalette = (): Palette => {
  const styles = getComputedStyle(document.documentElement);
  return {
    ember: readChannels(styles, '--color-ember-rgb', FALLBACK.ember),
    ash: readChannels(styles, '--color-ember-ash-rgb', FALLBACK.ash),
    glow: readColor(styles, '--color-ember-glow', FALLBACK.glow),
    backdropEdge: readColor(styles, '--color-backdrop-edge', FALLBACK.backdropEdge),
    backdropCenter: readColor(styles, '--color-backdrop-center', FALLBACK.backdropCenter),
  };
};

const channel = (value: number) => Math.min(255, Math.max(0, Math.round(value)));

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let palette = readPalette();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Particle representation
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      isAsh: boolean;
      scatter: Channels;
      wobble: number;
      wobbleSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 60; // Kept at reasonable count for performance

    const createParticle = (isInitial = false): Particle => {
      const size = Math.random() * 3 + 0.5;
      const isAsh = Math.random() <= 0.15;
      return {
        x: Math.random() * width,
        y: isInitial ? Math.random() * height : height + 10,
        size,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        isAsh,
        // Fixed per particle so a theme change recolours it without resetting it.
        scatter: isAsh
          ? NO_SCATTER
          : (EMBER_SCATTER.map((spread) => (Math.random() * 2 - 1) * spread) as Channels),
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
      };
    };

    const particleColor = (p: Particle) => {
      const base = p.isAsh ? palette.ash : palette.ember;
      const [r, g, b] = base.map((value, index) => channel(value + p.scatter[index]));
      return `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
    };

    const drawBackdrop = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, palette.backdropEdge);
      gradient.addColorStop(0.5, palette.backdropCenter);
      gradient.addColorStop(1, palette.backdropEdge);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drawBackdrop();
    };

    window.addEventListener('resize', handleResize);

    // The canvas sits above the pages in the tree, so it watches the document
    // element for the theme the mounted page puts there.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (prefersReducedMotion) drawBackdrop();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    if (prefersReducedMotion) {
      drawBackdrop();
      return () => {
        window.removeEventListener('resize', handleResize);
        themeObserver.disconnect();
      };
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      drawBackdrop();

      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.2;

        // Reset particle if it drifts off top or sides
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[index] = createParticle(false);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Add subtle shadow glow to embers
        if (p.isAsh) {
          ctx.shadowBlur = 0;
        } else {
          ctx.shadowBlur = p.size * 3;
          ctx.shadowColor = palette.glow;
        }

        ctx.fillStyle = particleColor(p);
        ctx.fill();
      });

      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      themeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};
export default ParticleBackground;
