import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../api"; // Import function

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Fetch Payment Intent
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        setError(null);
        const secret = await createPaymentIntent(amount);
        setClientSecret(secret);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchPaymentIntent();
  }, [amount, paymentMethod]);

  // Handle Form Submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements || !clientSecret) {
      setError("Stripe is not ready or clientSecret is missing.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Payment field is empty.");
      setLoading(false);
      return;
    }

    try {
      // 🔹 Confirm Payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (confirmError) {
        throw new Error(confirmError.message || "Payment confirmation failed.");
      }

      console.log("🎉 Payment Successful:", paymentIntent);
      alert("✅ Payment Successful!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("❌ Payment Error:", err);
        setError(err.message);
      } else {
        console.error("❌ Payment Error:", err);
        setError("An unknown error occurred.");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Payment Method Selection */}
      <label htmlFor="paymentMethod">Select Payment Method:</label>
      <select
        id="paymentMethod"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="card">Card</option>
        <option value="paypal">PayPal</option>
        <option value="mpesa">M-Pesa</option>
      </select>

      {/* Card Input (Only shown for card payments) */}
      {paymentMethod === "card" && <CardElement />}

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Submit Button */}
      <button type="submit" disabled={!stripe || loading || !clientSecret}>
        {loading ? "Processing..." : `Pay with ${paymentMethod}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
