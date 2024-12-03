"use client"


import GeneralLayout from "@/components/Mainpage/ReduxMainpage";
import React from "react";
function SomeLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <GeneralLayout>
        <main>{children}</main>
        </GeneralLayout>
      </div>
    );
  }
  export default SomeLayout;