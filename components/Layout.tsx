"use client";

import { Providers } from "@/app/providers";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "./ui/toaster";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        {pathname !== "/api-docs" && <Header />}
        {children}
        {pathname !== "/api-docs" && <Footer />}
        <Toaster />
      </div>
    </Providers>
  );
};
