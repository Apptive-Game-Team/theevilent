import React, { useEffect, useRef } from 'react';

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

    // Particle representation
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      wobble: number;
      wobbleSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 60; // Kept at reasonable count for performance

    const createParticle = (isInitial = false): Particle => {
      const size = Math.random() * 3 + 0.5;
      return {
        x: Math.random() * width,
        y: isInitial ? Math.random() * height : height + 10,
        size,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        // Glowing crimson red/orange tones + occasional dark ashes
        color: Math.random() > 0.15 
          ? `rgba(${200 + Math.floor(Math.random() * 55)}, ${10 + Math.floor(Math.random() * 40)}, ${15 + Math.floor(Math.random() * 20)},` 
          : 'rgba(90, 70, 60,', // grey/brown ashes
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dark background gradient overlay to keep high contrast
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(5, 4, 4, 0.95)');
      gradient.addColorStop(0.5, 'rgba(13, 11, 10, 0.93)');
      gradient.addColorStop(1, 'rgba(5, 4, 4, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
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
        if (p.color.startsWith('rgba(2')) {
          ctx.shadowBlur = p.size * 3;
          ctx.shadowColor = 'rgba(230, 30, 42, 0.6)';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.fill();
      });

      // Reset shadow blur for next frame/drawings
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
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
