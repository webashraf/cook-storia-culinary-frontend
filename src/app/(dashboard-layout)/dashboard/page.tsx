"use client";
import { useEffect, useState } from "react";

import ActivatesChart from "@/src/components/AdminDashboard/Charts/ActivatesChart";
import PaiChartUserOverview from "@/src/components/AdminDashboard/Charts/PaiChartUserOverview";
import { useUser } from "@/src/context/user.provider";
import { getAllUser } from "@/src/services/AuthService";
import { getAllSociety } from "@/src/services/SocietyServices";

const AdminDashboard = () => {
  const { user: currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<
    { recipes: any; allUser: any } | any
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data }: any = await getAllSociety();
        const user: any = await getAllUser();

        setUserInfo({ society: data, user });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  console.log(userInfo);

  return (
    <div className="flex max-h-screen dark:bg-neutral-70 mt-10">
      {/* Main Content */}
      <main className="flex-1 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Card */}
          <div className="dark:bg-neutral-900 p-8 rounded-lg shadow-lg border border-neutral-800">
            <h1 className="text-3xl font-bold text-default-900 mb-6">
              Welcome, {currentUser?.name}
            </h1>
            <p className="text-default-900 text-lg mb-6">
              You are logged in as
              <strong className="text-default-900"> {currentUser?.role}</strong>
              .
            </p>
            <div className="dark:bg-neutral-800 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold text-default-900 mb-4">
                User Details
              </h2>
              <p className="text-default-900 mb-2">
                <strong className="text-default-900">Email:</strong>
                {currentUser?.email}
              </p>
            </div>
          </div>

          {/* User Details Card */}
          <div className="dark:bg-neutral-900 p-6 rounded-lg shadow-md">
            <PaiChartUserOverview />
            {/* Add more user details as needed */}
          </div>

          {/* Additional Info Card */}
          <div className="dark:bg-neutral-900 p-6 rounded-lg shadow-md md:col-span-2">
            <ActivatesChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
