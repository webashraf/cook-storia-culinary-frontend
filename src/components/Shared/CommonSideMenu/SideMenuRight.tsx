"use client";

import { Link } from "@nextui-org/link";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useEffect, useState } from "react";

import UserCard from "@/src/app/(main-layout)/_components/UserCard/UserCard";
import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";

const SideMenuRight = () => {
  const [allUser, setAllUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useUser();

  const getAllUsers = async () => {
    try {
      const { data }: any = await nexiosInstance.get("/auth/user");

      setAllUser(data);
    } catch (err) {
      setError("Failed to fetch users.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="lg:min-w-[200px] w-full hidden lg:block ml-auto h-[90vh] bg-default-300/50 space-y-2 px-5 pt-5 mt-5 rounded-lg">
      {!currentUser?.isPremium && (
        <div>
          <h4 className="pb-2">Be a premium member</h4>
          <Link href="/user/membership/payment">
            <div className="bg-sky-700 rounded-2xl inline-block shadow-sm shadow-sky-500">
              <div className="group overflow-hidden relative after:duration-500 before:duration-500 duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 hover:duration-500 after:absolute after:w-20 after:h-16 after:bg-sky-700 after:rounded-full after:blur-xl after:bottom-32 after:right-16 before:absolute before:bg-sky-400 before:rounded-full before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12 hover:rotate-12 flex justify-center items-center h-36 w-56 origin-bottom-right bg-neutral-900 rounded-2xl outline outline-slate-400 -outline-offset-8">
                <div className="z-[5] flex flex-col items-center gap-2">
                  <span className="text-slate-400 text-lg uppercase font-bold">
                    Get A👊
                  </span>
                  <span className="text-slate-400 text-3xl font-bold">
                    Premium
                  </span>
                  <p className="text-gray-50 capitalize">MEMBERSHIP</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
      <div className="pt-5">
        <h3>Follow Chef</h3>
        <ScrollShadow hideScrollBar className=" h-[50vh] overflow-y-scroll">
          <div className="flex flex-col gap-3   ">
            {allUser?.data?.map((user: any, i: number) => (
              <div key={user?._id + i}>
                {user?._id !== currentUser?.id &&
                  user?.status == "active" &&
                  user.isDeleted == false && (
                    <UserCard logedInUser={currentUser} user={user} />
                  )}
              </div>
            ))}
          </div>
        </ScrollShadow>
      </div>
    </div>
  );
};

export default SideMenuRight;
