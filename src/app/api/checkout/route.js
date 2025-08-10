import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { plan, addons } = body;

    const basePrices = {
      free: 0,
      deploy: 1500,
      pro: 2900
    };

    const addonPrices = {
      seo: 500,
      images: 700,
      analytics: 300
    };

    let amount = basePrices[plan] || 0;
    for (const addon of addons) {
      amount += addonPrices[addon] || 0;
    }

    if (amount === 0) {
      return NextResponse.json({ url: "/editor" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `PageBurst ${plan} Plan` },
            unit_amount: amount,
            recurring: { interval: "month" }
          },
          quantity: 1
        }
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/editor?success=true`,
      cancel_url: `${req.headers.get("origin")}/generating?cancel=true`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
