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
import { useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { LuChefHat } from "react-icons/lu";
import { RiNotification3Fill } from "react-icons/ri";

import CSBadge from "../commonUi/CSBadge";
import CSProfileDropDown from "../commonUi/CSProfileDropDown";
import { ThemeSwitch } from "../theme-switch";

import { SearchIcon } from "@/src/components/icons";
import { getCurrentUser } from "@/src/services/AuthService";
export const Navbar = () => {


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

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <LuChefHat size={22} />
            CookstoriaCulinary
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="sm:hidde flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="sm:hidde ">{searchInput}</NavbarItem>
        <NavbarItem className="sm:hidde flex gap-2">
          <CSBadge>
            <AiFillMessage className="text-default-600" size={16} />
          </CSBadge>
          <CSBadge>
            <RiNotification3Fill className="text-default-600" size={16} />
          </CSBadge>

          <ThemeSwitch />

          <CSProfileDropDown />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
