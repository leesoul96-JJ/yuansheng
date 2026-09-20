'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import WaterSphere from '@/components/WaterSphere';

// ── assets ──
const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const SPOTLIGHT_R = 240;

// ── helpers ──
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

const FIVE_ELEMENTS = [
  { label: '水', hint: 'Water · 深邃流动', hue: 210 },
  { label: '木', hint: 'Wood · 生长蔓延', hue: 140 },
  { label: '火', hint: 'Fire · 热烈升腾', hue: 15 },
  { label: '土', hint: 'Earth · 厚德载物', hue: 40 },
  { label: '金', hint: 'Metal · 凝结锐利', hue: 50 },
] as const;

function getElement(name: string) {
  if (!name.trim()) return FIVE_ELEMENTS[0];
  const idx = hashString(name.trim()) % FIVE_ELEMENTS.length;
  return FIVE_ELEMENTS[idx];
}

// ── component ──

export default function HomePage() {
  const [name, setName] = useState('');
  const [isExplored, setIsExplored] = useState(false);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(0);
  const elRef = useRef(getElement(''));

  const element = getElement(name);

  useEffect(() => { setMounted(true); }, []);

  // ── spotlight canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img2 = new Image();
    img2.crossOrigin = 'anonymous';
    img2.src = BG_IMAGE_2;

    let loaded = false;
    img2.onload = () => { loaded = true; };

    const c = canvas as HTMLCanvasElement;
    const cx = ctx as CanvasRenderingContext2D;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const mouse = mouseRef.current;
    const smooth = smoothRef.current;

    function draw() {
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      const w = window.innerWidth;
      const h = window.innerHeight;
      cx.clearRect(0, 0, w, h);

      if (loaded) {
        const iw = img2.naturalWidth;
        const ih = img2.naturalHeight;
        const scale = Math.max(w / iw, h / ih);
        const ox = (w - iw * scale) / 2;
        const oy = (h - ih * scale) / 2;

        cx.save();
        cx.beginPath();
        cx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
        cx.clip();
        cx.drawImage(img2, ox, oy, iw * scale, ih * scale);
        cx.restore();

        const grad = cx.createRadialGradient(
          smooth.x, smooth.y, SPOTLIGHT_R * 0.7,
          smooth.x, smooth.y, SPOTLIGHT_R
        );
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.7, 'rgba(255,255,255,0.03)');
        grad.addColorStop(1, 'rgba(255,255,255,0.12)');
        cx.fillStyle = grad;
        cx.beginPath();
        cx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
        cx.fill();

        const dotGrad = cx.createRadialGradient(
          smooth.x, smooth.y, 0,
          smooth.x, smooth.y, 20
        );
        dotGrad.addColorStop(0, 'rgba(255,220,180,0.06)');
        dotGrad.addColorStop(1, 'rgba(255,220,180,0)');
        cx.fillStyle = dotGrad;
        cx.beginPath();
        cx.arc(smooth.x, smooth.y, 20, 0, Math.PI * 2);
        cx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) { mouse.x = t.clientX; mouse.y = t.clientY; }
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  // ── particle dots (CSS-driven floating particles) ──
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      dur: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.25,
    }))
  );

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ height: '100dvh' }}>
      {/* Layer 1: Base image (Ken Burns zoom) */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${BG_IMAGE_1})`,
          animation: mounted ? 'none' : undefined,
        }}
      >
        {/* Ken Burns zoom via keyframes loaded after mount */}
        <style>{`
          @keyframes hero-zoom {
            0% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes hero-reveal {
            0% { opacity: 0; filter: blur(16px); transform: translateY(24px); }
            100% { opacity: 1; filter: blur(0); transform: translateY(0); }
          }
          @keyframes hero-fade {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes particle-drift {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
          }
          @keyframes sphere-enter {
            0% { opacity: 0; transform: scale(0.6); }
            100% { opacity: 1; transform: scale(1); }
          }
          .hero-zoom-in { animation: hero-zoom 1.8s cubic-bezier(.25,.1,.25,1) forwards; }
          .hero-reveal-in { animation: hero-reveal 1.2s cubic-bezier(.16,1,.3,1) forwards; }
          .hero-fade-in { animation: hero-fade 0.8s ease-out forwards; }
          @media (prefers-reduced-motion: reduce) {
            .hero-zoom-in { animation: none; }
            .hero-reveal-in { animation: none; }
            .hero-fade-in { animation: none; }
          }
        `}</style>
      </div>
      <div className="absolute inset-0 hero-zoom-in" style={{
        backgroundImage: `url(${BG_IMAGE_1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* Layer 2: Scrim gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/85 z-10" />

      {/* Layer 3: Spotlight canvas (reveals BG_IMAGE_2) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Layer 4: Ambient vignette / center glow for the sphere */}
      <div className="absolute inset-0 z-25 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 55% at 50% 45%, rgba(60,120,200,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Layer 5: Floating CSS particles */}
      <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0,
              '--dx': `${(Math.random() - 0.5) * 120}px`,
              '--dy': `${(Math.random() - 0.5) * 120}px`,
              animation: `particle-drift ${p.dur}s ease-in-out ${p.delay}s infinite`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Layer 6: Water Sphere */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div className="pointer-events-auto" style={{
          animation: mounted ? 'sphere-enter 1.4s cubic-bezier(.16,1,.3,1) forwards' : 'none',
          opacity: 0,
        }}>
          <WaterSphere name={name} className="w-[min(70vw,420px)] h-[min(70vw,420px)]" />
        </div>
      </div>

      {/* Layer 7: Text + UI overlay */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6 pointer-events-none">
        {/* Heading */}
        <div className="text-center mb-4 md:mb-6 pointer-events-auto">
          <h1 className="text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span
              className="block hero-reveal-in font-playfair italic font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ letterSpacing: '-0.04em', opacity: 0 }}
            >
              源生
            </span>
            <span
              className="block hero-reveal-in font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl -mt-2 sm:-mt-3"
              style={{
                letterSpacing: '-0.06em',
                opacity: 0,
                animationDelay: '0.18s',
                animationFillMode: 'forwards',
              } as React.CSSProperties}
            >
              万象
            </span>
          </h1>
        </div>

        {/* Name input + randomize */}
        <div className="flex flex-col items-center gap-4 pointer-events-auto hero-fade-in" style={{ opacity: 0, animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <div className="relative w-full max-w-[320px]">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入你的名字 · 生成专属本源"
              maxLength={20}
              className="w-full h-11 bg-white/[0.06] border border-white/[0.12] rounded-full
                text-white text-[13px] text-center
                placeholder:text-white/30
                outline-none focus:border-[#c8783a] focus:bg-white/[0.08]
                transition-all duration-300"
            />
          </div>

          {/* Element tag */}
          <div className="flex items-center gap-2 text-white/50 text-[11px] tracking-[.03em]">
            <span
              className="inline-block w-2 h-2 rounded-full transition-colors duration-500"
              style={{ backgroundColor: `hsl(${element.hue}, 50%, 50%)` }}
            />
            <span>本源 · {element.label} · {element.hint}</span>
          </div>

          {/* Enter button */}
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 bg-[#c8783a] hover:bg-[#a86028] active:scale-[0.97]
              text-white text-[15px] font-medium px-8 py-3.5 rounded-full
              transition-all duration-300 mt-2"
          >
            进入源生万象
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              className="ml-0.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Bottom hint */}
        <p
          className="absolute bottom-8 left-0 right-0 text-center text-white/20 text-[10px] tracking-[.08em] uppercase pointer-events-auto hero-fade-in"
          style={{ opacity: 0, animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          感知你的本源 · 探索五行万象
        </p>
      </div>
    </div>
  );
}