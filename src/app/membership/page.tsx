import Link from 'next/link';
import { Check } from 'lucide-react';

const perks = [
  'Monthly elemental transit report',
  'Unlimited text Q&A (response within 24 hours)',
  'Early access to product pre-orders',
  'Exclusive member-only content and guides',
  'Priority booking for full readings',
];

export default function MembershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">Membership</p>
          <h1 className="section-title mb-6">
            Your year, mapped
            <br />
            <span className="text-gold">in advance</span>
          </h1>
          <p className="section-subtitle">
            A full year of monthly guidance. Each month, receive a detailed
            analysis of the elemental weather ahead — so you can move with the
            current instead of against it.
          </p>
        </div>
      </section>

      {/* Pricing card */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-lg mx-auto">
            <div className="border border-gold/40 bg-gold/5 p-10 md:p-14 text-center">
              {/* Decorative */}
              <div className="flex justify-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full border border-teal/40" />
                <div className="w-3 h-3 border border-gold/60" />
                <div className="w-3 h-3 rounded-full bg-gold/20" />
              </div>

              <p className="section-label mb-2">Annual Membership</p>
              <h2 className="text-4xl md:text-5xl font-light text-text-primary mb-2 tracking-tight">
                $400
                <span className="text-sm text-text-muted font-normal tracking-[0.05em]">
                  {' '}
                  / year
                </span>
              </h2>
              <p className="text-sm text-text-secondary mb-1">
                or{' '}
                <span className="text-gold">$40/month</span>
              </p>
              <p className="text-xs text-text-muted mb-10">
                Cancel anytime
              </p>

              <ul className="text-left space-y-4 mb-10">
                {perks.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                    <Check size={16} className="text-gold mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="btn-primary w-full"
              >
                Enquire About Membership
              </Link>

              <p className="text-[10px] text-text-muted mt-4 tracking-[0.1em]">
                First month free if you purchase any full reading
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How membership works */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">The Cycle</p>
          <h2 className="section-title mb-12">What each month brings</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '⟳',
                title: 'Monthly Transit Report',
                desc: 'As the celestial energies shift each month, you receive a personal analysis of what is moving in your chart — which houses are activated, which elements are dominant, and what themes are likely to surface.',
              },
              {
                icon: '◈',
                title: 'Ongoing Dialog',
                desc: 'Life does not wait for the next appointment. Send questions as they arise; receive thoughtful, grounded responses within one day. No session limits.',
              },
              {
                icon: '⊞',
                title: 'Seasonal Deep-Dives',
                desc: 'Four times a year, an extended analysis of the coming season — key dates, elemental shifts, and practical guidance for decisions large and small.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border-subtle bg-bg-card/30 p-8 card-hover"
              >
                <span className="text-2xl text-gold mb-4 block">{item.icon}</span>
                <h3 className="text-base font-medium text-text-primary mb-3">
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
    </>
  );
}