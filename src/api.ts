// In ../api.ts
export const createStripePaymentIntent = async (data: {
  userId: number;
  sessionId: number;
  amount: number;
  currency: string;
  paymentStatus: string;
  description?: string;
  metadata?: Record<string, string | number | boolean>;
}): Promise<string> => {
  const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/payments/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create payment intent");
  }

  const { clientSecret } = await response.json();
  return clientSecret;
};