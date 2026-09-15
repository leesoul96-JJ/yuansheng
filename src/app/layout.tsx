import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BauhausBackground from '@/components/BauhausBackground';

export const metadata: Metadata = {
  title: 'YUANSHENG 源生万象 | Origin Insight — Ancient Wisdom for Modern Life',
  description:
    '源生万象 — From the source, all phenomena arise. Life panorama readings, yearly guidance, monthly insights, and premium ritual products grounded in classical Chinese wisdom.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-bg-primary text-text-primary antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans">
        <BauhausBackground />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}