'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    id: 'snapshot',
    label: '简易报告',
    price: '¥88 / $12',
    desc: '初探你的命盘格局。快速了解五行构成与基础特质，是了解源生万象服务的最佳入门选择。',
    popular: false,
  },
  {
    id: 'panorama',
    label: '人生全景报告',
    price: '¥666 / $100',
    desc: '全方位解读你的人生蓝图——财富格局、事业轨迹、关系动态。这是我们的核心服务。',
    popular: true,
  },
  {
    id: 'annual',
    label: '流年指引',
    price: '¥388 / $55',
    desc: '年度层面的走势分析。哪些季节宜行动，哪些季节宜静思，提前布局你的一年。',
    popular: false,
  },
  {
    id: 'monthly',
    label: '流月洞察',
    price: '¥88 / $12',
    desc: '聚焦未来一个月的能量流转。最适合在全景报告后附加使用，精准把握短期节奏。',
    popular: false,
  },
  {
    id: 'daily',
    label: '流日解惑',
    price: '¥33 / $5',
    desc: '一个具体问题，透过古典五行智慧的视角来回答。适合日常小决策参考。',
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero — CSS animation, no JS required */}
      <section className="min-h-[55vh] flex items-center pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div>
            <p className="hero-eyebrow hero hero-d1">咨询服务</p>
            <h1 className="display-text-sub mb-6 text-balance hero hero-d2">
              读懂你的
              <br />
              人生架构
            </h1>
            <p className="text-lg text-[#86868b] max-w-xl leading-relaxed hero hero-d3">
              每一项服务都始于你的出生星图——你与生俱来的生命蓝图。
              从那里出发，我们逐层叠加时间的维度：年、月、日。
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                id={s.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass-card relative ${s.popular ? 'md:col-span-2 lg:col-span-1 border-white/[0.12]' : ''}`}
              >
                {s.popular && (
                  <div className="absolute -top-3 right-5 px-4 py-1 bg-[#f5f5f7] text-black text-[10px] font-semibold tracking-[0.05em] uppercase rounded-full">
                    推荐
                  </div>
                )}
                <h3 className="text-lg font-semibold text-[#f5f5f7] mb-2">{s.label}</h3>
                <p className="text-sm font-medium text-[#6e6e73] mb-4">{s.price}</p>
                <p className="text-sm text-[#86868b] leading-relaxed mb-6">{s.desc}</p>
                <Link
                  href="/app/contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#86868b] hover:text-[#f5f5f7] transition-colors duration-300"
                >
                  咨询详情 →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="pb-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 pt-28">
          <div>
            <p className="section-label">流程</p>
            <h2 className="section-title mb-14">一次咨询如何完成</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: '提供出生信息', desc: '出生日期、时间、地点——我们需要的全部信息。' },
              { step: '02', title: '绘制生命蓝图', desc: 'AI 辅助排盘，结合古典方法核对，生成你的命盘。' },
              { step: '03', title: '接收解读报告', desc: '一份详细的文字分析报告，48 小时内交付。' },
              { step: '04', title: '对话深化理解', desc: '一周内的私信对话，探讨报告中的共鸣与疑问。' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="step-circle">{item.step}</div>
                <h3 className="text-base font-semibold text-[#f5f5f7] mb-2">{item.title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}