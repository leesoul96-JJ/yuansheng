'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// ── SVG Icons (thin stroke, same as Apple's native weight) ──

const LogoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 6.5v11" />
    <path d="M6.5 12h11" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7.5" cy="7.5" r="5" />
    <line x1="11.3" y1="11.3" x2="16" y2="16" />
  </svg>
);

const AccountIcon = () => (
  <svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="5.5" r="3" />
    <path d="M3 16c0-3.3 2.5-5 6-5s6 1.7 6 5" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
    <line x1="3.5" y1="3.5" x2="14.5" y2="14.5" />
    <line x1="14.5" y1="3.5" x2="3.5" y2="14.5" />
  </svg>
);

const MenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
    <line x1="2.5" y1="4.5" x2="15.5" y2="4.5" />
    <line x1="2.5" y1="9" x2="15.5" y2="9" />
    <line x1="2.5" y1="13.5" x2="15.5" y2="13.5" />
  </svg>
);

// ── nav items ──

const NAV_ITEMS = [
  { href: '/app', label: '首页' },
  { href: '/app/services', label: '命理' },
  { href: '/app/products', label: '洞察' },
  { href: '/app/membership', label: '人生' },
  { href: '/app/about', label: '关于' },
] as const;

const DESKTOP_NAV_GAP = 20; // px between Apple nav links

// ── component ──

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);

  // close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-11 bg-[#000000] will-change-transform">
      {/* Desktop nav */}
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-[18px] lg:px-[22px]">
        {/* Left: logo */}
        <Link
          href="/app"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 shrink-0"
          aria-label="源生万象"
        >
          <span className="text-white/80"><LogoIcon /></span>
          <span className="text-[12px] font-normal leading-none tracking-[-.01em] mt-[1px] text-white/80">
            源生万象
          </span>
        </Link>

        {/* Center: nav links (Apple style — evenly spaced, ~20px gap) */}
        <div className="hidden lg:flex items-center justify-center flex-1 h-full" style={{ gap: DESKTOP_NAV_GAP }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center h-full text-[12px] font-normal leading-none tracking-[-.12px] transition-colors duration-300 whitespace-nowrap"
              style={{
                color: pathname === item.href ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.7)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,.9)'; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = pathname === item.href ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.7)';
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: icons */}
        <div className="flex items-center shrink-0" style={{ gap: '20px' }}>
          <button
            onClick={() => setSearchOpen(true)}
            className="text-white/70 hover:text-white transition-colors duration-300 flex items-center"
            aria-label="搜索"
          >
            <SearchIcon />
          </button>
          <button
            className="text-white/70 hover:text-white transition-colors duration-300 hidden lg:flex items-center"
            aria-label="账户"
          >
            <AccountIcon />
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden text-white/80 hover:text-white transition-colors duration-300 flex items-center"
            aria-label="菜单"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Search overlay ── */}
      <div
        className={[
          'absolute top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-white/[.08]',
          'transition-all duration-300',
          searchOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <div className="max-w-[1200px] mx-auto px-5 h-11 flex items-center gap-3">
          <span className="text-white/50"><SearchIcon /></span>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search 源生万象…"
            className="flex-1 bg-transparent border-none outline-none text-[12px] text-white/90 placeholder:text-white/40"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="text-white/50 hover:text-white/80 transition-colors duration-300"
            aria-label="关闭搜索"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={[
          'lg:hidden fixed inset-0 top-11 bg-[#000000] z-40',
          'transition-all duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <nav className="flex flex-col px-6 pt-8 gap-0">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'py-3.5 text-[14px] border-b border-white/[.06] transition-colors duration-150',
                pathname === item.href ? 'text-white/90' : 'text-white/55',
              ].join(' ')}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8">
            <p className="text-[10px] text-white/40 tracking-[.06em] uppercase mb-3">Account</p>
            <Link href="/app/contact" className="block py-2.5 text-[13px] text-white/55">登录</Link>
            <Link href="/app/contact" className="block py-2.5 text-[13px] text-white/55">创建账户</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}