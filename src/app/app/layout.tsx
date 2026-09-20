import type { Metadata } from 'next';
import '../globals.css';
import 'lenis/dist/lenis.css';
import { ReactLenis } from 'lenis/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '源生万象｜YUANSHENG — 探索你内在的宇宙',
  description:
    '源生万象 — 融汇东方智慧与现代自我认知。八字咨询服务、五行好物、年度会员计划，帮助你找到属于自己的人生坐标。',
};

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="bg-black text-[#f5f5f7] antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen" style={{ fontFamily: "'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif" }}>
        <ReactLenis root>
          <Header />
          <main className="pt-11">{children}</main>
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}