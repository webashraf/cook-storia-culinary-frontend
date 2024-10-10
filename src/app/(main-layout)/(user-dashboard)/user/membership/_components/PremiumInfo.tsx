"use client";

import moment from "moment";

import { useUser } from "@/src/context/user.provider";

// Sample data for demonstration purposes
const premiumInfo = [
  {
    id: 1,
    feature: "Ad-Free Experience",
    description: "Enjoy browsing without any ads.",
  },
  {
    id: 2,
    feature: "Exclusive Content",
    description: "Access to premium articles and resources.",
  },
  {
    id: 3,
    feature: "Priority Support",
    description: "Get priority support for all your queries.",
  },
];

const PremiumInfo = () => {
  const { user } = useUser();

  // Check if the user is not premium
  if (user?.isPremium === false) {
    return (
      <div className="min-h-screen p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          You are not authorized to access this page.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:p-6 px-3 overflow-y-scroll mt-10">
      {/* User Information */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Welcome, {user?.name || "Guest"}!{" "}
          <span className="text-warning  md:inline inline-block  text-[12px] md:text-[14px] font-bold border border-warning rounded-full px-2 py-0.5 shadow-md">
            Pro User
          </span>
        </h2>
        <p className="text-gray-400">{user?.email || "Email not available"}</p>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Premium Features
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {premiumInfo.map((info) => (
          <div key={info.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg md:text-xl text-black font-semibold">
              {info.feature}
            </h2>
            <p className="text-gray-600">{info.description}</p>
          </div>
        ))}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mt-12 mb-8">
        Payment Information
      </h1>
      <table className="lg:min-w-full w-[50% overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-black">
            <th className="py-2 px-4 border-b border-gray-200 text-left text-lg">
              Transaction ID
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-lg">
              Amount
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-lg">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr key={user?.paymentStatus?.amount} className="hover:bg-gray-100">
            <td className="py-2 px-4 text-black border-b border-gray-200">
              {user?.paymentStatus?.transaction}
            </td>
            <td className="py-2 px-4 text-black border-b border-gray-200">
              ${user?.paymentStatus?.amount.toFixed(2)}
            </td>
            <td className="py-2 px-4 text-black border-b border-gray-200">
              {user?.paymentStatus?.date
                ? moment(user?.paymentStatus?.date).format("ddd, MMM D, YYYY")
                : "--"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PremiumInfo;
