"use client";

import WishListToMain from "@/components/componentsEl/Buttons/wishListToMain";
import GeneralLayout from "@/components/componentsEl/Mainpage/ReduxMainpage";

export default function WishPage() {
  return (
    <div className="App">
      <GeneralLayout>
        <WishListToMain />
      </GeneralLayout>
    </div>
  );
}
