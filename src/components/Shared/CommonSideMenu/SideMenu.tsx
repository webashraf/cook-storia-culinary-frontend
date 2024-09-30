"use client";
import { siteConfig } from "@/src/config/site";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";
import { usePathname } from "next/navigation";

const SideMenu = () => {
  const pathname = usePathname();

  return (
    <div className="w-[15%] h-[90vh] bg-default-300/50 rounded-lg p-5 flex flex-col justify-between">
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
        <div className="mt-20 flex flex-col gap-2">
          {siteConfig.navItems.map((item) => (
            <Button
              className={`bg-transparent ${pathname === item.href ? "bg-default-600 text-default-100" : ""}`}
            >
              <Link
                className={`text-default-800 ${pathname === item.href ? " text-default-100" : ""}`}
                href={item.href}
              >
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
