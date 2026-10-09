import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

export const AromaCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nextIdRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if pointer is fine (mouse, not touch screen)
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Spawn aroma particle if moved enough
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 6) {
        lastPosRef.current = { x: e.clientX, y: e.clientY };

        if (particlesRef.current.length < 25) {
          particlesRef.current.push({
            id: nextIdRef.current++,
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -0.6 - Math.random() * 0.8, // drifts upwards like warm steam
            size: 2.5 + Math.random() * 3.5,
            opacity: 0.45,
            hue: 35 + Math.random() * 10 // golden amber
          });
        }
      }

      // Check if hovering over buttons or soup elements
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.closest('.interactive-soup-target'))) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop for canvas aroma particles
    let animId: number;
    const updateCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particlesRef.current.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.opacity -= 0.014;
            p.size += 0.05;

            if (p.opacity > 0) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${p.hue}, 85%, 55%, ${Math.max(0, p.opacity)})`;
              ctx.fill();
            }
          });

          particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0);
        }
      }
      animId = requestAnimationFrame(updateCanvas);
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animId = requestAnimationFrame(updateCanvas);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        style={{ pointerEvents: 'none' }}
      />
      {/* Floating Golden Oil Droplet Cursor */}
      <div
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHoveringInteractive ? 1.4 : 1})`
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Subtle amber pulse */}
          <div className="absolute h-5 w-5 rounded-full bg-amber-500/30 blur-sm" />
          {/* Oil droplet shape */}
          <svg
            className="h-4 w-4 drop-shadow-[0_2px_8px_rgba(217,119,6,0.8)]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2.5C12 2.5 6 9.5 6 14.5C6 17.8137 8.68629 20.5 12 20.5C15.3137 20.5 18 17.8137 18 14.5C18 9.5 12 2.5 12 2.5Z"
              fill="url(#dropletGrad)"
              stroke="#FDE68A"
              strokeWidth="0.8"
            />
            {/* Highlight gleam */}
            <circle cx="10" cy="12" r="1.5" fill="#FFFBEB" opacity="0.8" />
            <defs>
              <linearGradient id="dropletGrad" x1="12" y1="2.5" x2="12" y2="20.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
};
