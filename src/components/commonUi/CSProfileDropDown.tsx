"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";
import { logoutUser } from "@/src/services/AuthService";

export default function CSProfileDropDown() {
  const router = useRouter();
  const { user: currentUser, setIsUserLoading } = useUser();

  const handleLogout = () => {
    logoutUser();
    setIsUserLoading(true);
    if (!currentUser) {
      toast.success("Logged out!!");
    }
    router.push("/login");
  };

  const userPages = [
    {
      key: "profile",
      content: (
        <>
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{currentUser?.email}</p>
        </>
      ),
      action: null,
      className: "h-14 gap-2",
    },
    {
      key: "home",
      content: "Home",
      action: () => router.push("/"),
    },
    {
      key: "settings",
      content: "My Profile",
      action: () => router.push("/user"),
    },
    {
      key: "add-recipe",
      content: "Add Recipe",
      action: () => router.push("/user/add-recipe"),
    },
    {
      key: "profile_settings",
      content: "Profile Settings",
      action: () => router.push("/user/update-user-info"),
    },
    {
      key: "change_password",
      content: "Change Password",
      action: () => router.push("/user/change-password"),
    },
    {
      key: "my_recipes",
      content: "My Recipes",
      action: () => router.push("/user"),
    },
    {
      key: "recipe_feed",
      content: "Recipe Feed",
      action: () => router.push("/recipe-feed"),
    },
    {
      key: "logout",
      content: <p onClick={handleLogout}>Log Out</p>,
      action: null,
      color: "danger",
    },
  ];
  const adminPages = [
    {
      key: "home",
      content: "Home",
      action: () => router.push("/"),
    },
    {
      key: "admin_dashboard",
      content: "Admin Dashboard",
      action: () => router.push("/admin"),
    },
    {
      key: "manage_user",
      content: "Manage User",
      action: () => router.push("/admin/manage-user"),
    },
    {
      key: "manage_recipes",
      content: "Manage Recipes",
      action: () => router.push("/admin/manage-recipe"),
    },
    {
      key: "create_admin",
      content: "Create Admin",
      action: () => router.push("/admin/create-admin"),
    },
    {
      key: "manage_admin",
      content: "Manage Admin",
      action: () => router.push("/admin/manage-admin"),
    },
    {
      key: "about_us",
      content: "About Us",
      action: () => router.push("/about-us"),
    },
    {
      key: "contact_us",
      content: "Contact Us",
      action: () => router.push("/contact-us"),
    },
    {
      key: "logout",
      content: <p onClick={handleLogout}>Log Out</p>,
      action: null,
      color: "danger",
    },
  ];

  return (
    <div className="flex items-center gap-4 h-[100vh] z-50">
      <Dropdown backdrop="blur" placement="bottom-start" size="lg">
        {currentUser ? (
          <DropdownTrigger className="size-14">
            <Avatar
              isBordered
              radius="sm"
              size="md"
              src={`${currentUser.photo}`}
            />
          </DropdownTrigger>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
        {currentUser?.role === "user" && (
          <DropdownMenu aria-label="User Actions" variant="flat">
            {userPages.map(({ key, content, action }: any) => (
              <DropdownItem key={key} textValue={key} onClick={action}>
                {content}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
        {currentUser?.role === "admin" && (
          <DropdownMenu aria-label="User Actions" variant="flat">
            {adminPages.map(({ key, content, action }: any) => (
              <DropdownItem key={key} textValue={key} onClick={action}>
                {content}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  );
}
