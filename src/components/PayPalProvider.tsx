"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "@/lib/config";

interface PayPalProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app with PayPalScriptProvider so the SDK is loaded at app init.
 * Script is ready when the payment popup opens.
 */
export default function PayPalProvider({ children }: PayPalProviderProps) {
  if (!PAYPAL_CLIENT_ID) {
    return <>{children}</>;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
        components: "buttons",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
