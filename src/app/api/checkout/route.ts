import { NextResponse } from 'next/server';

const PRICE_MAP: Record<string, { amount: number; currency: string; description: string }> = {
  snapshot: { amount: 1200, currency: 'usd', description: 'YUANSHENG — Quick Snapshot' },
  panorama: { amount: 10000, currency: 'usd', description: 'YUANSHENG — Life Panorama' },
  annual_guide: { amount: 5500, currency: 'usd', description: 'YUANSHENG — Annual Guidance' },
  monthly: { amount: 1200, currency: 'usd', description: 'YUANSHENG — Monthly Insight' },
  daily: { amount: 500, currency: 'usd', description: 'YUANSHENG — Daily Wisdom' },
  membership_year: { amount: 40000, currency: 'usd', description: 'YUANSHENG — Annual Membership' },
  membership_month: { amount: 4000, currency: 'usd', description: 'YUANSHENG — Monthly Membership' },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceId, email } = body;

    if (!serviceId || !PRICE_MAP[serviceId]) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 });
    }

    const item = PRICE_MAP[serviceId];

    // In production, create a Stripe Checkout Session:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({ ... });

    // For now, return the price info — Stripe keys go in env later
    return NextResponse.json({
      ok: true,
      item,
      message: 'Stripe integration ready. Add STRIPE_SECRET_KEY to .env to activate.',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}