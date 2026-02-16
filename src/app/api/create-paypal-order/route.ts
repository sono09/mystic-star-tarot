import { NextResponse } from "next/server";

const useProduction =
  process.env.PAYPAL_ENV === "production" ||
  (process.env.NODE_ENV === "production" && process.env.PAYPAL_ENV !== "sandbox");
const PAYPAL_API = useProduction
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

export async function POST() {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID ?? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "PayPal credentials not configured." },
        { status: 500 }
      );
    }

    const tokenRes = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return NextResponse.json({ error: "Failed to get PayPal token" }, { status: 500 });
    }

    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        intent: "capture",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "4.99",
            },
            description: "Premium Tarot Consultation",
          },
        ],
      }),
    });

    const orderData = await orderRes.json();
    if (!orderData.id) {
      return NextResponse.json(
        { error: orderData.message || "Failed to create order" },
        { status: 500 }
      );
    }

    return NextResponse.json({ orderID: orderData.id });
  } catch (error) {
    console.error("PayPal order error:", error);
    return NextResponse.json(
      { error: "Failed to create PayPal order" },
      { status: 500 }
    );
  }
}
