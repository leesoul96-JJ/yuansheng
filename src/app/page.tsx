'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Crystal from '@/components/Crystal';

export default function HomePage() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [mounted, setMounted] = useState(false);
  const crystalRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // ── mouse-reactive cursor glow ──
  useEffect(() => {
    if (!mounted) return;
    const hero = heroRef.current;
    if (!hero) return;
    const glow = hero.querySelector('.cursor-glow') as HTMLDivElement;
    if (!glow) return;

    let raf: number;
    let mx = 0, my = 0;
    let gx = 0, gy = 0;

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    const anim = () => {
      gx += (mx - gx) * 0.06;
      gy += (my - gy) * 0.06;
      glow.style.setProperty('--gx', `${gx}px`);
      glow.style.setProperty('--gy', `${gy}px`);
      raf = requestAnimationFrame(anim);
    };
    hero.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(anim);

    return () => {
      hero.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [mounted]);

  const handleEnter = () => {
    if (!name.trim()) return;
    setUserName(name);
    setTimeout(() => {
      crystalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  return (
    <div className="relative">
      {/* ══════ HERO ─ 欢迎来到源生万象 ══════ */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: '100dvh', minHeight: 580 }}
      >
        {/* cursor-following glow */}
        <div
          className="cursor-glow absolute top-0 left-0 w-[40vmax] h-[40vmax] rounded-full pointer-events-none opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #c8783a 0%, transparent 60%)',
            transform: 'translate(calc(var(--gx,0) - 50%), calc(var(--gy,0) - 50%))',
            transition: 'transform 0.1s',
          }}
        />

        {/* ambient bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[60vmin]"
            style={{
              background: 'radial-gradient(ellipse, rgba(200,120,58,0.04) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* fine dust */}
        {mounted && (
          <>
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
              }}
            />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 25 }, (_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${(i * 19.7 + 3) % 100}%`,
                    top: `${(i * 11.3 + 7) % 100}%`,
                    width: `${1 + (i % 3)}px`,
                    height: `${1 + (i % 3)}px`,
                    opacity: 0.08 + (i % 4) * 0.04,
                    background: i % 4 === 0 ? '#c8783a' : '#ffffff',
                    animation: `drift ${20 + (i % 6) * 5}s ease-in-out ${i * 0.5}s infinite`,
                    '--dx': `${(i % 7 - 3) * 30}px`,
                    '--dy': `${(i % 5 - 2) * 30}px`,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </>
        )}

        {/* ── center content ── */}
        <div className="relative z-10 flex flex-col items-center px-6 w-full">
          {/* main title */}
          <div
            className="text-center mb-8"
            style={{ animation: mounted ? 'rise 1.2s cubic-bezier(.16,1,.3,1) forwards' : 'none', opacity: 0 }}
          >
            <p className="text-white/15 text-[11px] tracking-[.18em] uppercase mb-4">欢迎来到</p>
            <h1 className="text-white/90 leading-[1.05]">
              <span className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                源生
              </span>
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-1">
                万象
              </span>
            </h1>
          </div>

          {/* tagline */}
          <p
            className="text-white/25 text-sm sm:text-base max-w-md text-center leading-relaxed mb-10"
            style={{ animation: mounted ? 'rise 1.2s 0.15s cubic-bezier(.16,1,.3,1) forwards' : 'none', opacity: 0 }}
          >
            这里可以讲述你的人生蓝图
            <br />
            也可以为你解开迷津
          </p>

          {/* name input */}
          <div
            className="flex flex-col items-center gap-4 w-full max-w-sm"
            style={{ animation: mounted ? 'rise 1.2s 0.3s cubic-bezier(.16,1,.3,1) forwards' : 'none', opacity: 0 }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
              placeholder="输入名字"
              maxLength={20}
              autoComplete="off"
              className="w-full h-11 bg-white/[0.03] border border-white/[0.08] rounded-full
                text-white text-[14px] text-center tracking-[.02em]
                placeholder:text-white/15 outline-none
                transition-all duration-400
                focus:border-[#c8783a]/40 focus:bg-white/[0.05]
                hover:border-white/[0.15]"
            />
            <button
              onClick={handleEnter}
              disabled={!name.trim()}
              className="group inline-flex items-center gap-2
                bg-[#c8783a] hover:bg-[#a86028] active:scale-[0.97] disabled:opacity-25 disabled:cursor-not-allowed
                text-white text-[15px] font-medium
                px-8 py-3 rounded-full
                transition-all duration-300"
            >
              进入你的世界
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* bottom flourish */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            style={{ animation: mounted ? 'rise 1.2s 0.6s cubic-bezier(.16,1,.3,1) forwards' : 'none', opacity: 0 }}
          >
            <div className="w-5 h-[1px] bg-white/[0.06]" />
          </div>
        </div>
      </section>

      {/* ══════ CRYSTAL ─ 输入名字后揭示 ══════ */}
      {userName && (
        <section ref={crystalRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50vmin] h-[50vmin] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(200,120,58,0.05) 0%, transparent 50%)' }}
            />
          </div>
          <div className="relative z-10 flex flex-col items-center w-full max-w-xl text-center">
            <div className="mb-4 animate-reveal">
              <p className="text-[13px] text-white/20 tracking-[.2em] uppercase mb-2 font-playfair italic">
                欢迎，{userName}
              </p>
              <h2 className="font-playfair italic text-2xl sm:text-3xl md:text-4xl text-white/60 font-normal leading-tight">
                你的源生水晶已凝结
              </h2>
            </div>
            <div className="w-full animate-reveal" style={{ animationDelay: '0.15s' }}>
              <Crystal name={userName} />
            </div>
            <p className="mt-4 text-[11px] text-white/[0.05] tracking-[.15em] uppercase animate-reveal" style={{ animationDelay: '0.3s' }}>
              源于五行 · 独一无二
            </p>
            <div className="mt-8 animate-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-[1px] h-8 bg-gradient-to-b from-white/[0.04] to-transparent animate-pulse-slow" />
                <p className="text-[10px] text-white/[0.05] tracking-[.2em] uppercase">scroll to explore</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════ PHILOSOPHY + CONTENT ══════ */}
      {userName && (
        <>
          <section className="section-padding border-t border-white/[0.04]">
            <div className="section-container">
              <div className="max-w-3xl">
                <p className="section-label">核心理念</p>
                <h2 className="section-title text-balance">
                  你的命盘不是宿命，
                  <br />
                  而是一张生命蓝图。
                </h2>
                <p className="section-subtitle mt-6 mb-16 max-w-xl">
                  古典五行学说描绘了能量在年、季、月、日中循环往复的节律。
                  知道你在周期中的位置，就能顺势而为，而非逆流而行。
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { num: '01', title: '认识自己', desc: '你的命盘揭示了天性的结构——你可以放大的优势，以及可以用觉知来驾驭的模式。' },
                  { num: '02', title: '把握时机', desc: '人生有起有伏。有些年份适合耕耘，有些年份适合收获。知道什么时候做什么事。' },
                  { num: '03', title: '顺应季节', desc: '每月、每日的指引帮助你感知微妙能量的流转——这些流转影响着你的心境、清晰度和机遇。' },
                ].map((item) => (
                  <div key={item.title} className="clean-card">
                    <div className="step-circle">{item.num}</div>
                    <h3 className="text-lg font-semibold text-[#f5f5f7] mb-3">{item.title}</h3>
                    <p className="text-sm text-[#86868b] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding border-t border-white/[0.04]">
            <div className="section-container">
              <p className="section-label">咨询服务</p>
              <h2 className="section-title mb-14 text-balance">从入门到全景，找到适合你的深度。</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {[
                  { title: '简易报告', price: '¥88 / $12', desc: '初探命盘，快速了解你的五行格局与基础特质。', featured: false },
                  { title: '人生全景报告', price: '¥666 / $100', desc: '人生全方位解读：财富格局、事业轨迹、关系动态——核心服务。', featured: true },
                  { title: '流年指引', price: '¥388 / $55', desc: '年度层面的走势分析——哪些季节宜行动，哪些宜静思。', featured: false },
                  { title: '流月洞察', price: '¥88 / $12', desc: '聚焦未来一个月的变化走势。适合在全景报告后附加。', featured: false },
                ].map((s) => (
                  <div key={s.title} className={`glass-card ${s.featured ? 'md:col-span-2 border-white/[0.12]' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-[#f5f5f7] mb-1">{s.title}</h3>
                        <p className="text-sm text-[#86868b]">{s.desc}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#f5f5f7] shrink-0 ml-4 whitespace-nowrap">{s.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/app/services" className="inline-flex items-center gap-2 text-sm font-medium text-[#86868b] hover:text-[#f5f5f7] transition-colors duration-300">
                查看全部服务 <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <section className="section-padding">
            <div className="section-container">
              <div className="max-w-2xl mx-auto text-center">
                <p className="section-label">会员计划</p>
                <h2 className="section-title text-balance">全年指引，提前为你绘制</h2>
                <p className="section-subtitle mx-auto mb-8">
                  每月一份五行运势报告、无限次文字问答、季节性深度解读——
                  全年伴随你走过每一个能量转换的时刻。
                </p>
                <Link href="/app/membership" className="btn-secondary">$400/年 · $40/月</Link>
              </div>
            </div>
          </section>

          <section className="section-padding border-t border-white/[0.04]">
            <div className="section-container">
              <p className="section-label">精选好物</p>
              <h2 className="section-title mb-14 text-balance">承载心念之物，让智慧触手可及</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
                {['五行香', '香薰蜡烛', '水晶手链', '运势月历'].map((cat) => (
                  <div key={cat} className="glass-card aspect-square flex items-center justify-center text-center p-6">
                    <span className="text-sm font-medium text-[#86868b]">{cat}</span>
                  </div>
                ))}
              </div>
              <Link href="/app/products" className="inline-flex items-center gap-2 text-sm font-medium text-[#86868b] hover:text-[#f5f5f7] transition-colors duration-300">
                查看全部产品 <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <section className="section-padding">
            <div className="section-container">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="display-text-sub mb-8 text-balance">准备好探索你的生命蓝图了吗？</h2>
                <Link href="/app/contact" className="btn-primary">从一份简易报告开始</Link>
              </div>
            </div>
          </section>
        </>
      )}

      <style>{`
        @keyframes rise { 0% { opacity:0; transform:translateY(16px); } 100% { opacity:1; transform:translateY(0); } }
        @keyframes reveal { 0% { opacity:0; transform:scale(0.93) translateY(10px); } 100% { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes drift { 0% { transform:translate(0,0); opacity:0; } 15% { opacity:1; } 85% { opacity:1; } 100% { transform:translate(var(--dx),var(--dy)); opacity:0; } }
        @keyframes pulse-slow { 0%,100% { opacity:0.3; transform:scaleY(0.5); } 50% { opacity:0.8; transform:scaleY(1); } }
        .animate-reveal { animation:reveal 1.2s cubic-bezier(.16,1,.3,1) forwards; opacity:0; }
      `}</style>
    </div>
  );
}