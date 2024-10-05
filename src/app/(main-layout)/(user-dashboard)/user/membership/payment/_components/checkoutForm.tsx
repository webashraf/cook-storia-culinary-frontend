"use client";

import convertToCurrency from "@/src/lib/convertToCurrency";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Fetch client secret on mount or when amount changes
  useEffect(() => {
    async function fetchPaymentIntent() {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertToCurrency(amount) }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        setErrorMessage("Failed to create payment intent. Please try again.");
      }
    }

    fetchPaymentIntent();
  }, [amount]);

  // Handle payment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // Handle errors
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(error.message || "Payment error occurred.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } else {
      setErrorMessage("");
    }

    setIsLoading(false);
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className={`mt-4 px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300`}
        >
          {isLoading ? "Processing..." : "Pay"}
        </button>
      </form>
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
    </>
  );
}
