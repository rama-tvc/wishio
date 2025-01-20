"use client";

import ButtonExpandList from "@/components/componentsEl/Buttons/buttonExpandList";
import ButtonExpandWish from "@/components/componentsEl/Buttons/buttonExpandWish";
import { IsModalOpenProvider } from "@/components/componentsEl/Buttons/buttonLink";
import GeneralLayout from "@/components/componentsEl/Mainpage/ReduxMainpage";
import AddWish from "@/components/componentsEl/Wish/addWish";
import AddWishList from "@/components/componentsEl/WIshLists/addWishList";

export default function WishPage() {
  return (
    <div className="App">
      <GeneralLayout>
        <IsModalOpenProvider>
          <AddWish />
          <ButtonExpandWish />
          <AddWishList />
          <ButtonExpandList />
        </IsModalOpenProvider>
      </GeneralLayout>
    </div>
  );
}
