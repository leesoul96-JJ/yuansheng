'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/membership', label: 'Membership' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border-subtle'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-gold/60 flex items-center justify-center rotate-45 group-hover:rotate-[135deg] transition-transform duration-700">
            <div className="w-3 h-3 bg-gold -rotate-45" />
          </div>
          <div>
            <div className="text-sm font-medium tracking-[0.15em] text-text-primary uppercase">
              YUANSHENG
            </div>
            <div className="text-[10px] tracking-[0.2em] text-text-muted uppercase">
              源生万象
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                pathname === l.href
                  ? 'text-gold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary text-xs !px-6 !py-2.5"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-primary"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-primary/98 backdrop-blur-xl border-b border-border-subtle">
          <nav className="flex flex-col px-6 pb-8 pt-4 gap-5">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase ${
                  pathname === l.href ? 'text-gold' : 'text-text-secondary'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary text-xs text-center mt-4"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}