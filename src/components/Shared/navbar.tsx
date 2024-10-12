"use client";

import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { AiFillMessage } from "react-icons/ai";
import { LuChefHat } from "react-icons/lu";
import { RiNotification3Fill } from "react-icons/ri";

import { SearchIcon } from "@/src/components/icons";
import { useUser } from "@/src/context/user.provider";

import CSBadge from "../commonUi/CSBadge";
import CSProfileDropDown from "../commonUi/CSProfileDropDown";
import { ThemeSwitch } from "../theme-switch";

export const Navbar = () => {
  const { user } = useUser();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidde lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  // if (condition) {
  // }

  return (
    <NextUINavbar
      className="flex justify-between overflow-hidden"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full p-0  w-[50%]"
        justify="start"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <LuChefHat size={22} />
            CookstoriaCulinary
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="sm:hidde fle basis-1/5 sm:basis-full  w-[50%]"
        justify="end"
      >
        <NavbarItem className="hidden lg:block">{searchInput}</NavbarItem>
        {user && (
          <NavbarItem className="sm:hidde flex gap-2">
            <CSBadge>
              <AiFillMessage className="text-default-600" size={16} />
            </CSBadge>
            <CSBadge>
              <RiNotification3Fill className="text-default-600" size={16} />
            </CSBadge>
          </NavbarItem>
        )}
        <NavbarItem className="flex gap-3 justify-end items-center h-full">
          <ThemeSwitch />
          <CSProfileDropDown />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
