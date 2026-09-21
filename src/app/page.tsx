'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

/* ── seeded random ───────────────────────────────────────────── */
function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

function mulberry32(a: number) {
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Five Elements palette ───────────────────────────────────── */
const ELEMENTS = [
  { label: '木', color: '#4f7f4a', glow: 'rgba(79,127,74,0.12)' },
  { label: '火', color: '#c05a48', glow: 'rgba(192,90,72,0.12)' },
  { label: '土', color: '#8a7a4a', glow: 'rgba(138,122,74,0.12)' },
  { label: '金', color: '#7a7a7a', glow: 'rgba(122,122,122,0.12)' },
  { label: '水', color: '#4a6f8a', glow: 'rgba(74,111,138,0.12)' },
];

/* ── brush helpers ───────────────────────────────────────────── */
function strokePts(
  ctx: CanvasRenderingContext2D,
  rng: () => number,
  pts: number[][],
  o: { w?: number; alpha?: number; color?: string; passes?: number; close?: boolean; wob?: number } = {},
) {
  const { w = 5, passes = 2, wob = 3, color = '#2c2a25', alpha = 0.9, close = false } = o;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let p = 0; p < passes; p++) {
    ctx.globalAlpha = alpha * (p ? 0.4 : 1);
    ctx.lineWidth = Math.max(1, w * (0.7 + rng() * 0.6));

    const q = pts.map(pt => [pt[0] + (rng() - 0.5) * 2 * wob, pt[1] + (rng() - 0.5) * 2 * wob]);
    ctx.beginPath();
    ctx.moveTo(q[0][0], q[0][1]);
    for (let i = 1; i < q.length; i++) {
      const a = q[i - 1], b = q[i];
      ctx.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    }
    const last = q[q.length - 1];
    ctx.lineTo(last[0], last[1]);
    if (close) ctx.closePath();
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function ellipsePts(cx: number, cy: number, rx: number, ry: number, n = 20, a0 = 0, a1 = Math.PI * 2) {
  const pts: number[][] = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + (a1 - a0) * i / n;
    pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return pts;
}

function polyFill(ctx: CanvasRenderingContext2D, rng: () => number, pts: number[][], color: string, alpha = 1) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

function blobFill(ctx: CanvasRenderingContext2D, rng: () => number, cx: number, cy: number, rx: number, ry: number, color: string, alpha = 1) {
  const pts = ellipsePts(cx, cy, rx, ry, 14).map(p => [
    p[0] + (rng() - 0.5) * 2 * rx * 0.07,
    p[1] + (rng() - 0.5) * 2 * ry * 0.07,
  ]);
  polyFill(ctx, rng, pts, color, alpha);
}

/* ── draw the 五行 wheel ─────────────────────────────────────── */
function drawWuXing(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  seedRng: () => number,
  mouseX: number,
  mouseY: number,
  phase: number,
  celebrating: boolean,
  jumpPhase: number,
) {
  const cx = w / 2, cy = h / 2;
  const r = Math.min(w, h) * 0.32;
  const rng = seedRng;

  // subtle ground line
  const groundY = cy + r * 1.55;
  const groundPts: number[][] = [];
  for (let i = 0; i <= 16; i++) {
    groundPts.push([(w * i) / 16, groundY + (rng() - 0.5) * 2 * 4]);
  }
  strokePts(ctx, rng, groundPts, { w: 3, wob: 2, alpha: 0.15, passes: 1 });

  // jump offset
  const jumpOff = celebrating ? -Math.sin(jumpPhase * Math.PI) * r * 0.35 : 0;

  // Mouse influence: slight shift
  const mdx = (mouseX / w - 0.5) * 2 * r * 0.06;
  const mdy = (mouseY / h - 0.5) * 2 * r * 0.06;

  // Draw the five elements in a pentagram
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2 + phase * 0.03;
    const ex = cx + Math.cos(angle) * r + mdx;
    const ey = cy + Math.sin(angle) * r * 0.9 + mdy + jumpOff;

    const elemR = r * 0.28;
    const el = ELEMENTS[i];

    // wobble based on seed
    const wob = 3 + (rng() * 4);

    // gentle breathing
    const breath = 1 + Math.sin(phase * 10 + i) * 0.04;
    const br = elemR * breath;

    // filled blob
    blobFill(ctx, rng, ex, ey, br, br, el.color, celebrating ? 0.35 : 0.22);
    // outline
    strokePts(ctx, rng, ellipsePts(ex, ey, br, br, 16), {
      w: 3.5 + (rng() * 1.5),
      wob,
      alpha: 0.7,
      passes: 2,
      color: el.color,
      close: true,
    });

    // label
    ctx.font = `${Math.round(br * 0.8)}px "Patrick Hand", "Noto Sans SC", cursive, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = el.color;
    ctx.globalAlpha = celebrating ? 0.8 : 0.55;
    ctx.fillText(el.label, ex, ey + 2);
    ctx.globalAlpha = 1;

    // connecting lines between adjacent elements
    if (i > 0) {
      const prevAngle = ((i - 1) / 5) * Math.PI * 2 - Math.PI / 2 + phase * 0.03;
      const px = cx + Math.cos(prevAngle) * r + mdx;
      const py = cy + Math.sin(prevAngle) * r * 0.9 + mdy + jumpOff;
      strokePts(ctx, rng, [[px, py], [ex, ey]], {
        w: 2,
        wob: 1.5,
        passes: 1,
        alpha: 0.12,
        color: '#2c2a25',
      });
    }
  }
}

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [celebrating, setCelebrating] = useState(false);
  const [jumpPhase, setJumpPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const phaseRef = useRef(0);
  const rngRef = useRef(() => Math.random());

  useEffect(() => { setMounted(true); }, []);

  // ── seed rng from name ──
  useEffect(() => {
    const seed = name.trim() || 'anonymous';
    rngRef.current = mulberry32(hashSeed(seed));
  }, [name]);

  // ── mouse tracking ──
  const handleMouseMove = useCallback((e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  // ── canvas draw loop ──
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      phaseRef.current += 0.016;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      if (!w || !h) { raf = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);

      // warm paper bg
      ctx.fillStyle = '#f2ecdd';
      ctx.fillRect(0, 0, w, h);

      drawWuXing(
        ctx, w, h,
        rngRef.current,
        mousePos.x * w, mousePos.y * h,
        phaseRef.current,
        celebrating,
        jumpPhase,
      );

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [mounted, mousePos, celebrating, jumpPhase]);

  // ── celebration on enter ──
  const handleEnter = () => {
    if (!name.trim()) return;
    setCelebrating(true);
    let t = 0;
    const jump = setInterval(() => {
      t += 0.04;
      setJumpPhase(t);
      if (t >= 1) {
        clearInterval(jump);
        // go to /app/ after celebration
        setTimeout(() => {
          router.push(`/app?name=${encodeURIComponent(name.trim())}`);
        }, 200);
      }
    }, 20);
  };

  if (!mounted) return null;

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: '#f2ecdd', color: '#2c2a25' }}
      onPointerMove={handleMouseMove}
    >
      {/* warm noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-multiply"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── title ── */}
      <h1
        className="relative z-10 tracking-[-0.02em] font-light text-center px-6"
        style={{
          fontFamily: '"Noto Serif SC", "Songti SC", serif',
          fontSize: 'clamp(22px, 4.5vw, 40px)',
          lineHeight: 1.2,
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <span className="opacity-40 text-[0.5em] block mb-1" style={{ fontFamily: '"Patrick Hand", "Noto Sans SC", cursive, sans-serif', letterSpacing: '0.15em' }}>欢迎来到</span>
        <span className="text-[#2c2a25] font-normal">源生万象</span>
      </h1>

      {/* ── interactive visual ── */}
      <div className="relative z-10 w-[min(70vw,380px)] aspect-square -my-6">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </div>

      {/* ── name input ── */}
      <div className="relative z-10 w-[min(60vw,300px)]">
        <div className="relative">
          <InputBoxCanvas seed={name || 'anonymous'} />
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
            placeholder="输入你的名字"
            maxLength={16}
            autoComplete="off"
            spellCheck={false}
            className="relative z-10 w-full h-11 bg-transparent border-none outline-none
              text-center text-[18px] tracking-[0.02em] text-[#2c2a25]
              placeholder:text-[#2c2a25]/25"
            style={{ fontFamily: '"Patrick Hand", "Noto Sans SC", cursive, sans-serif' }}
          />
        </div>
      </div>

      {/* ── enter button ── */}
      <button
        onClick={handleEnter}
        disabled={!name.trim() || celebrating}
        className="relative z-10 mt-5 text-[15px] font-medium tracking-[0.03em]
          text-[#2c2a25] disabled:opacity-20 disabled:cursor-not-allowed
          transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]
          flex items-center gap-1"
        style={{ fontFamily: '"Patrick Hand", "Noto Sans SC", cursive, sans-serif', opacity: name.trim() ? 1 : 0.3 }}
      >
        进入你的世界
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

/* Separate component for the sketchy input box */
function InputBoxCanvas({ seed }: { seed: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const draw = () => {
      const w = parent.clientWidth, h = parent.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);

      const rng = mulberry32(hashSeed(seed + ':box'));

      const m = 8;
      const overshoot = () => 3 + rng() * 8;

      const side = (x0: number, y0: number, x1: number, y1: number) => {
        const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
        const ux = dx / len, uy = dy / len;
        const o1 = overshoot(), o2 = overshoot();
        const sx = x0 - ux * o1, sy = y0 - uy * o1;
        const ex = x1 + ux * o2, ey = y1 + uy * o2;
        const n = Math.max(3, Math.round(len / 50));
        const pts: number[][] = [];
        for (let i = 0; i <= n; i++) {
          const t = i / n;
          pts.push([sx + (ex - sx) * t, sy + (ey - sy) * t]);
        }
        strokePts(ctx, rng, pts, { w: 3, wob: 2.5, color: '#2c2a25', passes: 2, alpha: 0.7 });
      };

      side(m, m + (rng() - 0.5) * 3, w - m, m + (rng() - 0.5) * 3);
      side(w - m + (rng() - 0.5) * 2, m, w - m + (rng() - 0.5) * 2, h - m);
      side(w - m, h - m + (rng() - 0.5) * 3, m, h - m + (rng() - 0.5) * 3);
      side(m + (rng() - 0.5) * 2, h - m, m + (rng() - 0.5) * 2, m);
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}