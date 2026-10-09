import React, { useEffect, useRef } from 'react';

interface SoupCardVisualProps {
  soupId: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SoupCardVisual: React.FC<SoupCardVisualProps> = ({ soupId, name, size = 'md' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rippleRef = useRef<{ x: number; y: number; r: number; active: boolean }>({
    x: 0,
    y: 0,
    r: 0,
    active: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.44;

      ctx.clearRect(0, 0, w, h);

      // Ceramic Outer Rim
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
      ctx.fillStyle = '#141210';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#292524';
      ctx.stroke();

      // Golden accent inner rim
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.stroke();

      // Clip to interior bowl
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Liquid Broth Base Gradient
      const grad = ctx.createRadialGradient(cx - 15, cy - 15, 10, cx, cy, radius);
      if (soupId.includes('black-pepper')) {
        grad.addColorStop(0, '#D97706');
        grad.addColorStop(0.5, '#92400E');
        grad.addColorStop(1, '#451A03');
      } else if (soupId.includes('patient')) {
        grad.addColorStop(0, '#FEF08A');
        grad.addColorStop(0.4, '#F59E0B');
        grad.addColorStop(1, '#78350F');
      } else {
        grad.addColorStop(0, '#F59E0B');
        grad.addColorStop(0.5, '#B45309');
        grad.addColorStop(1, '#451A03');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Pulled chicken fibers / marrow pieces
      ctx.fillStyle = 'rgba(254, 243, 199, 0.75)';
      ctx.beginPath();
      ctx.ellipse(cx - 20, cy - 10, 22, 6, 0.4, 0, Math.PI * 2);
      ctx.ellipse(cx + 15, cy + 15, 26, 7, -0.3, 0, Math.PI * 2);
      ctx.ellipse(cx - 5, cy + 25, 18, 5, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Fresh herbs
      ctx.fillStyle = '#15803D';
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const dist = 30;
        ctx.beginPath();
        ctx.ellipse(cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, 6, 2.5, a, 0, Math.PI * 2);
        ctx.fill();
      }

      // Glistening Schmaltz Droplets
      const droplets = [
        { x: -28, y: -20, r: 5 },
        { x: 30, y: -25, r: 7 },
        { x: -10, y: -45, r: 4 },
        { x: 35, y: 15, r: 6 },
        { x: -35, y: 25, r: 5 },
        { x: 5, y: -15, r: 8 },
        { x: -15, y: 40, r: 4 }
      ];

      droplets.forEach((d) => {
        const dx = cx + d.x + Math.sin(frame * 0.03 + d.r) * 1.5;
        const dy = cy + d.y + Math.cos(frame * 0.03 + d.r) * 1.5;

        ctx.beginPath();
        ctx.arc(dx, dy, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.8)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Highlight
        ctx.beginPath();
        ctx.arc(dx - d.r * 0.3, dy - d.r * 0.3, d.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      // Cracked Black Pepper
      ctx.fillStyle = '#1C1917';
      const peppers = [
        [-10, 0], [12, -8], [-5, 15], [20, 25], [-22, -12], [8, -32]
      ];
      peppers.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(cx + px, cy + py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Interactive Hover Ripple Effect
      if (rippleRef.current.active) {
        rippleRef.current.r += 2.5;
        ctx.beginPath();
        ctx.arc(rippleRef.current.x, rippleRef.current.y, rippleRef.current.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(254, 240, 138, ${Math.max(0, 0.7 - rippleRef.current.r / 70)})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (rippleRef.current.r > 70) {
          rippleRef.current.active = false;
        }
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [soupId]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvasRef.current.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
    rippleRef.current = { x, y, r: 4, active: true };
  };

  const dim = size === 'sm' ? 140 : size === 'lg' ? 260 : 200;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="interactive-soup-target relative rounded-full overflow-hidden shrink-0 select-none cursor-pointer group"
      style={{
        width: dim,
        height: dim,
        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.8), 0 0 20px -2px rgba(217, 119, 6, 0.25)'
      }}
    >
      <canvas
        ref={canvasRef}
        width={dim * 1.5}
        height={dim * 1.5}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      {/* Soft Steam Shimmer overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-amber-200/5 to-white/10 opacity-70 pointer-events-none group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
