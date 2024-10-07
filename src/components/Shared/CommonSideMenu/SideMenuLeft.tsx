"use client";

import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPhone, FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { LuBookOpen, LuHome } from "react-icons/lu";
import { MdOutlineDashboard, MdWorkspacePremium } from "react-icons/md";

import UserCard from "@/src/app/(main-layout)/_components/UserCard/UserCard";
import { nexiosInstance } from "@/src/config/axios.instance";
import { useUser } from "@/src/context/user.provider";

import UserSkeleton from "../Loader/UserSkeleton";

const userPages = [
  { name: "Home", href: "/", icon: <LuHome className="h-5 w-5" /> },
  {
    name: "Dashboard",
    href: "/user",
    icon: <MdOutlineDashboard className="h-5 w-5" />,
  },
  {
    name: "Membership",
    href: "/user/membership",
    icon: <MdWorkspacePremium className="h-5 w-5" />,
  },
  {
    name: "Recipe Feed",
    href: "/recipe-feed",
    icon: <LuBookOpen className="h-5 w-5" />,
  },
  { name: "Profile", href: "/user", icon: <FaUser className="h-5 w-5" /> },
  {
    name: "About Us",
    href: "/about-us",
    icon: <IoInformationCircle className="h-5 w-5" />,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    icon: <FaPhone className="h-5 w-5" />,
  },
];

const adminPages = [
  { name: "Home", href: "/", icon: <LuHome className="h-5 w-5" /> },
  {
    name: "Admin Dashboard",
    href: "/admin",
    icon: <MdOutlineDashboard className="h-5 w-5" />,
  },
  {
    name: "Create Admin",
    href: "/admin/create-admin",
    icon: <MdWorkspacePremium className="h-5 w-5" />,
  },
  {
    name: "Manage Admin",
    href: "/admin/manage-admin",
    icon: <LuBookOpen className="h-5 w-5" />,
  },
  {
    name: "Manage User",
    href: "/admin/manage-user",
    icon: <LuBookOpen className="h-5 w-5" />,
  },
  {
    name: "About Us",
    href: "/about-us",
    icon: <IoInformationCircle className="h-5 w-5" />,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    icon: <FaPhone className="h-5 w-5" />,
  },
];

const SideMenu = () => {
  const pathname = usePathname();
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
    <div className="w-[100%] lg:block h-[100vh] bg-default-300/50 rounded-lg p-5 flex flex-col justify-between pt-10">
      {error && <div className="text-red-600">{error}</div>}
      <div>
        {currentUser ? (
          <div className="flex gap-5">
            <Avatar
              isBordered
              color={currentUser?.isPremium ? "warning" : "primary"}
              src={currentUser?.photo}
            />
            <div className="relative">
              <h4 className="uppercase">{currentUser?.name}</h4>
              {currentUser.isPremium ? (
                <p className="text-sm text-warning-600 ">Pro User</p>
              ) : (
                <p className="text-sm text-default-400">
                  {currentUser?.role == "user"
                    ? "Basic User"
                    : currentUser?.role}
                </p>
              )}
            </div>
          </div>
        ) : (
          <UserSkeleton />
        )}
        {/* Nav links */}
        {/* User Navs */}
        <div className="mt-10 flex flex-col gap-2">
          {userPages.map((page) => (
            <div key={page.href}>
              <Link className="text-default-600" href={page.href}>
                <span
                  className={`flex items-center text-default-800 text-left p-2 rounded-md ${pathname === page.href ? " bg-primary-500 text-default-100" : ""}`}
                >
                  {page.icon}
                </span>
                <span className="ml-2">{page.name}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Admin navs */}
        <div className="mt-10 flex flex-col gap-2">
          {adminPages.map((page) => (
            <div key={page.href}>
              <Link className="text-default-600" href={page.href}>
                <span
                  className={`flex items-center text-default-800 text-left p-2 rounded-md ${pathname === page.href ? " bg-primary-500 text-default-100" : ""}`}
                >
                  {page.icon}
                </span>
                <span className="ml-2">{page.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-10">
        {allUser?.data
          ?.slice(0, 3)
          .map((user: any) => (
            <div key={user?._id}>
              {user?._id !== currentUser?.id && (
                <UserCard logedInUser={currentUser} user={user} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SideMenu;
