import Link from 'next/link';

const products = [
  {
    name: 'Five Elements Incense',
    tagline: '木 · 火 · 土 · 金 · 水',
    desc: 'Hand-blended incense sticks aligned to each element. Burn the one whose energy you need to invite.',
    price: '¥168 / $24',
    status: 'Pre-order',
  },
  {
    name: 'Ritual Candle — Solstice',
    tagline: 'Stillness & clarity',
    desc: 'Soy wax candle infused with cedar, clary sage, and a trace of amber. 60+ hours burn time.',
    price: '¥288 / $40',
    status: 'Pre-order',
  },
  {
    name: 'Crystal Prism Bracelet',
    tagline: 'Wear your intention',
    desc: 'Hand-knotted natural stones selected by elemental correspondence. Each piece is unique.',
    price: '¥388 / $55',
    status: 'Pre-order',
  },
  {
    name: 'Pendant — Compass',
    tagline: 'Direction, suspended',
    desc: 'A brushed-brass and nephrite pendant inscribed with the five elemental markers.',
    price: '¥488 / $70',
    status: 'Pre-order',
  },
  {
    name: 'Five Elements Monthly Calendar',
    tagline: 'Track the seasons within',
    desc: 'Wall calendar showing lunar phases, elemental transits, and auspicious timing markers. Designed in-house.',
    price: '¥128 / $18',
    status: 'Pre-order',
  },
  {
    name: 'Bangle — Origin',
    tagline: 'The source at your wrist',
    desc: 'Polished walnut wood and sterling silver bangle. Engraved inner band.',
    price: '¥588 / $85',
    status: 'Pre-order',
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">Products</p>
          <h1 className="section-title mb-6">
            Objects that carry
            <br />
            <span className="text-gold">intention</span>
          </h1>
          <p className="section-subtitle">
            Each product is designed to be a physical anchor for the insights
            you gain in your reading. Not decoration — ritual.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.name}
                className="card-hover border border-border-subtle bg-bg-card/30 p-8 flex flex-col"
              >
                {/* Bauhaus placeholder for product image */}
                <div className="aspect-square mb-6 bg-gradient-to-br from-teal/10 to-gold/5 border border-border-subtle flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto border border-gold/30 flex items-center justify-center rotate-45 mb-3">
                      <div className="w-4 h-4 bg-gold/30 -rotate-45" />
                    </div>
                    <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase">
                      Coming Soon
                    </p>
                  </div>
                </div>

                <p className="text-[10px] tracking-[0.2em] text-gold mb-2">
                  {p.status}
                </p>
                <h3 className="text-lg font-medium text-text-primary mb-1">
                  {p.name}
                </h3>
                <p className="text-xs text-teal-light/70 italic mb-3">
                  {p.tagline}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                  {p.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.15em] text-text-muted">
                    {p.price}
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors duration-300"
                  >
                    Notify Me →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}