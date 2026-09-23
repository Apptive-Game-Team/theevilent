import React, { useEffect, useRef } from 'react';

type Channels = [number, number, number];

interface Palette {
  leaf: Channels;
  leafAlt: Channels;
  opacity: number;
}

const FALLBACK: Palette = {
  leaf: [174, 211, 71],
  leafAlt: [145, 190, 90],
  opacity: 0.3,
};

const readChannels = (styles: CSSStyleDeclaration, name: string, fallback: Channels): Channels => {
  const parts = styles.getPropertyValue(name).split(',').map((part) => Number.parseFloat(part));
  return parts.length === 3 && parts.every((part) => Number.isFinite(part))
    ? (parts as Channels)
    : fallback;
};

/** The leaf colours of whichever theme is on the document right now. */
const readPalette = (): Palette => {
  const styles = getComputedStyle(document.documentElement);
  const opacity = Number.parseFloat(styles.getPropertyValue('--color-leaf-opacity'));
  return {
    leaf: readChannels(styles, '--color-leaf-rgb', FALLBACK.leaf),
    leafAlt: readChannels(styles, '--color-leaf-alt-rgb', FALLBACK.leafAlt),
    opacity: Number.isFinite(opacity) ? opacity : FALLBACK.opacity,
  };
};

interface Leaf {
  x: number;
  y: number;
  length: number;
  fallSpeed: number;
  driftSpeed: number;
  drift: number;
  spin: number;
  spinSpeed: number;
  alpha: number;
  alt: boolean;
}

/** One leaf per this many square pixels, so a phone does not get a blizzard. */
const AREA_PER_LEAF = 46_000;
const MAX_LEAVES = 28;

/**
 * Leaves drifting down through the clearing.
 *
 * This canvas used to drift embers up a black page, which belonged to the dark
 * fantasy template the site was built from and not to the game — Arcane
 * Casters is played in daylight on a grass field under a canopy. The motion
 * stayed because a still page under a sunlit hero looks flat; only what falls
 * through it changed. The leaves are drawn at low alpha behind everything
 * (z-index: -1) and hold still under prefers-reduced-motion.
 */
export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let leaves: Leaf[] = [];
    let palette = readPalette();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const makeLeaf = (startAtTop: boolean): Leaf => ({
      x: Math.random() * width,
      y: startAtTop ? -Math.random() * height * 0.5 : Math.random() * height,
      length: 9 + Math.random() * 13,
      fallSpeed: 0.18 + Math.random() * 0.34,
      driftSpeed: 0.0035 + Math.random() * 0.006,
      drift: Math.random() * Math.PI * 2,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.012,
      alpha: 0.45 + Math.random() * 0.55,
      alt: Math.random() < 0.45,
    });

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const wanted = Math.min(MAX_LEAVES, Math.round((width * height) / AREA_PER_LEAF));
      leaves = Array.from({ length: Math.max(6, wanted) }, () => makeLeaf(false));
    };

    // A leaf: two arcs meeting at a point at each end, with a midrib.
    const drawLeaf = (leaf: Leaf) => {
      const [r, g, b] = leaf.alt ? palette.leafAlt : palette.leaf;
      const half = leaf.length / 2;
      const belly = leaf.length * 0.3;

      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.spin);
      ctx.globalAlpha = palette.opacity * leaf.alpha;

      ctx.beginPath();
      ctx.moveTo(-half, 0);
      ctx.quadraticCurveTo(0, -belly, half, 0);
      ctx.quadraticCurveTo(0, belly, -half, 0);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-half, 0);
      ctx.lineTo(half, 0);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${Math.round(r * 0.72)}, ${Math.round(g * 0.72)}, ${Math.round(b * 0.72)}, 0.8)`;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      leaves.forEach(drawLeaf);
    };

    const step = () => {
      leaves.forEach((leaf) => {
        leaf.drift += leaf.driftSpeed;
        leaf.spin += leaf.spinSpeed;
        leaf.y += leaf.fallSpeed;
        leaf.x += Math.sin(leaf.drift) * 0.5;

        if (leaf.y - leaf.length > height) {
          Object.assign(leaf, makeLeaf(true), { y: -leaf.length });
        }
        if (leaf.x < -leaf.length) leaf.x = width + leaf.length;
        if (leaf.x > width + leaf.length) leaf.x = -leaf.length;
      });

      render();
      animationFrameId = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      if (motionQuery.matches) {
        render();
        return;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    const handleResize = () => {
      resize();
      start();
    };

    const handleMotionChange = () => {
      start();
    };

    // A page can swap the theme while the canvas is running, so the leaves
    // reread their colours whenever data-theme changes.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (motionQuery.matches) render();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    resize();
    start();
    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
      themeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
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
