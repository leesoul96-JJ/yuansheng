import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <section className="min-h-[60vh] flex items-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">About</p>
          <h1 className="section-title mb-6">
            源生万象
            <br />
            <span className="text-gold text-2xl md:text-3xl font-normal block mt-2 tracking-[0.15em]">
              YUANSHENG — Origin Insight
            </span>
          </h1>
          <p className="section-subtitle">
            From the source, all phenomena arise. A brand built at the
            intersection of classical Chinese cyclical wisdom and modern
            self-discovery.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="bauhaus-line mb-8 w-16" />
              <h2 className="text-2xl font-light text-text-primary mb-6 tracking-tight">
                The name
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                <span className="text-gold">源</span> (yuán) — source, wellspring.
                The origin from which all things flow.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                <span className="text-gold">生</span> (shēng) — to be born, to
                grow. Life emerging from the source.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                <span className="text-gold">万象</span> (wàn xiàng) — the ten
                thousand phenomena. All forms, all patterns, all that arises and
                passes away.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Together: <span className="italic text-text-primary">From the source, all phenomena arise.</span>
              </p>
            </div>

            <div>
              <div className="bauhaus-line mb-8 w-16" />
              <h2 className="text-2xl font-light text-text-primary mb-6 tracking-tight">
                The approach
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                YUANSHENG is grounded in the classical Chinese model of cyclical
                time — a system that describes the rhythms of energy flowing
                through years, seasons, months, and days.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                This is not fortune-telling. It is a framework for understanding
                the innate patterns you were born with and the timing of the
                life you are living.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Our services combine AI-assisted calculation with human
                interpretation. Our products are designed as physical anchors
                for the insights gained. Our membership offers ongoing guidance
                through every season of your year.
              </p>
            </div>
          </div>

          {/* Bauhaus decorative element */}
          <div className="flex gap-6 mt-20">
            <div className="w-16 h-16 border border-gold/20" />
            <div className="w-16 h-16 rounded-full border border-teal/20" />
            <div className="w-16 h-16 border border-gold/10" />
          </div>
        </div>
      </section>
    </>
  );
}