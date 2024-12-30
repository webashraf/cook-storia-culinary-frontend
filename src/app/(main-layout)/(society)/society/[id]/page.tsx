"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";
import { ILogInUser } from "@/src/types/user";

import CreateSocietyPost from "../_components/_singleSociety/CreateSocietyPost";
import SocietyHeader from "../_components/_singleSociety/SocietyHeader";
import SocietyMembers from "../_components/_singleSociety/SocietyMembers";
import SocietyPost from "../_components/_singleSociety/SocietyPosts";

export default function GroupPage({ params }: any) {
  const [society, setSociety] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user }: ILogInUser | any = useUser();

  // Find the current member
  const currentMember = members.find(
    (member) => member?.userId?._id === user?.id
  );
  let tabs = [
    {
      id: "posts",
      label: "Post",
      content: <SocietyPost societyId={params?.id} />,
    },
    {
      id: "about",
      label: "About",
      content: <p>{society?.description}</p>,
    },
    {
      id: "members",
      label: "Members",
      content: (
        <div>
          <SocietyMembers members={members} />
        </div>
      ),
    },
  ];

  console.log(society);

  useEffect(() => {
    const fetchSociety = async () => {
      try {
        const { data: society }: any = await nexiosInstance.get(
          `/society/single/${params.id}`
        );
        const { data: societyMember }: any = await nexiosInstance.get(
          `/society-member/single/${params?.id}`
        );

        setSociety(society?.data);
        setMembers(societyMember?.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching society:", err);
        setError("Failed to fetch society information");
        setLoading(false);
      }
    };

    fetchSociety();
  }, [params.id]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen dark:bg-neutral-900 pb-5 text-white ">
      {/* Header Section */}
      <SocietyHeader coverImage={society?.coverImage} />

      {/* Main Content */}
      <div className="container mx-auto mt-8 px-4">
        {/* Society Info */}
        <div className="flex justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-bold hover:underline capitalize">
              {society?.societyName || "Society Name"}
            </h1>
            <p className="text-gray-400">
              {society?.privacyType || "Society privacy"} {members?.length || 0}{" "}
              member
              {members?.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {/* Main Section */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          {/* Left Section */}
          <div className="flex-1">
            {/* Create Post */}
            <CreateSocietyPost
              currentSocietyMember={currentMember}
              societyId={params?.id}
            />
            {/* Tabs */}
            <div className="flex w-full flex-col mt-5">
              <Tabs aria-label="Dynamic tabs" items={tabs}>
                {(item) => (
                  <Tab key={item.id} title={item.label}>
                    <Card>
                      <CardBody>{item.content}</CardBody>
                    </Card>
                  </Tab>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
