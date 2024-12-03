"use client"


import GeneralLayout from "@/components/Mainpage/ReduxMainpage";
import React from "react";
function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <GeneralLayout>
        <main>{children}</main>
        </GeneralLayout>
      </div>
    );
  }
  export default DashboardLayout;