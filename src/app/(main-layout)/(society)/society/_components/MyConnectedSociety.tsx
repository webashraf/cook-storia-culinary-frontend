"use client";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useUser } from "@/src/context/user.provider";
import { getMyConnectedSocietyFromAPI } from "@/src/services/SocietyServices";
import { IUser } from "@/src/types/user";

const MyConnectedSociety = () => {
  const { user }: IUser | any = useUser();
  const [myConnectedSocieties, setMyConnectedSocieties] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(myConnectedSocieties);
  useEffect(() => {
    const fetchConnectedSocieties = async () => {
      if (user?.id) {
        try {
          const societies = await getMyConnectedSocietyFromAPI(user?.id);

          setMyConnectedSocieties(societies.data);
        } catch (error) {
          console.error("Error fetching connected societies:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchConnectedSocieties();
  }, [user?.id, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">My Societies</h3>
      {myConnectedSocieties.length > 0 ? (
        <ul>
          <div className="space-y-2">
            {myConnectedSocieties.map((society: any) => (
              <Link
                key={society._id}
                className="flex items-center justify-between p-4 rounded-lg shadow-md transition dark:bg-neutral-800 hover:bg-neutral-300"
                href={`/society/${society?.societyId?._id}`}
              >
                {/* Avatar Section */}
                <div className="flex items-center gap-3">
                  <Avatar
                    isBordered
                    alt={`Avatar of ${society?.societyId?.societyName}`}
                    radius="lg"
                    size="md"
                    src={
                      society.coverImage ||
                      "https://res.cloudinary.com/dyalzfwd4/image/upload/v1734884282/digital-art-style-pottery-illustration_1_ei4tal.jpg"
                    }
                  />
                  <div>
                    <h4 className="text-sm font-medium text-default-900 hover:underline">
                      {society?.societyId?.societyName}
                    </h4>

                    <p className="text-sm text-gray-400 capitalize">
                      {society.privacyType}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ul>
      ) : (
        <p>No connected societies found.</p>
      )}
    </div>
  );
};

export default MyConnectedSociety;
