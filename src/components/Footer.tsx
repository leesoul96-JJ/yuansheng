import Link from 'next/link';

const footerSections = [
  {
    title: '导航',
    links: [
      { label: '咨询服务', href: '/app/services' },
      { label: '精选好物', href: '/app/products' },
      { label: '会员计划', href: '/app/membership' },
      { label: '关于我们', href: '/app/about' },
      { label: '联系我们', href: '/app/contact' },
    ],
  },
  {
    title: '咨询服务',
    links: [
      { label: '简易报告', href: '/app/services#snapshot' },
      { label: '全景报告', href: '/app/services#panorama' },
      { label: '流年指引', href: '/app/services#annual' },
      { label: '流月洞察', href: '/app/services#monthly' },
    ],
  },
  {
    title: '联系',
    links: [
      { label: 'hello@yuansheng.co', href: 'mailto:hello@yuansheng.co' },
      { label: 'Instagram', href: '#' },
      { label: '小红书', href: '#' },
      { label: '微信', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/app" className="flex flex-col mb-6">
              <span className="text-base font-semibold tracking-tight text-[#f5f5f7]">
                源生万象
              </span>
              <span className="text-[10px] tracking-[0.15em] text-[#6e6e73] uppercase">
                YUANSHENG
              </span>
            </Link>
            <p className="text-sm text-[#6e6e73] leading-relaxed max-w-xs">
              融汇东方智慧与现代自我认知，找到属于你的人生坐标。
            </p>
          </div>

          {footerSections.map((s) => (
            <div key={s.title}>
              <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-[#6e6e73] mb-5">
                {s.title}
              </h4>
              <ul className="space-y-3">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#86868b] hover:text-[#f5f5f7] transition-colors duration-300"
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
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6e6e73]">
            &copy; {new Date().getFullYear()} 源生万象 · YUANSHENG
          </p>
          <p className="text-xs text-[#6e6e73] tracking-[0.05em]">
            ORIGIN INSIGHT
          </p>
        </div>
      </div>
    </footer>
  );
}