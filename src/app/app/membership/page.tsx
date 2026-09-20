'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const perks = [
  '每月五行运势报告',
  '无限次文字问答（24 小时内回复）',
  '新品预售优先权',
  '会员专属内容和指南',
  '预约解读服务的优先通道',
];

export default function MembershipPage() {
  return (
    <>
      {/* Hero — CSS animation */}
      <section className="min-h-[50vh] flex items-center pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div>
            <p className="hero-eyebrow hero hero-d1">会员计划</p>
            <h1 className="display-text-sub mb-6 text-balance hero hero-d2">
              全年指引，
              <br />
              提前为你绘制
            </h1>
            <p className="text-lg text-[#86868b] max-w-xl leading-relaxed hero hero-d3">
              一整年的每月运势报告。每个月，你都会收到一份详细的五行能量分析——
              让你顺势而为，而非逆流而行。
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-md mx-auto"
          >
            <div className="glass-card p-10 md:p-12 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#6e6e73] mb-3">年度会员</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f7] mb-1 tracking-tight">
                $400
                <span className="text-base font-normal text-[#6e6e73]"> / 年</span>
              </h2>
              <p className="text-sm text-[#86868b] mb-1">或 <span className="font-medium text-[#f5f5f7]">$40/月</span></p>
              <p className="text-xs text-[#6e6e73] mb-10">随时取消</p>
              <ul className="text-left space-y-4 mb-10">
                {perks.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#86868b]">
                    <Check size={16} className="text-[#f5f5f7] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/app/contact" className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#f5f5f7] text-black font-medium rounded-full hover:opacity-85 transition-all duration-300">
                了解会员详情 <ArrowRight size={16} />
              </Link>
              <p className="text-[10px] text-[#6e6e73] mt-4">
                购买任一款解读服务，首月免费体验会员
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 pt-28">
          <div>
            <p className="section-label">会员权益</p>
            <h2 className="section-title mb-14">每个月，你能获得什么</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: '月度五行报告', desc: '当月能量如何影响你的命盘——哪些宫位被激活、哪些元素占主导、什么主题可能浮现。每月初准时送达。' },
              { title: '持续对话', desc: '人生不会等待下一次预约。随时发问，24 小时内得到深思熟虑的回应。不限次数。' },
              { title: '季节性深度解读', desc: '一年四次，针对即将到来的季节进行深入分析——关键日期、能量变化、大小决策的实际指引。' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card"
              >
                <div className="step-circle">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-base font-semibold text-[#f5f5f7] mb-3">{item.title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}