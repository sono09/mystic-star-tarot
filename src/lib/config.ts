/** Number of users for social proof. Update as you grow! */
export const TRUSTED_SEEKERS_COUNT = Number(
  process.env.NEXT_PUBLIC_TRUSTED_SEEKERS ?? "1000"
);

/** PayPal client ID for JS SDK */
export const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
