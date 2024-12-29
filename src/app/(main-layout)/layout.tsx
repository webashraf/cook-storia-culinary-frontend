/* eslint-disable no-undef */
/* eslint-disable import/order */
import Footer from "@/src/components/Shared/Footer/Footer";
import { Navbar } from "@/src/components/Shared/navbar";
import { fontSans } from "@/src/config/fonts";
import { siteConfig } from "@/src/config/site";

import "@/src/styles/globals.css";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import SideMenu from "@/src/components/Shared/CommonSideMenu/SideMenuLeft";

import { ReactNode } from "react";

import SideMenuRight from "@/src/components/Shared/CommonSideMenu/SideMenuRight";
import { getCurrentUser } from "@/src/services/AuthService";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (user?.role == "admin") {
    console.log(user?.role);
    redirect("/dashboard");
  }
  if (!user) {
    redirect("/login");
    console.log("Main Layout User:", user);
  }

  return (
    <>
      <div
        className={clsx(
          "min-h-screen  font-sans antialiased max-w-[1420px] mx-auto",
          fontSans.variable
        )}
      >
        <>
          <div className="relative flex flex-col ">
            <Navbar />

            <div className="flex items-center justify-center lg:gap-10 overflow-hidden lg:mx-5">
              <div className="lg:w-[25%] lg:block hidden">
                <SideMenu />
              </div>
              <ScrollShadow
                hideScrollBar
                className="lg:ml-auto  lg:w-[50%] w-full h-screen pb-10"
                isEnabled={false}
                offset={0}
              >
                {children}
              </ScrollShadow>
              <div className="lg:w-[25%] lg:block hidden ">
                <SideMenuRight />
              </div>
            </div>
          </div>
        </>
      </div>
      <Footer />
    </>
  );
}
