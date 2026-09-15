import Link from 'next/link';

const services = [
  {
    id: 'snapshot',
    label: 'Quick Snapshot',
    price: '¥88 / $12',
    desc: 'A concise first glance at your natal chart. Ideal introduction to what YUANSHENG offers.',
    popular: false,
  },
  {
    id: 'panorama',
    label: 'Life Panorama',
    price: '¥666 / $100',
    desc: 'A full life-perspective reading covering wealth patterns, career trajectory, and relationship dynamics. The cornerstone service.',
    popular: true,
  },
  {
    id: 'annual',
    label: 'Annual Guidance',
    price: '¥388 / $55',
    desc: 'Year-level directional analysis — which seasons favour action, which call for reflection.',
    popular: false,
  },
  {
    id: 'monthly',
    label: 'Monthly Insight',
    price: '¥88 / $12',
    desc: 'A focused look at the month ahead. Best added to a Panorama or Annual reading.',
    popular: false,
  },
  {
    id: 'daily',
    label: 'Daily Wisdom',
    price: '¥33 / $5',
    desc: 'A single question, answered through the lens of classical cyclical wisdom.',
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] flex items-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">Services</p>
          <h1 className="section-title mb-6">
            Understand your
            <br />
            <span className="text-gold">life&apos;s architecture</span>
          </h1>
          <p className="section-subtitle mb-8">
            Every service begins with your natal chart — the blueprint you were born with.
            From there, we layer time: the year, the month, the day.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className={`card-hover relative p-8 border ${
                  s.popular
                    ? 'border-gold/40 bg-gold/5'
                    : 'border-border-subtle bg-bg-card/50'
                }`}
              >
                {s.popular && (
                  <div className="absolute -top-3 right-6 px-4 py-1 bg-gold text-bg-primary text-[10px] font-medium tracking-[0.15em] uppercase">
                    Recommended
                  </div>
                )}

                {/* Bauhaus dot */}
                <div className="w-2 h-2 rounded-full bg-gold/40 mb-6" />

                <h3 className="text-lg font-medium text-text-primary mb-2 tracking-tight">
                  {s.label}
                </h3>
                <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4">
                  {s.price}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {s.desc}
                </p>

                <Link
                  href="/contact"
                  className={`mt-6 inline-flex text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                    s.popular
                      ? 'text-gold hover:text-gold-light'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  Inquire →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">Process</p>
          <h2 className="section-title mb-12">How a reading works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Share your birth details', desc: 'Date, time, and place of birth — the only data we need.' },
              { step: '02', title: 'We chart your blueprint', desc: 'AI-assisted calculation of your natal chart, verified against classical method.' },
              { step: '03', title: 'You receive your report', desc: 'A detailed written analysis delivered within 48 hours.' },
              { step: '04', title: 'Follow up in dialog', desc: 'One week of private text dialog to explore what resonates and what questions remain.' },
            ].map((item) => (
              <div key={item.step} className="relative pl-8 border-l border-border-subtle">
                <span className="absolute -left-2.5 w-5 h-5 rounded-full border-2 border-gold/60 bg-bg-primary flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gold mb-2 block">
                  {item.step}
                </span>
                <h3 className="text-sm font-medium text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}