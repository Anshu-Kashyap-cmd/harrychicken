import React, { useEffect, useRef, useState } from 'react';
import { Phone, ArrowRight, Sparkles, MapPin, Clock, Flame, Award, HeartHandshake } from 'lucide-react';
import { BUSINESS_INFO } from '../data/soupData';

interface SteamParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  turbPhase: number;
}

interface SchmaltzDroplet {
  x: number;
  y: number;
  r: number;
  color: string;
  gleamAngle: number;
}

export const SteamPartingHero: React.FC<{
  onOpenOrderModal: () => void;
  onNavigateToSection: (sectionId: string) => void;
}> = ({ onOpenOrderModal, onNavigateToSection }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const steamCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const brothCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; prevX: number; prevY: number }>({
    x: -999,
    y: -999,
    active: false,
    prevX: -999,
    prevY: -999
  });
  
  const [steamDensity, setSteamDensity] = useState<'gentle' | 'simmering' | 'rich'>('rich');
  const [steamPartedCount, setSteamPartedCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [rippleTrigger, setRippleTrigger] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  // Schmaltz droplets static layout
  const dropletsRef = useRef<SchmaltzDroplet[]>([]);

  useEffect(() => {
    // Generate organic golden fat beads
    const droplets: SchmaltzDroplet[] = [];
    const count = 38;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 150;
      droplets.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        r: 3 + Math.random() * 12,
        color: Math.random() > 0.4 ? 'rgba(245, 158, 11, 0.85)' : 'rgba(217, 119, 6, 0.75)',
        gleamAngle: Math.random() * Math.PI * 2
      });
    }
    dropletsRef.current = droplets;
  }, []);

  // Broth rendering & fluid ripples
  useEffect(() => {
    const canvas = brothCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const renderBroth = () => {
      time += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const bowlRadius = Math.min(w, h) * 0.46;

      ctx.clearRect(0, 0, w, h);

      // 1. Dark Ceramic Outer Rim (Artisanal Stoneware)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, bowlRadius + 14, 0, Math.PI * 2);
      ctx.fillStyle = '#171412';
      ctx.fill();

      // Outer rim stoneware texture stroke
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#29231E';
      ctx.stroke();

      // Ember accent ring on pottery lip
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.stroke();

      // Inner bowl shadow
      ctx.beginPath();
      ctx.arc(cx, cy, bowlRadius, 0, Math.PI * 2);
      ctx.clip();

      // 2. Deep Liquid Gold Broth Gradient
      const brothGrad = ctx.createRadialGradient(
        cx - 20,
        cy - 30,
        20,
        cx,
        cy,
        bowlRadius
      );
      brothGrad.addColorStop(0, '#F59E0B'); // radiant center
      brothGrad.addColorStop(0.35, '#D97706'); // liquid gold
      brothGrad.addColorStop(0.75, '#92400E'); // rich slow-cooked depth
      brothGrad.addColorStop(1, '#451A03'); // deep amber shadow at bowl edge

      ctx.fillStyle = brothGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle simmer convection currents
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = '#FEF08A';
      for (let i = 0; i < 4; i++) {
        const offset = Math.sin(time + i * 1.5) * 14;
        ctx.beginPath();
        ctx.ellipse(cx + offset, cy + Math.cos(time * 0.8 + i) * 10, bowlRadius * 0.6, bowlRadius * 0.4, time * 0.1 + i, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 3. Submerged Ingredients: Pulled Chicken Meat Fibers
      ctx.save();
      ctx.globalAlpha = 0.72;
      // Chicken shreds cluster
      const shreds = [
        { x: -50, y: -20, len: 45, angle: 0.3 },
        { x: -30, y: 15, len: 60, angle: -0.2 },
        { x: 10, y: -35, len: 50, angle: 0.8 },
        { x: 25, y: 25, len: 40, angle: -0.5 },
        { x: -10, y: 40, len: 55, angle: 0.1 },
        { x: 60, y: -10, len: 35, angle: 0.6 }
      ];

      shreds.forEach((s) => {
        ctx.save();
        ctx.translate(cx + s.x, cy + s.y);
        ctx.rotate(s.angle);
        ctx.fillStyle = '#FEF3C7';
        ctx.beginPath();
        ctx.ellipse(0, 0, s.len / 2, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Shred fiber striations
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-s.len / 2 + 5, -2);
        ctx.lineTo(s.len / 2 - 5, -1);
        ctx.moveTo(-s.len / 2 + 8, 2);
        ctx.lineTo(s.len / 2 - 8, 2);
        ctx.stroke();
        ctx.restore();
      });
      ctx.restore();

      // 4. Fresh Floating Herbs (Rosemary needles & Thyme leaf clusters)
      ctx.save();
      // Herb twigs
      const herbs = [
        { x: -70, y: -60, angle: 0.5, type: 'rosemary' },
        { x: 65, y: -50, angle: -0.6, type: 'thyme' },
        { x: 40, y: 70, angle: 1.1, type: 'rosemary' },
        { x: -45, y: 75, angle: -0.9, type: 'thyme' }
      ];

      herbs.forEach((h) => {
        ctx.save();
        ctx.translate(cx + h.x, cy + h.y);
        ctx.rotate(h.angle + Math.sin(time + h.x) * 0.05);

        // Herb stem
        ctx.strokeStyle = '#14532D';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(20, 0);
        ctx.stroke();

        // Fresh leaves
        ctx.fillStyle = '#15803D';
        for (let l = -16; l <= 16; l += 8) {
          ctx.beginPath();
          ctx.ellipse(l, -5, 5, 2.5, 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(l, 5, 5, 2.5, -0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Cracked Black Pepper Granules
      ctx.fillStyle = '#1C1917';
      const pepperDots = [
        [-15, -45], [20, -60], [-55, 10], [5, 15], [35, -20],
        [-30, -15], [70, 30], [-60, -35], [25, 55], [-15, 60]
      ];
      pepperDots.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(cx + px, cy + py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 5. Glistening Schmaltz Droplets (Chicken Fat Beads with high specular glints)
      dropletsRef.current.forEach((d) => {
        const floatX = cx + d.x + Math.sin(time + d.r) * 3;
        const floatY = cy + d.y + Math.cos(time * 0.9 + d.r) * 3;

        // Droplet body
        ctx.save();
        ctx.beginPath();
        ctx.arc(floatX, floatY, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();

        // Subtle amber perimeter ring
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(253, 230, 138, 0.6)';
        ctx.stroke();

        // Specular glint (sunlight reflection on chicken fat)
        ctx.beginPath();
        ctx.arc(floatX - d.r * 0.35, floatY - d.r * 0.35, Math.max(1, d.r * 0.28), 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.restore();
      });

      // 6. Interactive Fluid Ripple on Click / Stir
      if (rippleTrigger.active) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(rippleTrigger.x, rippleTrigger.y, 45, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore(); // restore bowl clip

      animId = requestAnimationFrame(renderBroth);
    };

    renderBroth();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [rippleTrigger]);

  // Real-time Interactive Steam Parting Particle System
  useEffect(() => {
    const canvas = steamCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: SteamParticle[] = [];

    const densityMap = {
      gentle: 75,
      simmering: 130,
      rich: 200
    };

    const maxParticles = densityMap[steamDensity];

    const spawnParticle = (w: number, h: number): SteamParticle => {
      const cx = w / 2;
      const cy = h / 2;
      const bowlR = Math.min(w, h) * 0.42;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * bowlR;

      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist + 15,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.6 - Math.random() * 0.9, // rises upward
        radius: 12 + Math.random() * 26,
        alpha: 0,
        maxAlpha: 0.18 + Math.random() * 0.22,
        life: 0,
        maxLife: 100 + Math.random() * 80,
        turbPhase: Math.random() * 10
      };
    };

    const updateAndDrawSteam = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Populate particles
      while (particles.length < maxParticles) {
        particles.push(spawnParticle(w, h));
      }

      const mouse = mouseRef.current;
      const partingRadius = 90; // Cursor steam dispersion radius

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // Life cycle opacity fade-in then fade-out
        const progress = p.life / p.maxLife;
        if (progress < 0.25) {
          p.alpha = (progress / 0.25) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.25) / 0.75) * p.maxAlpha;
        }

        // Natural sinuous sway of rising vapor
        p.x += p.vx + Math.sin(p.turbPhase + p.life * 0.04) * 0.45;
        p.y += p.vy;
        p.radius += 0.2; // vapor expands as it rises

        // [INTERACTIVE STEAM PARTING PHYSICS]
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < partingRadius && dist > 0) {
            // Repulsive force pushes steam outward from cursor!
            const force = (1 - dist / partingRadius) * 4.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.alpha *= 0.35; // Dissipate opacity in direct touch zone

            setSteamPartedCount((prev) => prev + 1);
          }
        }

        // Render steam cloud puff
        if (p.alpha > 0.01) {
          ctx.save();
          const steamGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius
          );
          // Translucent white with faint golden warmth
          steamGrad.addColorStop(0, `rgba(254, 243, 199, ${p.alpha})`);
          steamGrad.addColorStop(0.5, `rgba(255, 255, 255, ${p.alpha * 0.65})`);
          steamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = steamGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Reset if dead or exited top
        if (p.life >= p.maxLife || p.y < -30) {
          particles[i] = spawnParticle(w, h);
        }
      }

      animId = requestAnimationFrame(updateAndDrawSteam);
    };

    updateAndDrawSteam();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [steamDensity]);

  // Handle canvas sizing and mouse events
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!steamCanvasRef.current) return;
    const rect = steamCanvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * steamCanvasRef.current.width;
    const y = ((e.clientY - rect.top) / rect.height) * steamCanvasRef.current.height;

    mouseRef.current = {
      x,
      y,
      active: true,
      prevX: mouseRef.current.x,
      prevY: mouseRef.current.y
    };

    if (!hasInteracted) setHasInteracted(true);
  };

  const handleMouseEnter = () => {
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleBowlClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!brothCanvasRef.current) return;
    const rect = brothCanvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * brothCanvasRef.current.width;
    const y = ((e.clientY - rect.top) / rect.height) * brothCanvasRef.current.height;

    setRippleTrigger({ x, y, active: true });
    setTimeout(() => {
      setRippleTrigger((prev) => ({ ...prev, active: false }));
    }, 450);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Moody Chiaroscuro Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft radial golden broth glow behind the bowl */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/6 w-[450px] h-[450px] bg-amber-800/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* LEFT COLUMN: Poetic Heritage Brand Narrative & High-Conversion CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          
          {/* Unboxed natural editorial kicker with status */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400/90">
            <span>Ancestral Healing</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Liquid Gold</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Samrala Chowk, Ludhiana</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Open Today: 10:30 am – 8:00 pm
            </span>
          </div>

          {/* Primary Cormorant Garamond Display Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium italic tracking-tight text-stone-100 font-serif leading-[1.12] text-balance">
            Best Chicken Soup in Ludhiana That Warms, Heals & Restores
          </h1>

          {/* Subheading explaining clear artisanal value */}
          <p className="text-base sm:text-lg text-stone-300 font-light max-w-2xl leading-relaxed tracking-wide">
            Slow-simmered for 12 continuous hours from free-range chicken marrow, whole ginger roots, cracked black pepper, and pure golden schmaltz. No starch powders, no bouillon cubes—only restorative ancestral vitality handcrafted near Green Land School Gate & Kdeep Hospital.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            {/* Primary CTA: Clickable Phone */}
            <a
              href="tel:08699436000"
              className="btn-matte-clay group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl text-amber-200 font-medium text-sm tracking-wide"
            >
              <Phone className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform duration-200" />
              <span className="whitespace-nowrap">Call Now: 086994 36000</span>
              <ArrowRight className="w-4 h-4 text-amber-400/70 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA: Free Quote / Online Pre-order */}
            <button
              onClick={onOpenOrderModal}
              className="btn-matte-clay-ghost inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-stone-200 hover:text-amber-300 font-medium text-sm tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="whitespace-nowrap">Get Free Quote / Order</span>
            </button>
          </div>

          {/* Quick Trust Strip - Unboxed cleanly */}
          <div className="pt-4 border-t border-stone-800/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-400">
            <div>
              <div className="text-amber-400 font-semibold font-serif text-base">12-Hour</div>
              <div>Slow Bone Extraction</div>
            </div>
            <div>
              <div className="text-amber-400 font-semibold font-serif text-base">100% Desi</div>
              <div>Natural Cartilage Collagen</div>
            </div>
            <div>
              <div className="text-amber-400 font-semibold font-serif text-base">Thermal Jars</div>
              <div>Delivered Piping Hot</div>
            </div>
            <div>
              <div className="text-amber-400 font-semibold font-serif text-base">2 Min Walk</div>
              <div>From Kdeep Hospital</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Interactive Steam Parting Ceramic Bowl Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            
            {/* Interactive Bowl Container with Organic Ceramic Rim */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleBowlClick}
              className="interactive-soup-target relative w-full h-full rounded-full cursor-crosshair select-none overflow-hidden ceramic-rim bg-stone-950 transition-all duration-300"
              style={{
                boxShadow: '0 0 0 4px #26211C, 0 0 0 7px #1C1917, 0 25px 60px -12px rgba(0,0,0,0.9), 0 0 45px -5px rgba(217, 119, 6, 0.3)'
              }}
            >
              {/* Layer 1: Procedural Liquid Gold Broth Canvas with Schmaltz & Herbs */}
              <canvas
                ref={brothCanvasRef}
                width={500}
                height={500}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Layer 2: Interactive Real-time WebGL/2D Steam Particle Vapor Overlay */}
              <canvas
                ref={steamCanvasRef}
                width={500}
                height={500}
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
              />

              {/* Gentle Ceramic Pottery Lip Overlay */}
              <div className="absolute inset-0 rounded-full pointer-events-none border border-amber-500/20 shadow-inner" />
            </div>

            {/* Hint & Interaction Guide Pill */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max max-w-[90%] text-center px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-600/30 backdrop-blur-md shadow-lg pointer-events-none">
              <p className="text-[11px] text-amber-200/90 font-light flex items-center justify-center gap-2">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>
                  {hasInteracted
                    ? 'Moving parts the vapor · Click to stir ripples'
                    : 'Interactive: Move cursor across bowl to part the steam'}
                </span>
              </p>
            </div>
          </div>

          {/* Steam Heat Controller */}
          <div className="mt-10 flex items-center gap-2 p-1 bg-stone-900/80 border border-stone-800 rounded-lg text-xs">
            <span className="text-stone-400 px-2 font-medium">Steam Simmer:</span>
            {(['gentle', 'simmering', 'rich'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSteamDensity(mode)}
                className={`px-3 py-1 rounded capitalize transition-colors ${
                  steamDensity === mode
                    ? 'bg-amber-600 text-stone-950 font-medium shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
