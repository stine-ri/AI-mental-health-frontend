import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51PeKzACI9w20ysjOXZAl43sGJogF5ggj6bfiopJ7CjsHjTarQipzBEvUQr4XzaKC8ISy7d3LlgczHfP4iDtN7ZRP00FxJo3oLv");

const CheckoutPage = ({ amount }: { amount: number }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default CheckoutPage;
