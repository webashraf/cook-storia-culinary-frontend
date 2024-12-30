/* eslint-disable jsx-a11y/alt-text */
import { Image } from "@nextui-org/image";
import Link from "next/link";

const SocietyMembers = ({ members }: any) => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
      {members.map((member: any) => (
        <div key={member?._id} className="flex items-start gap-3">
          <Link href={`/user/${member?.userId?._id}`}>
            <Image
              className="size-10 border-2 border-neutral-600"
              src={member?.userId?.profilePicture}
            />
          </Link>
          <div>
            <Link className="relative" href={`/user/${member?.userId?._id}`}>
              <h4 className="capitalize hover:underline dark:text-white">
                {member?.userId?.username}
              </h4>{" "}
              <h6 className="text-[12px] absolute -right-5 top-0">
                {member?.userId?.isPremium ? "Pro" : "Free"}
              </h6>
            </Link>
            <h6 className="capitalize hover:underline dark:text-white/80 text-[12px]">
              Member
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocietyMembers;
