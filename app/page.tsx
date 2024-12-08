"use client";

import WishListToMain from "@/components/Buttons/wishListToMain";
import GeneralLayout from "@/components/Mainpage/ReduxMainpage";

export default function Home() {
  return (
    <div className="App">
      <GeneralLayout>
        <WishListToMain />
      </GeneralLayout>
    </div>
  );
}
