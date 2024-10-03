"use client";

import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPhone, FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { LuBookOpen, LuHome, LuLogIn } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";

import UserCard from "@/src/app/(main-layout)/_components/UserCard/UserCard";
import { nexiosInstance } from "@/src/config/axios.instance";
import { getCurrentUser } from "@/src/services/AuthService";

const pages = [
  { name: "Home", href: "/", icon: <LuHome className="h-5 w-5" /> },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <MdOutlineDashboard className="h-5 w-5" />,
  },
  {
    name: "Recipe Feed",
    href: "/recipe-feed",
    icon: <LuBookOpen className="h-5 w-5" />,
  },
  { name: "Profile", href: "/profile", icon: <FaUser className="h-5 w-5" /> },
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // console.log("allUser", allUser);
  useEffect(() => {
    const logedInUserInfo = async () => {
      try {
        const loggedInUser = await getCurrentUser();

        setCurrentUser(loggedInUser);
      } catch (err) {
        console.error("Error fetching current user:", err);
        setError("Failed to fetch current user.");
      }
    };

    logedInUserInfo();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data }: any = await nexiosInstance.get("/auth/user");

      setAllUser(data);
    } catch (err) {
      console.error("Error fetching all users:", err);
      setError("Failed to fetch users.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  // console.log("current user", currentUser);

  return (
    <div className="w-[20%] hidden lg:block h-[100vh] bg-default-300/50 rounded-lg p-5 flex flex-col justify-between pt-10">
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <User
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
          description={
            <Link isExternal href="https://twitter.com/jrgarciadev" size="sm">
              {currentUser?.email}
            </Link>
          }
          name="Jhon kabir"
        />
        <div className="mt-10 flex flex-col gap-2">
          {pages.map((page) => (
            <div key={page.href}>
              <Link className="text-default-600" href={page.href}>
                <span
                  className={`flex items-center text-default-800 text-left p-2 rounded-md ${pathname === page.href ? " bg-default-500 text-default-100" : ""}`}
                >
                  {page.icon}
                </span>
                <span className="ml-2">{page.name}</span>
              </Link>
            </div>
          ))}
          {!currentUser && (
            <Link className="text-default-600" href="/login">
              <span
                className={`flex items-center text-default-800 text-left p-2 rounded-md`}
              >
                <LuLogIn className="h-5 w-5" />
              </span>
              <span className="ml-2">Login</span>
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        {allUser?.data
          ?.slice(0, 4)
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
