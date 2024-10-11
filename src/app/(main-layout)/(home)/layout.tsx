import "@/src/styles/globals.css";
import React from "react";

export default function UserDashboardLayout({
  children,
  RecipePosts,
}: {
  children: React.ReactNode;
  RecipePosts: React.ReactNode;
}) {
  return (
    <>
      <>
        {children}
        {RecipePosts}
      </>
    </>
  );
}
