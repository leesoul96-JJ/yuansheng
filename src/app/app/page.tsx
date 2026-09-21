'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, Moon } from 'lucide-react';

export default function AppHomePage() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <section className="min-h-[60vh] flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <p className="hero-eyebrow hero hero-d1">源生万象 · YUANSHENG</p>
            <h1 className="display-text mb-6 text-balance hero hero-d2">
              探索你
              <br />
              内在的宇宙
            </h1>
            <p className="text-lg md:text-xl text-[#86868b] max-w-2xl leading-relaxed mb-10 hero hero-d3">
              融汇东方智慧与现代自我认知。
              <br />
              从你的出生星图出发，找到属于自己的人生坐标。
            </p>
            <div className="btn-group hero hero-d4">
              <Link href="/app/services" className="btn-primary">
                探索咨询服务 <ArrowRight size={16} />
              </Link>
              <Link href="/app/about" className="btn-secondary">
                了解源生万象
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PHILOSOPHY ══════ */}
      <section className="section-padding">
        <div className="section-container">
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

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Sparkles size={20} />, title: '认识自己', desc: '你的命盘揭示了天性的结构——你可以放大的优势，以及可以用觉知来驾驭的模式。' },
              { icon: <Compass size={20} />, title: '把握时机', desc: '人生有起有伏。有些年份适合耕耘，有些年份适合收获。知道什么时候做什么事。' },
              { icon: <Moon size={20} />, title: '顺应季节', desc: '每月、每日的指引帮助你感知微妙能量的流转——这些流转影响着你的心境、清晰度和机遇。' },
            ].map((item) => (
              <div key={item.title} className="clean-card">
                <div className="step-circle">{item.icon}</div>
                <h3 className="text-lg font-semibold text-[#f5f5f7] mb-3">{item.title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section className="section-padding border-t border-white/[0.06]">
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

      {/* ══════ MEMBERSHIP ══════ */}
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

      {/* ══════ PRODUCTS ══════ */}
      <section className="section-padding border-t border-white/[0.06]">
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

      {/* ══════ CTA ══════ */}
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
    </>
  );
}