"use client"
import React from "react";
function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <header>Это заголовок Dashboard</header>
        <main>{children}</main>
      </div>
    );
  }
  export default DashboardLayout;