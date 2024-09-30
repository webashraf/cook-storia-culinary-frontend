import "@/src/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import Footer from "@/src/components/Shared/Footer/Footer";
import { Navbar } from "@/src/components/Shared/navbar";
import { fontSans } from "@/src/config/fonts";
import { siteConfig } from "@/src/config/site";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

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
          fontSans.variable
        )}
      >
        <>
          <div className="relative flex flex-col border border-dashed">
            <Navbar />

            <div className="flex">
              <div className="w-[15%] h-[90vh] bg-red-500 "></div>
              <ScrollShadow
                // hideScrollBar
                offset={0}
                // ScrollShadowVisibility="none"
                isEnabled={false}
                className="ml-auto w-[85%] h-screen overflow-scroll"
              >
                {children}
                <div className="h-[500vh] w-full bg-purple-500"></div>
                {/* <Content /> */}
              </ScrollShadow>
            </div>
          </div>
          <Footer />
        </>
      </div>
    </div>
  );
}
