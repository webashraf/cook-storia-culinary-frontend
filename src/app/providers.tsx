"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Toaster } from "sonner";

import UserProvider from "../context/user.provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <UserProvider>
        <Toaster />
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </UserProvider>
    </NextUIProvider>
  );
}
