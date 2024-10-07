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

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <div
        className={clsx(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable
        )}
      >
        <>
          <div className="relative flex flex-col ">
            <Navbar />

            <div className="flex overflow-hidden lg:mx-5">
              <div className="lg:w-[30%]">
                {" "}
                <SideMenu />
              </div>
              <ScrollShadow
                hideScrollBar
                className="lg:ml-auto pl-10  lg:w-[100%] w-full h-screen "
                isEnabled={false}
                offset={0}
              >
                {children}
              </ScrollShadow>

            </div>
          </div>
          <Footer />
        </>
      </div>
    </div>
  );
}
