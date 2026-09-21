import './globals.css';
import 'lenis/dist/lenis.css';
import { ReactLenis } from 'lenis/react';
import { Patrick_Hand, Noto_Serif_SC } from 'next/font/google';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-patrick',
});

const notoSerifSC = Noto_Serif_SC({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif-sc',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`bg-black text-[#f5f5f7] antialiased ${patrickHand.variable} ${notoSerifSC.variable}`}>
      <body className="min-h-screen">
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}