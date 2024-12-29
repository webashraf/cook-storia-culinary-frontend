"use client";

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { LuChefHat } from "react-icons/lu";

import CSProfileDropDown from "../commonUi/CSProfileDropDown";
import { ThemeSwitch } from "../theme-switch";

export const Navbar = () => {
  return (
    <NextUINavbar
      className="flex relative z-10 justify-between overflow-hidden"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full p-0 w-[50%]"
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
        <NavbarItem className="flex gap-3 justify-end items-center h-full">
          <ThemeSwitch />
          <CSProfileDropDown />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
