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

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        {currentUser ? (
          <DropdownTrigger>
            <Avatar
              isBordered
              radius="sm"
              size="sm"
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            />
          </DropdownTrigger>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{currentUser?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" onClick={() => router.push("/user")}>
            My Profile
          </DropdownItem>
          <DropdownItem
            key="add-recipe"
            onClick={() => router.push("/user/add-recipe")}
          >
            Add Recipe
          </DropdownItem>
          <DropdownItem
            key="team_settings"
            onClick={() => router.push("/user/settings")}
          >
            Profile Settings
          </DropdownItem>
          <DropdownItem
            key="team_settings"
            onClick={() => router.push("/user/change-password")}
          >
            Change Password
          </DropdownItem>
          <DropdownItem key="analytics" onClick={() => router.push("/user")}>
            My Recipes
          </DropdownItem>
          <DropdownItem
            key="analytics"
            onClick={() => router.push("/recipe-feed")}
          >
            Recipe Feed
          </DropdownItem>

          <DropdownItem key="logout" color="danger">
            <p onClick={() => handleLogout()}>Log Out</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
