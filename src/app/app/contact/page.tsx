'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const serviceOptions = [
  '简易报告（¥88）',
  '人生全景报告（¥666）',
  '流年指引（¥388）',
  '流月洞察（¥88）',
  '流日解惑（¥33）',
  '年度会员（$400/年）',
  '产品咨询',
  '其他',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero — CSS animation */}
      <section className="min-h-[50vh] flex items-center pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div>
            <p className="hero-eyebrow hero hero-d1">联系我们</p>
            <h1 className="display-text-sub mb-6 text-balance hero hero-d2">
              开启你的
              <br />
              探索之旅
            </h1>
            <p className="text-lg text-[#86868b] max-w-xl leading-relaxed hero hero-d3">
              还不确定从哪开始？留下你的信息，我们会在 24 小时内回复。
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.08em] text-[#6e6e73] mb-2">姓名</label>
                  <input type="text" required className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-white/[0.2] transition-colors duration-300" placeholder="你的名字" />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.08em] text-[#6e6e73] mb-2">邮箱</label>
                  <input type="email" required className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-white/[0.2] transition-colors duration-300" placeholder="you@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-[0.08em] text-[#6e6e73] mb-2">感兴趣的服务</label>
                <select className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#f5f5f7] focus:outline-none focus:border-white/[0.2] transition-colors duration-300 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                  }}
                >
                  <option value="">请选择</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-[0.08em] text-[#6e6e73] mb-2">出生信息（选填）</label>
                <input type="text" className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-white/[0.2] transition-colors duration-300" placeholder="出生日期、时间、地点（选填）" />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-[0.08em] text-[#6e6e73] mb-2">留言</label>
                <textarea rows={4} required className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-white/[0.2] transition-colors duration-300 resize-none" placeholder="告诉我你在寻找什么……" />
              </div>

              <button type="submit" className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#f5f5f7] text-black font-medium rounded-full hover:opacity-85 transition-all duration-300">
                <Send size={14} />
                {submitted ? '已发送' : '发送咨询'}
              </button>
            </form>

            {submitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-2xl bg-[#1a1a1a] border border-white/[0.08] text-center">
                <p className="text-sm text-[#f5f5f7] mb-1">感谢你的咨询。</p>
                <p className="text-xs text-[#86868b]">我会在 24 小时内回复。在此期间，欢迎继续浏览站内内容。</p>
              </motion.div>
            )}

            <div className="mt-16 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#6e6e73] mb-4">或直接联系我</p>
              <a href="mailto:hello@yuansheng.co" className="text-sm font-medium text-[#86868b] hover:text-[#f5f5f7] transition-colors duration-300">hello@yuansheng.co</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}