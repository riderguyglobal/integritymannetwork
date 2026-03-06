import Stripe from "stripe";

// ═══════════════════════════════════════════════════════
// STRIPE INTEGRATION
// ═══════════════════════════════════════════════════════

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing STRIPE_SECRET_KEY environment variable");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
  typescript: true,
});

/**
 * Create a Stripe Checkout Session for store orders
 */
export async function createStripeCheckoutSession({
  orderId,
  items,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  orderId: string;
  items: { name: string; price: number; quantity: number; image?: string }[];
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: customerEmail,
    metadata: { orderId },
    line_items: items.map((item) => ({
      price_data: {
        currency: "ngn",
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses smallest currency unit
      },
      quantity: item.quantity,
    })),
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}

/**
 * Create a Stripe Checkout Session for donations
 */
export async function createStripeDonationSession({
  amount,
  donorEmail,
  donationId,
  recurring = false,
  successUrl,
  cancelUrl,
}: {
  amount: number;
  donorEmail: string;
  donationId: string;
  recurring?: boolean;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: recurring ? "subscription" : "payment",
    customer_email: donorEmail,
    metadata: { donationId, type: "donation" },
    line_items: [
      {
        price_data: {
          currency: "ngn",
          product_data: {
            name: "Donation — The Integrity Man Network",
          },
          unit_amount: Math.round(amount * 100),
          ...(recurring ? { recurring: { interval: "month" } } : {}),
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}

/**
 * Verify Stripe webhook signature
 */
export function verifyStripeWebhook(
  payload: string | Buffer,
  signature: string
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error("Missing STRIPE_WEBHOOK_SECRET");

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
