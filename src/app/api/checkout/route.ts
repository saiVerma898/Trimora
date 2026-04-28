import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Lazy-initialize Stripe so build doesn't fail when env var is missing
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

// Pricing map — keep in sync with the approved page UI
const PRICES: Record<string, { name: string; price: number }> = {
  "semaglutide-injection": { name: "Trimora Semaglutide — Injection", price: 14900 },
  "semaglutide-tablets": { name: "Trimora Semaglutide — Tablets", price: 24900 },
  "tirzepatide-injection": { name: "Trimora Tirzepatide — Injection", price: 19900 },
  "tirzepatide-tablets": { name: "Trimora Tirzepatide — Tablets", price: 29900 },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { medication, form, email } = body as {
      medication: "semaglutide" | "tirzepatide";
      form: "injection" | "tablets";
      email?: string;
    };

    const sku = `${medication}-${form}`;
    const product = PRICES[sku];
    if (!product) {
      return NextResponse.json({ error: "Invalid product selection" }, { status: 400 });
    }

    const stripe = getStripe();
    const origin = request.headers.get("origin") || request.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: "Doctor-guided GLP-1 weight loss program — first month, then $299/month",
            },
            unit_amount: product.price,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        description: "Trimora GLP-1 weight loss program",
        metadata: { medication, form },
      },
      success_url: `${origin}/intake/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/intake/approved`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["US"] },
      metadata: { medication, form, sku },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[checkout] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
