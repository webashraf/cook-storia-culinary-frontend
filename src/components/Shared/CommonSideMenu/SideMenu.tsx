"use client";

import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";
import { usePathname } from "next/navigation";
import { FaPhone, FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { LuBookOpen, LuHome } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";

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

  return (
    <div className="w-[15%] hidden lg:block h-[90vh] bg-default-300/50 rounded-lg p-5 flex flex-col justify-between pt-10">
      <div>
        <User
          name="Junior Garcia"
          description={
            <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
              @jrgarciadev
            </Link>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
        />
        <div className="mt-10 flex flex-col gap-2">
          {pages.map((page) => (
            <div key={page.href}>
              <Link className="text-default-600" href={page.href}>
                <span
                  className={`flex items-center text-default-800 text-left p-2 rounded-md ${pathname === page.href ? " bg-default-500 text-default-100" : ""}`}
                >
                  {" "}
                  {page.icon}
                </span>
                <span className="ml-2">{page.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
