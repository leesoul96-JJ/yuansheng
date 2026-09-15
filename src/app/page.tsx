import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-24">
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Bauhaus ornamental bar */}
          <div className="bauhaus-line mb-10 w-32" />

          <p className="section-label mb-6">YUANSHENG · 源生万象</p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight text-text-primary mb-8">
            From the source,
            <br />
            <span className="text-gold">all phenomena</span>
            <br />
            arise.
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed mb-12">
            Ancient cyclical wisdom for modern self-discovery. Life readings,
            elemental products, and a year-long membership — grounded in
            tradition, delivered for today.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/services" className="btn-primary">
              Explore Services <ArrowRight size={14} />
            </Link>
            <Link href="/about" className="btn-outline">
              About YUANSHENG
            </Link>
          </div>

          {/* Bauhaus decorative elements */}
          <div className="flex gap-4 mt-20">
            <div className="w-10 h-10 rounded-full border-2 border-teal/20" />
            <div className="w-10 h-10 border-2 border-gold/20" />
            <div className="w-10 h-10 rounded-full bg-gold/5" />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">Philosophy</p>
          <h2 className="section-title mb-8">
            Your natal chart is not a
            <br />
            <span className="text-gold">verdict</span> — it is a{' '}
            <span className="text-gold">blueprint</span>.
          </h2>
          <p className="section-subtitle mb-16">
            The classical Chinese cyclical model describes patterns of energy
            that repeat at every scale: years, seasons, months, days. Knowing
            where you sit in the cycle lets you stop fighting the current and
            start riding it.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                label: '01',
                title: 'Know Yourself',
                desc: 'Your natal chart reveals the architecture of your nature — strengths you can lean into and patterns you can navigate with awareness.',
              },
              {
                label: '02',
                title: 'Know Your Timing',
                desc: 'Every life moves through phases. Some years ask you to build; others ask you to harvest. Knowing which is which changes everything.',
              },
              {
                label: '03',
                title: 'Know Your Season',
                desc: 'Monthly and daily guidance keeps you aligned with the subtle shifts in energy that shape mood, clarity, and opportunity.',
              },
            ].map((item) => (
              <div key={item.label} className="relative pl-10 border-l border-border-subtle">
                <span className="absolute -left-3 text-xs text-gold font-mono">
                  {item.label}
                </span>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">Services</p>
          <h2 className="section-title mb-12">From snapshot to full panorama</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                label: 'Quick Snapshot',
                price: '¥88 / $12',
                desc: 'A concise first glance at your chart.',
              },
              {
                label: 'Life Panorama',
                price: '¥666 / $100',
                desc: 'Full life-perspective reading: wealth, career, relationships.',
                featured: true,
              },
              {
                label: 'Annual Guidance',
                price: '¥388 / $55',
                desc: 'Year-level directional analysis.',
              },
              {
                label: 'Monthly Insight',
                price: '¥88 / $12',
                desc: 'Focused look at the month ahead.',
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`p-6 card-hover ${
                  s.featured
                    ? 'border border-gold/30 bg-gold/5 md:col-span-2'
                    : 'border border-border-subtle bg-bg-card/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-medium text-text-primary mb-1">
                      {s.label}
                    </h3>
                    <p className="text-sm text-text-secondary">{s.desc}</p>
                  </div>
                  <span className="text-xs tracking-[0.15em] text-gold shrink-0 ml-4 whitespace-nowrap">
                    {s.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors duration-300"
          >
            View all services <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* Membership teaser */}
      <section className="py-32 relative">
        {/* Bauhaus decorative bar */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-gold/20 via-transparent to-teal/20" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-lg ml-auto md:ml-0 md:mx-auto text-center">
            <div className="bauhaus-line mb-8 w-24 mx-auto" />
            <p className="section-label mb-4">Membership</p>
            <h2 className="section-title mb-6">
              Your year,
              <br />
              <span className="text-gold">mapped in advance</span>
            </h2>
            <p className="section-subtitle mx-auto mb-8">
              A full year of monthly guidance, unlimited Q&A, and seasonal
              deep-dives. Move with the current.
            </p>
            <Link href="/membership" className="btn-outline">
              $400 / year · $40 / month
            </Link>
          </div>
        </div>
      </section>

      {/* Products teaser */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">Products</p>
          <h2 className="section-title mb-12">
            Objects that carry
            <br />
            <span className="text-gold">intention</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {['Incense', 'Candles', 'Crystals', 'Calendars'].map((cat) => (
              <div
                key={cat}
                className="aspect-square border border-border-subtle bg-bg-card/20 flex items-center justify-center card-hover"
              >
                <span className="text-xs tracking-[0.2em] uppercase text-text-muted">
                  {cat}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors duration-300"
          >
            View all products <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bauhaus-line mb-8 w-24 mx-auto" />
          <h2 className="section-title mb-6">
            Ready to understand
            <br />
            <span className="text-gold">your architecture?</span>
          </h2>
          <Link href="/contact" className="btn-primary">
            Start with a Quick Snapshot
          </Link>
        </div>
      </section>
    </>
  );
}