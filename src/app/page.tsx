'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EntryPage() {
  const [name, setName] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const handleEnter = () => {
    const q = name.trim() ? `?name=${encodeURIComponent(name.trim())}` : '';
    router.push(`/app${q}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEnter();
  };

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ height: '100dvh' }}>
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, #c8783a 0%, transparent 60%)',
        }}
      />

      {/* Fine grain noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Floating particles (CSS only) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 1 + Math.random() * 2,
                height: 1 + Math.random() * 2,
                animation: `particle-drift ${12 + Math.random() * 16}s ease-in-out ${Math.random() * 10}s infinite`,
                '--dx': `${(Math.random() - 0.5) * 100}px`,
                '--dy': `${(Math.random() - 0.5) * 100}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Brand */}
        <div
          className="text-center mb-8"
          style={{
            animation: mounted ? 'brand-enter 1.2s cubic-bezier(.16,1,.3,1) forwards' : 'none',
            opacity: 0,
          }}
        >
          <h1 className="text-white leading-none">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              源生
            </span>
            <span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl -mt-3 sm:-mt-4 md:-mt-5"
              style={{ letterSpacing: '-0.06em' }}
            >
              万象
            </span>
          </h1>
          <p
            className="text-white/25 text-[13px] sm:text-sm mt-5 tracking-[.15em] uppercase"
            style={{ letterSpacing: '0.12em' }}
          >
            ORIGIN &middot; INSIGHT
          </p>
        </div>

        {/* Name input */}
        <div
          className="flex flex-col items-center gap-5 w-full max-w-[340px]"
          style={{
            animation: mounted ? 'brand-enter 1.2s 0.25s cubic-bezier(.16,1,.3,1) forwards' : 'none',
            opacity: 0,
          }}
        >
          <div className="relative w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你的名字"
              maxLength={20}
              autoComplete="off"
              className="w-full h-12 bg-white/[0.04] border border-white/[0.1] rounded-full
                text-white text-[14px] text-center tracking-[.02em]
                placeholder:text-white/20
                outline-none transition-all duration-300
                focus:border-[#c8783a]/50 focus:bg-white/[0.06]
                hover:border-white/[0.2]"
            />
          </div>

          <button
            onClick={handleEnter}
            className="group inline-flex items-center gap-2
              bg-[#c8783a] hover:bg-[#a86028] active:scale-[0.97]
              text-white text-[15px] font-medium
              px-9 py-3.5 rounded-full
              transition-all duration-300"
          >
            进入源生万象
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom hint */}
        <p
          className="absolute bottom-10 left-0 right-0 text-center text-white/[0.08] text-[10px] tracking-[.15em] uppercase"
          style={{
            animation: mounted ? 'brand-enter 1.2s 0.5s cubic-bezier(.16,1,.3,1) forwards' : 'none',
            opacity: 0,
          }}
        >
          感知你的本源 · 探索五行万象
        </p>

        {/* Decorative bottom line */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-[1px] bg-white/[0.08]"
          style={{
            animation: mounted ? 'brand-enter 1.2s 0.7s cubic-bezier(.16,1,.3,1) forwards' : 'none',
            opacity: 0,
          }}
        />
      </div>

      <style>{`
        @keyframes brand-enter {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes particle-drift {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-enter { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}