import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";
import { connectSociety, getSociety } from "@/src/services/SocietyServices";
import { ISociety } from "@/src/types/society";

const AllSocieties = () => {
  const [societies, setSocieties] = useState<ISociety[]>([]);
  const { user }: any = useUser();

  const fetchSocieties = async () => {
    try {
      const { data } = await getSociety(user?.id);

      setSocieties(data || []);
    } catch (error) {
      console.error("Error fetching societies:", error);
    }
  };

  useEffect(() => {
    fetchSocieties();
  }, [user?.id, user]); // Trigger fetch on user id change

  const connect = async (societyId: string) => {
    try {
      const result = await connectSociety({ userId: user?.id, societyId });

      if (result?.success) {
        // Refetch societies after successful connection
        fetchSocieties();
        toast.success("Society connected!");
      } else {
        toast.error("Society not connected!");
      }
    } catch (error) {
      toast.error("Error connecting to society!");
      console.error(error);
    }
  };

  return (
    <div className=" text-white rounded-lg">
      <div className="space-y-2">
        {societies.map((society: ISociety) => (
          <div
            key={society._id}
            className="flex items-center justify-between p-4 rounded-lg shadow-md transition dark:bg-neutral-800 hover:bg-neutral-300"
          >
            {/* Avatar Section */}
            <div className="flex items-center gap-3">
              <Avatar
                isBordered
                alt={`Avatar of ${society.societyName}`}
                radius="lg"
                size="md"
                src={
                  society.coverImage ||
                  "https://res.cloudinary.com/dyalzfwd4/image/upload/v1734884282/digital-art-style-pottery-illustration_1_ei4tal.jpg"
                }
              />
              <div>
                <h4 className="text-sm font-medium text-default-900">
                  {society.societyName}
                </h4>
                <p className="text-sm text-gray-400 capitalize">
                  {society.privacyType}
                </p>
              </div>
            </div>
            {/* Action Section */}
            <Button
              aria-label={`Connect with ${society.societyName}`}
              className="hover:bg-[#88b72b]"
              radius="sm"
              size="sm"
              onClick={() => connect(society._id)}
            >
              Connect
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSocieties;
