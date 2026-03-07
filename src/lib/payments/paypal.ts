// ═══════════════════════════════════════════════════════
// PAYPAL INTEGRATION
// ═══════════════════════════════════════════════════════

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "";
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";
const PAYPAL_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

/**
 * Get PayPal access token
 */
async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

/**
 * Create a PayPal order
 */
export async function createPayPalOrder({
  amount,
  currency = "GHS",
  description,
  orderId,
  returnUrl,
  cancelUrl,
}: {
  amount: number;
  currency?: string;
  description: string;
  orderId: string;
  returnUrl: string;
  cancelUrl: string;
}) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: orderId,
          description,
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: "The Integrity Man Network",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error_description || "PayPal order creation failed");
  }

  return data as {
    id: string;
    status: string;
    links: { href: string; rel: string; method: string }[];
  };
}

/**
 * Capture a PayPal order (after user approves)
 */
export async function capturePayPalOrder(paypalOrderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error_description || "PayPal capture failed");
  }

  return data as {
    id: string;
    status: string;
    purchase_units: {
      payments: {
        captures: {
          id: string;
          status: string;
          amount: { currency_code: string; value: string };
        }[];
      };
    }[];
    payer: {
      email_address: string;
      name: { given_name: string; surname: string };
    };
  };
}

/**
 * Verify PayPal webhook signature
 */
export async function verifyPayPalWebhook({
  webhookId,
  headers,
  body,
}: {
  webhookId: string;
  headers: Record<string, string>;
  body: string;
}) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: headers["paypal-auth-algo"],
        cert_url: headers["paypal-cert-url"],
        transmission_id: headers["paypal-transmission-id"],
        transmission_sig: headers["paypal-transmission-sig"],
        transmission_time: headers["paypal-transmission-time"],
        webhook_id: webhookId,
        webhook_event: JSON.parse(body),
      }),
    }
  );

  const data = await response.json();
  return data.verification_status === "SUCCESS";
}
