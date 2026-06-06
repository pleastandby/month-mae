import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  r: number; // radius / size
  d: number; // density / weight
  opacity: number;
  color: string;
  angle: number; // current rotation angle
  angleSpeed: number; // rotation speed
  swing: number; // swing angle
  swingSpeed: number; // swing speed
  type: 'rose' | 'leaf' | 'gold';
}

const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef({ lastY: window.scrollY, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Muted color palette
    const colors = {
      rose: 'rgba(196, 138, 142, 0.55)', // dried rose
      leaf: 'rgba(138, 154, 134, 0.45)', // faded olive green
      gold: 'rgba(220, 200, 170, 0.5)',  // antique gold/sand
    };

    const petals: Petal[] = [];
    const maxPetals = Math.min(45, Math.floor(width / 25));

    const createPetal = (startY?: number): Petal => {
      const types: Array<'rose' | 'leaf' | 'gold'> = ['rose', 'leaf', 'gold'];
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : -20 - Math.random() * 50,
        r: Math.random() * 6 + 4, // size 4 to 10
        d: Math.random() * 0.6 + 0.3, // speed weight
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[type],
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.015 + 0.005,
        type,
      };
    };

    // Pre-populate across the screen height
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(Math.random() * height));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - scrollRef.current.lastY;
      scrollRef.current.speed = Math.min(15, Math.max(-15, diff * 0.2));
      scrollRef.current.lastY = currentY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const drawPetalShape = (c: CanvasRenderingContext2D, p: Petal) => {
      c.beginPath();
      if (p.type === 'rose') {
        // Heart-shaped/oval soft rose petal
        c.moveTo(0, 0);
        c.bezierCurveTo(-p.r * 1.2, -p.r * 1.5, -p.r * 1.8, p.r * 0.5, 0, p.r * 1.8);
        c.bezierCurveTo(p.r * 1.8, p.r * 0.5, p.r * 1.2, -p.r * 1.5, 0, 0);
      } else if (p.type === 'leaf') {
        // Pointy olive leaf shape
        c.moveTo(0, -p.r * 1.6);
        c.quadraticCurveTo(-p.r * 0.8, 0, 0, p.r * 1.6);
        c.quadraticCurveTo(p.r * 0.8, 0, 0, -p.r * 1.6);
      } else {
        // Small organic wildflower particle / round petal
        c.arc(0, 0, p.r * 0.8, 0, Math.PI * 2);
      }
      c.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Decelerate scroll boost
      scrollRef.current.speed *= 0.95;

      petals.forEach((p) => {
        // Apply vertical movement: standard drift speed + scroll speed boost
        p.y += p.d * 0.8 + Math.abs(scrollRef.current.speed) * 0.25;
        p.swing += p.swingSpeed;
        p.angle += p.angleSpeed;

        // Apply horizontal sway
        p.x += Math.sin(p.swing) * 0.4 + scrollRef.current.speed * 0.1;

        // Reset if offscreen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        
        // Add a very subtle, soft shadow to the petals
        ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetY = 2;

        drawPetalShape(ctx, p);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
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
        zIndex: 99,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

export default FallingPetals;
