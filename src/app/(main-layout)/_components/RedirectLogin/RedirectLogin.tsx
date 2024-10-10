"use client";

import { useRouter } from "next/navigation";

import { useUser } from "@/src/context/user.provider";

const RedirectLogin = () => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  return <div />;
};

export default RedirectLogin;
