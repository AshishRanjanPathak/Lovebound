import React, { useEffect, useRef } from 'react';
import { useSettingsStore } from '../../stores/useSettingsStore';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedY: number;
  speedX: number;
  alpha: number;
  pulseSpeed: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings } = useSettingsStore();

  useEffect(() => {
    if (!settings.display.particlesEnabled || settings.accessibility.reduceMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = ['#FF79B7', '#F49AC2', '#8B5CF6', '#E9C77B'];
    const particleCount = Math.min(40, Math.floor((width * height) / 30000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        // Wrap around
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha));
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [settings.display.particlesEnabled, settings.accessibility.reduceMotion]);

  if (!settings.display.particlesEnabled || settings.accessibility.reduceMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-75"
    />
  );
};
