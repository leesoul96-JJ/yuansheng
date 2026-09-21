import './globals.css';
import 'lenis/dist/lenis.css';
import { ReactLenis } from 'lenis/react';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="bg-black text-[#f5f5f7] antialiased">
      <body className="min-h-screen">
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}