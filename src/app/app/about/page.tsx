'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <>
      {/* Hero — CSS animation */}
      <section className="min-h-[55vh] flex items-center pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div>
            <p className="hero-eyebrow hero hero-d1">关于</p>
            <h1 className="display-text mb-6 hero hero-d2">
              源生万象
            </h1>
            <p className="section-subtitle hero hero-d3">
              从源头而生，万象由此展开。
              <br />
              一个融合古典东方智慧与现代自我认知的品牌。
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="divider-line" />
              <h2 className="text-2xl font-semibold text-[#f5f5f7] mb-6 tracking-tight">名字的意义</h2>
              <div className="space-y-5 text-sm text-[#86868b] leading-relaxed">
                <p><span className="font-medium text-[#f5f5f7]">源</span>（yuán）—— 源头、源泉。万物从此流出的本源。</p>
                <p><span className="font-medium text-[#f5f5f7]">生</span>（shēng）—— 出生、生长。生命从源头涌现。</p>
                <p><span className="font-medium text-[#f5f5f7]">万象</span>（wàn xiàng）—— 万物万象。一切形式、一切模式、一切生灭。</p>
                <p className="pt-2 italic text-[#f5f5f7]">从源头而生，万象由此展开。</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="divider-line" />
              <h2 className="text-2xl font-semibold text-[#f5f5f7] mb-6 tracking-tight">我们的理念</h2>
              <div className="space-y-5 text-sm text-[#86868b] leading-relaxed">
                <p>
                  源生万象根植于古典中国的五行循环时间观——这是一套描述能量在年、季、月、日中流动节律的系统。
                </p>
                <p>
                  这不是算命。这是一套理解你与生俱来的天性模式以及你所经历的人生时机的框架。
                </p>
                <p>
                  我们从你的出生信息出发，为你绘制个人命盘。我们的产品旨在成为你内在洞察的物理锚点。
                  我们的会员则为你提供穿越每一个季节的持续陪伴。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}