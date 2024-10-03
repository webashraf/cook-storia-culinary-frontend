"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";

import { useUser } from "@/src/context/user.provider";
import { logoutUser } from "@/src/services/AuthService";

export default function CSProfileDropDown() {
  const router = useRouter();

  const { user: currentUser, setIsUserLoading } = useUser();

  const handleLogout = () => {
    logoutUser();
    setIsUserLoading(true);
    router.push("/");
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Avatar
            isBordered
            radius="sm"
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{currentUser?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" onClick={() => router.push("/profile")}>
            My Profile
          </DropdownItem>
          <DropdownItem
            key="team_settings"
            onClick={() => router.push("/profile/settings")}
          >
            Profile Settings
          </DropdownItem>
          <DropdownItem
            key="team_settings"
            onClick={() => router.push("/profile/change-password")}
          >
            Change Password
          </DropdownItem>
          <DropdownItem key="analytics" onClick={() => router.push("/profile")}>
            My Recipes
          </DropdownItem>
          <DropdownItem
            key="analytics"
            onClick={() => router.push("/recipe-feed")}
          >
            Recipe Feed
          </DropdownItem>

          {currentUser ? (
            <DropdownItem key="logout" color="danger">
              <p onClick={() => handleLogout()}>Log Out</p>
            </DropdownItem>
          ) : (
            <DropdownItem
              key="Login"
              color="success"
              onClick={() => router.push("/login")}
            >
              <Link href="/login">Login</Link>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
