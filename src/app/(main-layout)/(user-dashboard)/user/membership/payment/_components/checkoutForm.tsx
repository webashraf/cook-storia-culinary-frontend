"use client";

import { Button } from "@nextui-org/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { nexiosInstance } from "@/src/config/axios.instance";
import { useUser } from "@/src/context/user.provider";
import convertToCurrency from "@/src/lib/convertToCurrency";

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { user: currentUser, setUser } = useUser();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function fetchPaymentIntent() {
      convertToCurrency(amount);
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount }),
        });

        const data = await response.json();

        setClientSecret(data.clientSecret);
      } catch (error) {
        setErrorMessage("Failed to create payment intent. Please try again.");
      }
    }

    fetchPaymentIntent();
  }, [amount]);

  const handleSubmit = async (e: FormEvent) => {
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
      if (paymentIntent?.status) {
        const paymentInfo = {
          isPremium: true,
          paymentStatus: {
            success: true,
            transaction: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            date: new Date().toString(),
          },
        };

        const { data }: any = await nexiosInstance.post(
          `/user/update-user/${currentUser?.id}`,
          paymentInfo
        );

        if (data.success) {
          setUser(data.data);
          toast.success(`Payment successful trID:${paymentIntent.id}`);
          router.push(
            `/user/membership/payment/success?transactionId=${paymentIntent.id}&amount=${paymentIntent.amount / 100}`
          );
        }
      }
    }

    setIsLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <h2 className="text-black">Loading...</h2>;
  }

  return (
    <>
      <form className="" id="payment-form" onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        <Button
          className={`mt-5 w-full bg-black text-white`}
          disabled={isLoading || !stripe || !elements}
          isLoading={isLoading || !stripe || !elements}
          type="submit"
        >
          {isLoading ? `Processing...` : `Pay $${amount / 100}`}
        </Button>
      </form>
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
    </>
  );
}
