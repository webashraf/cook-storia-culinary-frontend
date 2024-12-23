"use client";

import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPhone, FaUserAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GrHome } from "react-icons/gr";
import { IoInformationCircle } from "react-icons/io5";
import { LuBookOpen } from "react-icons/lu";
import { MdOutlineDashboard, MdWorkspacePremium } from "react-icons/md";

import AllSocieties from "@/src/app/(main-layout)/(society)/society/_components/AllSocieties";
import MyConnectedSociety from "@/src/app/(main-layout)/(society)/society/_components/MyConnectedSociety";
import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";

const allUserNavs = [
  { name: "Home", href: "/", icon: <GrHome className="h-5 w-5" /> },
  {
    name: "Recipe Feed",
    href: "/recipe-feed",
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
const userPages = [
  { name: "Home", href: "/", icon: <GrHome className="h-5 w-5" /> },

  { name: "Profile", href: "/user", icon: <FaUser className="h-5 w-5" /> },
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
];

const adminPages = [
  { name: "Home", href: "/", icon: <GrHome className="h-5 w-5" /> },
  {
    name: "Admin Dashboard",
    href: "/admin",
    icon: <MdOutlineDashboard className="h-5 w-5" />,
  },
  {
    name: "Manage User",
    href: "/admin/manage-user",
    icon: <FaUserAlt className="h-5 w-5" />,
  },
  {
    name: "Manage Recipes",
    href: "/admin/manage-recipe",
    icon: <LuBookOpen className="h-5 w-5" />,
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
    <ScrollShadow
      hideScrollBar
      className="w-[100%] lg:block h-[90vh] bg-default-300/50 rounded-lg p-5 flex flex-col justify-between pt-10"
    >
      <div>
        {currentUser ? (
          <div className="flex gap-5">
            <Avatar
              isBordered
              color={currentUser?.isPremium ? "warning" : "primary"}
              src={currentUser?.photo}
            />
            <div className="relative flex gap-1">
              <p>
                <Link href="/user">
                  <h4 className="uppercase text-default-800">
                    {currentUser?.name}
                  </h4>
                </Link>
                <p>{currentUser.role}</p>
              </p>
              {currentUser.isPremium ? (
                <p className="text-warning inline-block text-[12px] md:text-[12px] font-bold  ">
                  Pro
                </p>
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
          ""
        )}
        {/* Nav links */}
        {/* all User Navs */}
        {!currentUser && (
          <div className="mt-5 flex flex-col gap-2">
            {allUserNavs.map((page, i) => (
              <div key={page.href + i}>
                <Link className="text-default-600" href={page.href}>
                  <span
                    className={`flex items-center text-default-800 text-left p-2 rounded-md ${
                      pathname === page.href
                        ? " bg-primary text-default-100"
                        : ""
                    }`}
                  >
                    {page.icon}
                  </span>
                  <span className="ml-2">{page.name}</span>
                </Link>
              </div>
            ))}
          </div>
        )}
        {/* User Navs */}
        {currentUser?.role === "user" && (
          <div className="mt-10 flex flex-col gap-2">
            {userPages.map((page, i) => (
              <div key={page.href + i} className="mb-3">
                <Link className="text-default-600" href={page.href}>
                  <span
                    className={`flex items-center text-default-800 text-left p-2 rounded-md ${
                      pathname === page.href
                        ? " bg-primary text-default-100"
                        : ""
                    }`}
                  >
                    {page.icon}
                  </span>
                  <span className="ml-2">{page.name}</span>
                </Link>
              </div>
            ))}
            <div className="mb-5">
              <MyConnectedSociety />
              <AllSocieties />
            </div>
          </div>
        )}

        {/* Admin navs */}
        {currentUser?.role === "admin" && (
          <div className="mt-10 flex flex-col gap-2">
            {adminPages.map((page, i) => (
              <div key={page.href + i}>
                <Link className="text-default-600" href={page.href}>
                  <span
                    className={`flex items-center text-default-800 text-left p-2 rounded-md ${
                      pathname === page.href
                        ? " bg-primary text-default-100"
                        : ""
                    }`}
                  >
                    {page.icon}
                  </span>
                  <span className="ml-2">{page.name}</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-2 tracking-wider uppercase text-[10px] mt-auto">
        <Link
          className="text-sm text-[#88b72b]/80 underline hover:text-[#88b72b] font-light "
          href="/about-us"
        >
          About us
        </Link>
        |
        <Link
          className="text-sm text-[#88b72b]/80 underline hover:text-[#88b72b] font-light "
          href="/contact-us"
        >
          Contact us
        </Link>
      </div>
    </ScrollShadow>
  );
};

export default SideMenu;
