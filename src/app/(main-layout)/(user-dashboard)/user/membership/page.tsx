"use client";

import { useUser } from "@/src/context/user.provider";
import PlanAds from "./_components/PlanAds";
import PremiumInfo from "./_components/PremiumInfo";

const page = () => {
  const { user } = useUser();

  if (!user) {
    return <h2 className="text-5xl text-center pt-36">Loading...</h2>;
  }

  return <div>{user?.isPremium ? <PremiumInfo /> : <PlanAds />}</div>;
};

export default page;
