"use client";

import Loading from "@/src/components/Shared/Loader/Loading/Loading";
import { useUser } from "@/src/context/user.provider";

import PlanAds from "./_components/PlanAds";
import PremiumInfo from "./_components/PremiumInfo";

const MembershipPage = () => {
  const { user } = useUser();

  if (!user) {
    return <Loading />;
  }

  return <div>{user?.isPremium ? <PremiumInfo /> : <PlanAds />}</div>;
};

export default MembershipPage;
