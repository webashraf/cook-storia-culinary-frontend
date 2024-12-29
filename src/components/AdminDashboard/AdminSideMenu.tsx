"use client";

import { Avatar } from "@nextui-org/avatar";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { GrGroup, GrHome } from "react-icons/gr";
import { LuBookOpen } from "react-icons/lu";
import {
  MdOutlineDashboard,
  MdPayments,
  MdWorkspacePremium,
} from "react-icons/md";

import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";

// const allUserNavs = [
//   { name: "Home", href: "/", icon: <GrHome className="h-5 w-5" /> },
//   {
//     name: "Recipe Feed",
//     href: "/recipe-feed",
//     icon: <LuBookOpen className="h-5 w-5" />,
//   },
//   {
//     name: "About Us",
//     href: "/about-us",
//     icon: <IoInformationCircle className="h-5 w-5" />,
//   },
//   {
//     name: "Contact Us",
//     href: "/contact-us",
//     icon: <FaPhone className="h-5 w-5" />,
//   },
// ];

const adminPages = [
  { name: "Home", href: "/", icon: <GrHome className="h-5 w-5" /> },
  {
    name: "Admin Dashboard",
    href: "/dashboard",
    icon: <MdOutlineDashboard className="h-5 w-5" />,
  },
  {
    name: "Manage User",
    href: "/dashboard/manage-user",
    icon: <FaUserAlt className="h-5 w-5" />,
  },

  {
    name: "Manage Recipes",
    href: "/dashboard/manage-recipe",
    icon: <LuBookOpen className="h-5 w-5" />,
  },
  {
    name: "Create Admin",
    href: "/dashboard/create-admin",
    icon: <MdWorkspacePremium className="h-5 w-5" />,
  },
  {
    name: "Manage Admin",
    href: "/dashboard/manage-admin",
    icon: <LuBookOpen className="h-5 w-5" />,
  },
  {
    name: "Manage Society",
    href: "/dashboard/manage-society",
    icon: <GrGroup className="h-5 w-5" />,
  },
  {
    name: "Payment Overview",
    href: "/dashboard/payment-overview",
    icon: <MdPayments className="h-5 w-5" />,
  },
];

const AdminSideMenu = () => {
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
    <div className="w-[100%] lg:block h-[100vh] dark:bg-neutral-950 rounded-lg">
      <ScrollShadow
        hideScrollBar
        className="w-[100%] lg:block h-[90vh] dark:bg-neutral-950 rounded-lg p-5 flex flex-col justify-between pt-10"
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
                    <h4 className="uppercase text-default-800 text-sm">
                      {currentUser?.name.slice(0, 10)}..
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

          {/* Admin navs */}
          {currentUser?.role === "admin" && (
            <div className="mt-10 flex flex-col gap-2">
              {adminPages.map((page, i) => (
                <div key={page.href + i}>
                  <Link
                    className="text-default-600 flex items-center"
                    href={page.href}
                  >
                    <span
                      className={`text-left p-2 rounded-md ${
                        pathname === page.href ? " bg-primary text-white " : ""
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
      </ScrollShadow>
    </div>
  );
};

export default AdminSideMenu;
