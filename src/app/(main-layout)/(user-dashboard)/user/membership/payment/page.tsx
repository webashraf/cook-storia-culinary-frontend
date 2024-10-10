"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import convertToCurrency from "@/src/lib/convertToCurrency";

import CheckoutForm from "./_components/checkoutForm";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Publish key is missing");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function App() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const amount: number = convertToCurrency(200);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const options: any = {
    clientSecret,
  };

  return (
    <div className="app bg-white p-5 md:m-10 rounded-md shadow-xl shadow-primary-400/30 mt-20">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
