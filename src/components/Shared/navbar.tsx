"use client";

import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { AiFillMessage } from "react-icons/ai";
import { RiNotification3Fill } from "react-icons/ri";

import { GithubIcon, Logo, SearchIcon } from "@/src/components/icons";
import { siteConfig } from "@/src/config/site";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import CSBadge from "../commonUi/CSBadge";
import CSProfileDropDown from "../commonUi/CSProfileDropDown";
import { ThemeSwitch } from "../theme-switch";
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
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        {/* <ul className="sm:hidde flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-red-500 data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul> */}
      </NavbarContent>

      <NavbarContent
        className="sm:hidde flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="sm:hidde " >{searchInput}</NavbarItem>
        <NavbarItem className="sm:hidde flex gap-2">
          <Link
            isExternal
            aria-label="Twitter"
            href={siteConfig.links.twitter}
          ></Link>
          <CSBadge>
            <AiFillMessage className="text-gray-500" size={16} />
          </CSBadge>
          <CSBadge>
            <RiNotification3Fill className="text-gray-500" size={16} />
          </CSBadge>

          <ThemeSwitch />

          <CSProfileDropDown />
        </NavbarItem>
        {/* <NavbarItem className="sm:hidde">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <div className="lg:hidden block">
        <NavbarContent className="hidden sm:flex basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMobileMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMobileMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </div>
    </NextUINavbar>
  );
};
