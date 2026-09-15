'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

const services = [
  'Quick Snapshot (¥88)',
  'Life Panorama (¥666)',
  'Annual Guidance (¥388)',
  'Monthly Insight (¥88)',
  'Daily Wisdom (¥33)',
  'Membership ($400/yr)',
  'Product inquiry',
  'Other',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, this would POST to an API endpoint
  };

  return (
    <>
      <section className="min-h-[60vh] flex items-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="bauhaus-line mb-8 w-24" />
          <p className="section-label mb-4">Contact</p>
          <h1 className="section-title mb-6">
            Start your
            <br />
            <span className="text-gold">inquiry</span>
          </h1>
          <p className="section-subtitle">
            Not ready to book? Reach out with any question.
            <br />
            We respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-bg-card/50 border border-border-subtle px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-bg-card/50 border border-border-subtle px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors duration-300"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
                  I am interested in
                </label>
                <select
                  className="w-full bg-bg-card/50 border border-border-subtle px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold/60 transition-colors duration-300 appearance-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C49B3C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                  }}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
                  Your birth details
                </label>
                <input
                  type="text"
                  className="w-full bg-bg-card/50 border border-border-subtle px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors duration-300"
                  placeholder="Date, time, and place of birth (optional for now)"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full bg-bg-card/50 border border-border-subtle px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/60 transition-colors duration-300 resize-none"
                  placeholder="Tell me what you are seeking…"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                <Send size={14} />
                {submitted ? 'Message Sent' : 'Send Inquiry'}
              </button>
            </form>

            {submitted && (
              <div className="mt-8 p-6 border border-gold/30 bg-gold/5 text-center">
                <p className="text-sm text-text-primary mb-1">
                  Thank you for your inquiry.
                </p>
                <p className="text-xs text-text-secondary">
                  I will respond within 24 hours. In the meantime, explore the
                  site — every page holds something useful.
                </p>
              </div>
            )}

            {/* Alternative contact */}
            <div className="mt-16 text-center">
              <p className="text-xs text-text-muted tracking-[0.1em] uppercase mb-4">
                Or reach me directly
              </p>
              <div className="flex justify-center gap-8">
                <a
                  href="mailto:hello@yuansheng.co"
                  className="text-sm text-gold hover:text-gold-light transition-colors duration-300"
                >
                  hello@yuansheng.co
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}