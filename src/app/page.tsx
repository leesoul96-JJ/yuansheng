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

  useEffect(() => { setMounted(true); }, []);

  const handleEnter = () => {
    if (!name.trim()) return;
    setUserName(name);
    setTimeout(() => {
      crystalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEnter();
  };

  return (
    <div className="relative">
      {/* ═══════════ HERO (100dvh) ═══════════ */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: '100dvh', minHeight: 600 }}
      >
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200,120,58,0.06) 0%, rgba(120,80,180,0.03) 40%, transparent 60%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
          />
        </div>

        {/* fine grain */}
        {mounted && (
          <div
            className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />
        )}

        {/* floating particles */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${(i * 17.3 + 5) % 100}%`,
                  top: `${(i * 13.7 + 8) % 100}%`,
                  width: `${1.5 + (i % 3) * 0.5}px`,
                  height: `${1.5 + (i % 3) * 0.5}px`,
                  opacity: 0.1 + (i % 5) * 0.04,
                  background: i % 3 === 0 ? 'rgba(200,120,58,0.4)' : 'rgba(255,255,255,0.25)',
                  animation: `particle-float ${18 + (i % 7) * 4}s ease-in-out ${(i * 0.7) % 8}s infinite`,
                  '--dx': `${(i % 5 - 2) * 40}px`,
                  '--dy': `${(i % 4 - 2) * 40}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* center content */}
        <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-lg">
          {/* brand */}
          <div
            className="text-center mb-10"
            style={{ animation: mounted ? 'hero-rise 1.2s cubic-bezier(.16,1,.3,1) forwards' : 'none', opacity: 0 }}
          >
            <h1 className="text-white/90 leading-[1.1]">
              <span
                className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                源生
              </span>
              <span
                className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-1 sm:mt-2"
                style={{ letterSpacing: '-0.04em' }}
              >
                万象
              </span>
            </h1>
            <p className="text-white/[0.15] text-[11px] sm:text-xs mt-4 tracking-[.18em] uppercase">
              ORIGIN INSIGHT
            </p>
          </div>

          {/* name input */}
          <div
            className="flex flex-col items-center gap-5 w-full"
            style={{ animation: mounted ? 'hero-rise 1.2s 0.2s cubic-bezier(.16,1,.3,1) forwards' : 'none', opacity: 0 }}
          >
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的名字"
                maxLength={20}
                autoComplete="off"
                className="w-full h-12 bg-white/[0.03] border border-white/[0.08] rounded-full
                  text-white text-[14px] text-center tracking-[.02em]
                  placeholder:text-white/15 outline-none
                  transition-all duration-400
                  focus:border-[#c8783a]/40 focus:bg-white/[0.05]
                  hover:border-white/[0.15]"
              />
            </div>

            <button
              onClick={handleEnter}
              disabled={!name.trim()}
              className="group inline-flex items-center gap-2.5
                bg-[#c8783a] hover:bg-[#a86028] active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed
                text-white text-[15px] font-medium
                px-9 py-3.5 rounded-full
                transition-all duration-300"
            >
              进入源生万象
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* scroll hint */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ animation: mounted ? 'hero-rise 1.2s 0.6s cubic-bezier(.16,1,.3,1) forwards' : 'none', opacity: 0 }}
          >
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/[0.06] to-transparent animate-scroll-pulse" />
          </div>
        </div>
      </section>

      {/* ═══════════ CRYSTAL SECTION ═══════════ */}
      {userName && (
        <section ref={crystalRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50vmin] h-[50vmin] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(200,120,58,0.05) 0%, transparent 50%)' }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-xl text-center">
            {/* greeting */}
            <div className="mb-4 animate-crystal-reveal">
              <p className="text-[13px] text-white/20 tracking-[.2em] uppercase mb-2 font-playfair italic">
                欢迎，{userName}
              </p>
              <h2 className="font-playfair italic text-2xl sm:text-3xl md:text-4xl text-white/60 font-normal leading-tight">
                你的源生水晶
              </h2>
              <h2 className="font-playfair italic text-2xl sm:text-3xl md:text-4xl text-white/60 font-normal leading-tight -mt-0.5">
                已凝结
              </h2>
            </div>

            {/* crystal */}
            <div className="w-full animate-crystal-reveal" style={{ animationDelay: '0.15s' }}>
              <Crystal name={userName} />
            </div>

            {/* attribution */}
            <p className="mt-4 text-[11px] text-white/[0.05] tracking-[.15em] uppercase animate-crystal-reveal" style={{ animationDelay: '0.3s' }}>
              源于五行 · 独一无二
            </p>

            {/* scroll down hint */}
            <div className="mt-8 animate-crystal-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-[1px] h-8 bg-gradient-to-b from-white/[0.04] to-transparent animate-scroll-pulse" />
                <p className="text-[10px] text-white/[0.05] tracking-[.2em] uppercase">scroll to explore</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ PHILOSOPHY ═══════════ */}
      {userName && (
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
      )}

      {/* ═══════════ SERVICE PREVIEW ═══════════ */}
      {userName && (
        <section className="section-padding border-t border-white/[0.04]">
          <div className="section-container">
            <p className="section-label">咨询服务</p>
            <h2 className="section-title mb-14 text-balance">
              从入门到全景，
              <br />
              找到适合你的深度。
            </h2>

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
      )}

      {/* ═══════════ MEMBERSHIP ═══════════ */}
      {userName && (
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-2xl mx-auto text-center">
              <p className="section-label">会员计划</p>
              <h2 className="section-title text-balance">
                全年指引，
                <br />
                提前为你绘制
              </h2>
              <p className="section-subtitle mx-auto mb-8">
                每月一份五行运势报告、无限次文字问答、季节性深度解读——
                全年伴随你走过每一个能量转换的时刻。
              </p>
              <Link href="/app/membership" className="btn-secondary">$400/年 · $40/月</Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ PRODUCTS ═══════════ */}
      {userName && (
        <section className="section-padding border-t border-white/[0.04]">
          <div className="section-container">
            <p className="section-label">精选好物</p>
            <h2 className="section-title mb-14 text-balance">
              承载心念之物，
              <br />
              让智慧触手可及
            </h2>
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
      )}

      {/* ═══════════ CTA ═══════════ */}
      {userName && (
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="display-text-sub mb-8 text-balance">
                准备好探索
                <br />
                你的生命蓝图了吗？
              </h2>
              <Link href="/app/contact" className="btn-primary">从一份简易报告开始</Link>
            </div>
          </div>
        </section>
      )}

      {/* KEYFRAMES */}
      <style>{`
        @keyframes hero-rise {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes crystal-reveal {
          0% { opacity: 0; transform: scale(0.95) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes particle-float {
          0% { transform: translate(0, 0); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
        }
        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
          50% { opacity: 0.8; transform: scaleY(1); }
        }
        .animate-crystal-reveal {
          animation: crystal-reveal 1.2s cubic-bezier(.16,1,.3,1) forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}