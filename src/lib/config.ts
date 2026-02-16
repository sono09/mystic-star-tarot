/** Number of users for social proof. Update as you grow! */
export const TRUSTED_SEEKERS_COUNT = Number(
  process.env.NEXT_PUBLIC_TRUSTED_SEEKERS ?? "1000"
);

/** PayPal payment link for premium consultation */
export const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_PAYMENT_LINK ??
  "https://www.paypal.com/ncp/payment/3S9PZM7KKE53E";
