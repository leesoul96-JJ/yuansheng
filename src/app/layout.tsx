import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="bg-black text-[#f5f5f7] antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}