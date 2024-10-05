"use client";

import convertToCurrency from "@/src/lib/convertToCurrency";
import { Button } from "@nextui-org/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      if (
        submitError.type === "card_error" ||
        submitError.type === "validation_error"
      ) {
        setErrorMessage(submitError.message || "Payment error occurred.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } else {
      setErrorMessage("");
    }

    const { error, paymentIntent }: any = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "",
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An error occurred in payment.");
    } else {
      console.log("Payment successful!", paymentIntent);
      const transactionId = paymentIntent.id;
      const amountReceived = paymentIntent.amount_received / 100;
      console.log("Transaction ID:", transactionId);
      console.log("Amount Received:", amountReceived);
    }

    setIsLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <h2 className="text-black">Loading...</h2>;
  }

  return (
    <>
      <form id="payment-form" className="" onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        <Button
          isLoading={isLoading || !stripe || !elements}
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className={`mt-5 w-full bg-black text-white`}
        >
          {isLoading ? `Processing...` : `Pay $${amount}`}
        </Button>
      </form>
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
    </>
  );
}
