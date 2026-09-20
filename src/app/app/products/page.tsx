'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const products = [
  {
    name: '五行香',
    tagline: '木 · 火 · 土 · 金 · 水',
    desc: '手工调配的五行线香。根据当天所需的能量，点燃对应的一款。',
    price: '¥168 / $24',
    status: '预售',
  },
  {
    name: '香薰蜡烛 · 至静',
    tagline: '沉静与清明',
    desc: '大豆蜡手工蜡烛，融入雪松、快乐鼠尾草与琥珀香调。60+ 小时燃烧时长。',
    price: '¥288 / $40',
    status: '预售',
  },
  {
    name: '水晶手链 · 五行',
    tagline: '佩戴你的心意',
    desc: '根据五行对应关系手工串制的天然石手链。每一串都是独一无二的。',
    price: '¥388 / $55',
    status: '预售',
  },
  {
    name: '吊坠 · 罗盘',
    tagline: '方向的凝聚',
    desc: '黄铜拉丝与白玉髓吊坠，镌刻五行标识。日常佩戴，时刻提醒你与天地节律共振。',
    price: '¥488 / $70',
    status: '预售',
  },
  {
    name: '五行运势月历',
    tagline: '看见内在的季节',
    desc: '手绘月历，标注月相变化、五行流转与吉时提示。源生万象自研设计。',
    price: '¥128 / $18',
    status: '预售',
  },
  {
    name: '手镯 · 源初',
    tagline: '源头在你腕间',
    desc: '抛光胡桃木与纯银手镯。内圈刻有五行符记。',
    price: '¥588 / $85',
    status: '预售',
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero — CSS animation */}
      <section className="min-h-[50vh] flex items-center pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div>
            <p className="hero-eyebrow hero hero-d1">精选好物</p>
            <h1 className="display-text-sub mb-6 text-balance hero hero-d2">
              承载心念之物
            </h1>
            <p className="text-lg text-[#86868b] max-w-xl leading-relaxed hero hero-d3">
              每一件产品都是命盘解读的物理锚点——提醒你那些已经知道的智慧。不是装饰，是仪式。
            </p>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card flex flex-col"
              >
                <div className="img-placeholder mb-5">
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto mb-2">
                      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <circle cx="20" cy="20" r="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      </svg>
                    </div>
                    <p className="text-[10px] tracking-[0.1em] text-[#6e6e73]">即将上线</p>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-[#6e6e73] uppercase tracking-[0.08em] mb-2">{p.status}</p>
                <h3 className="text-lg font-semibold text-[#f5f5f7] mb-1">{p.name}</h3>
                <p className="text-xs text-[#6e6e73] italic mb-3">{p.tagline}</p>
                <p className="text-sm text-[#86868b] leading-relaxed mb-5 flex-1">{p.desc}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-sm font-medium text-[#f5f5f7]">{p.price}</span>
                  <Link href="/app/contact" className="text-sm font-medium text-[#86868b] hover:text-[#f5f5f7] transition-colors duration-300">
                    到货通知 →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}