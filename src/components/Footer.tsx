import Link from 'next/link';

const footerSections = [
  {
    title: 'Navigate',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Products', href: '/products' },
      { label: 'Membership', href: '/membership' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Life Panorama', href: '/services#panorama' },
      { label: 'Annual Guide', href: '/services#annual' },
      { label: 'Monthly Insight', href: '/services#monthly' },
      { label: 'Daily Wisdom', href: '/services#daily' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'hello@yuansheng.co', href: 'mailto:hello@yuansheng.co' },
      { label: 'Instagram', href: '#' },
      { label: '小红书', href: '#' },
      { label: 'WeChat', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle">
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-gold/30 via-transparent to-teal/30" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 border border-gold/50 flex items-center justify-center rotate-45">
                <div className="w-2.5 h-2.5 bg-gold -rotate-45" />
              </div>
              <div>
                <div className="text-xs font-medium tracking-[0.15em] text-text-primary uppercase">
                  YUANSHENG
                </div>
                <div className="text-[9px] tracking-[0.2em] text-text-muted uppercase">
                  源生万象
                </div>
              </div>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              From the source, all phenomena arise. Ancient wisdom for modern
              self-discovery.
            </p>
            {/* Bauhaus decorative element */}
            <div className="flex gap-2 mt-6">
              <div className="w-4 h-4 rounded-full border border-teal/40" />
              <div className="w-4 h-4 border border-gold/40" />
              <div className="w-4 h-4 rounded-full bg-gold/10" />
            </div>
          </div>

          {footerSections.map((s) => (
            <div key={s.title}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-5">
                {s.title}
              </h4>
              <ul className="space-y-3">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} YUANSHENG &middot; 源生万象
          </p>
          <p className="text-xs text-text-muted tracking-[0.1em]">
            ORIGIN INSIGHT
          </p>
        </div>
      </div>
    </footer>
  );
}