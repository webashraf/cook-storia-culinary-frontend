"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";

import { useUser } from "@/src/context/user.provider";
import { logoutUser } from "@/src/services/AuthService";

const PaymentSuccess = async ({ searchParams }: any) => {
  const { transactionId, amount } = searchParams;
  const { user: currentUser } = useUser();
  const router = useRouter();

  if (!currentUser?.isPremium) {
    logoutUser();
    // router.push("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-7xl text-black">$</h2>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful
        </h2>
        <p className="text-gray-600 mb-2">
          Thank you for your payment! Your transaction has been completed
          successfully.
        </p>
        {transactionId && (
          <p className="text-gray-600 mb-4 font-bold">
            Transaction ID: {transactionId}
          </p>
        )}
        {amount && (
          <p className="text-gray-600 mb-4 font-bold">Amount: ${amount}</p>
        )}
        <Link href="/user/membership/">
          <Button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
            See more info
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
