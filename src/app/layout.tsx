import './globals.css';
import 'lenis/dist/lenis.css';
import { ReactLenis } from 'lenis/react';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="bg-black text-[#f5f5f7] antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Noto+Serif+SC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}