import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState, useRef } from "react";
import CheckoutForm from "./CheckoutForm"; // Adjust the path as needed

// Load the public Stripe key from environment variables
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const CheckoutPage = ({ amount }: { amount: number }) => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in StrictMode
    if (initialized.current) return;
    initialized.current = true;

    console.log("Initializing Stripe with:", {
      key: STRIPE_PUBLIC_KEY,
      type: typeof STRIPE_PUBLIC_KEY,
      trimmedLength: STRIPE_PUBLIC_KEY?.trim().length,
    });

    if (!STRIPE_PUBLIC_KEY?.trim()) {
      console.error("Invalid Stripe key");
      return;
    }

    const init = async () => {
      try {
        const stripe = await loadStripe(STRIPE_PUBLIC_KEY.trim(), {
          betas: ["embedded_checkout_beta_2"], // Remove if not using embedded checkout
        });

        console.log("Stripe instance created:", !!stripe);
        setStripePromise(Promise.resolve(stripe));
      } catch (err) {
        console.error("Stripe initialization error:", err);
        setStripePromise(Promise.reject(err));
      }
    };

    init();
  }, []);

  if (!stripePromise) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading payment system...</span>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ locale: "en" }}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default CheckoutPage;
