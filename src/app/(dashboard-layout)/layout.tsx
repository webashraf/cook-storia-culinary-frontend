import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { clsx } from "clsx";
import { ReactNode } from "react";

import AdminSideMenu from "@/src/components/AdminDashboard/AdminSideMenu";
import Footer from "@/src/components/Shared/Footer/Footer";
import { Navbar } from "@/src/components/Shared/navbar";
import { fontSans } from "@/src/config/fonts";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        className={clsx(
          "min-h-screen font-sans antialiased max-w-[1420px] mx-auto",
          fontSans.variable
        )}
      >
        <>
          <div className="relative flex flex-col ">
            <Navbar />

            <div className="flex items-center justify-center lg:gap-10 overflow-hidden lg:mx-5">
              <div className="lg:w-[25%] lg:block hidden">
                <AdminSideMenu />
              </div>
              <ScrollShadow
                hideScrollBar
                className="lg:ml-auto  lg:w-[75%] w-full h-screen pb-10"
                isEnabled={false}
                offset={0}
              >
                {children}
              </ScrollShadow>
            </div>
          </div>
        </>
      </div>
      <Footer />
    </>
  );
};

export default layout;
