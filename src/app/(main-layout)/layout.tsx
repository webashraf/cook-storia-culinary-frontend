import SideMenu from "@/src/components/Shared/CommonSideMenu/SideMenu";
import Footer from "@/src/components/Shared/Footer/Footer";
import { Navbar } from "@/src/components/Shared/navbar";
import { fontSans } from "@/src/config/fonts";
import { siteConfig } from "@/src/config/site";

import "@/src/styles/globals.css";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import UserCard from "./_components/UserCard/UserCard";

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

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div
        className={clsx(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable,
        )}
      >
        <>
          <div className="relative flex flex-col ">
            <Navbar />

            <div className="flex overflow-hidden">
              <SideMenu />
              <ScrollShadow
                hideScrollBar
                className="lg:ml-auto lg:w-[85%] h-screen "
                offset={0}
                // ScrollShadowVisibility="none"
                isEnabled={false}
              >
                {children}
              </ScrollShadow>

              <div className="w-[20%] hidden lg:block ml-auto h-[90vh] bg-default-300/50 space-y-2 px-2 pt-5 mt-5 rounded-lg">
                <UserCard />
                <UserCard />
                <UserCard />
              </div>
            </div>
          </div>
          <Footer />
        </>
      </div>
    </div>
  );
}
