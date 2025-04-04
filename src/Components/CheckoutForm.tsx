// import { useState, useEffect } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "../api"; // Import function

// const CheckoutForm = ({ amount }: { amount: number }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("card");

//   // Fetch Payment Intent
//   useEffect(() => {
//     const fetchPaymentIntent = async () => {
//       try {
//         setError(null);
//         const secret = await createPaymentIntent(amount);
//         setClientSecret(secret);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("An unknown error occurred.");
//         }
//       }
//     };

//     fetchPaymentIntent();
//   }, [amount]);

//   // Handle Form Submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!stripe || !elements || !clientSecret) {
//       setError("Stripe is not ready or clientSecret is missing.");
//       setLoading(false);
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       setError("Payment field is empty.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Confirm Payment
//       const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card: cardElement },
//       });

//       if (confirmError) {
//         throw new Error(confirmError.message || "Payment confirmation failed.");
//       }

//       console.log("🎉 Payment Successful:", paymentIntent);
//       alert("✅ Payment Successful!");
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.error("❌ Payment Error:", err);
//         setError(err.message);
//       } else {
//         console.error("❌ Payment Error:", err);
//         setError("An unknown error occurred.");
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Payment Method Selection */}
//       <label htmlFor="paymentMethod">Select Payment Method:</label>
//       <select
//         id="paymentMethod"
//         value={paymentMethod}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//       >
//         <option value="card">Card</option>
//         <option value="paypal">PayPal</option>
//         <option value="mpesa">M-Pesa</option>
//       </select>

//       {/* Card Input (Only shown for card payments) */}
//       {paymentMethod === "card" && <CardElement />}

//       {/* Error Message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Submit Button */}
//       <button type="submit" disabled={!stripe || loading || !clientSecret}>
//         {loading ? "Processing..." : `Pay with ${paymentMethod}`}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;

import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createStripePaymentIntent } from "../api";
import { FaCreditCard, FaPaypal, FaMobileAlt, FaSpinner, FaCheck } from "react-icons/fa";

interface CheckoutFormProps {
  amount: number;
  onSuccess?: () => void;
}

const CheckoutForm = ({ amount, onSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Static values as per your backend requirements
  const userId = 7;
  const sessionId = 1;

  // Fetch Payment Intent
  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const fetchPaymentIntent = async () => {
      try {
        setError(null);
        const secret = await createStripePaymentIntent({
          userId,
          sessionId,
          amount: amount * 100, // Convert to cents
          currency: "usd",
          paymentStatus: "complete",
          description: "Therapy session payment",
          metadata: {
            paymentMethod: "card"
          }
        });
        setClientSecret(secret);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    if (paymentMethod === "card") {
      fetchPaymentIntent();
    }
  }, [stripe, elements, amount, paymentMethod]);

  // Show loading state while Stripe initializes
  if (!stripe || !elements) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-2xl text-indigo-500" />
        </div>
        <p className="mt-4">Loading payment form...</p>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setPaymentSuccess(false);

    if (!stripe || !elements || !clientSecret) {
      setError("Payment system is not ready. Please try again.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Payment details are missing.");
      setLoading(false);
      return;
    }

    try {
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (confirmError) {
        throw new Error(confirmError.message || "Payment failed.");
      }

      setPaymentSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodIcon = () => {
    switch (paymentMethod) {
      case "card": return <FaCreditCard className="text-xl" />;
      case "paypal": return <FaPaypal className="text-xl" />;
      case "mpesa": return <FaMobileAlt className="text-xl" />;
      default: return <FaCreditCard className="text-xl" />;
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Complete Payment</h2>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="paymentMethod" className="font-medium block mb-2">
          Select Payment Method:
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-3 mb-6 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="mpesa">M-Pesa</option>
        </select>

        {paymentMethod === "card" && (
          <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 mb-6">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#1a1a1a',
                    '::placeholder': { color: '#aab7c4' },
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  },
                  invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 px-4 py-3 rounded-lg mb-6">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {paymentSuccess && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg mb-6">
            <FaCheck />
            Payment Successful!
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading || !clientSecret}
          className={`w-full px-4 py-3.5 bg-indigo-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
            !stripe || loading || !clientSecret
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          }`}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {getPaymentMethodIcon()}
              Pay ${amount.toFixed(2)} with {paymentMethod}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;