"use client"

import GeneralLayout from "@/components/Mainpage/ReduxMainpage";

function SignLayout ({ children }: { children: React.ReactNode }) {
    return (
      
        <GeneralLayout>
          <main style={{flex:"1"}}>{children}</main>
          </GeneralLayout>
        
      );
    }

export default SignLayout;