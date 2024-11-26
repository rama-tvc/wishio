"use client";
import AddWish from "@/components/addWish";
import AddWishList from "@/components/addWishList";
import ButtonExpandList from "@/components/buttonExpandList";
import ButtonExpandWish from "@/components/buttonExpandWish";
import { IsModalOpenProvider } from "@/components/buttonLink";

import ChangeColor from "@/components/changeColor";
// import { ThemeProvider } from "@/components/setting";
import Wishes from "@/components/wishes";

function WishListPage() {
    return (
      <>
      {/* <ThemeProvider> */}
        <h2>Мой список желаний:</h2>
        <ul>
          <Wishes />
        </ul>
        <IsModalOpenProvider>
        <AddWish/>
        <ButtonExpandWish/>
        <AddWishList/>
        <ButtonExpandList/>
        </IsModalOpenProvider>
         <ChangeColor/>
        
        {/* </ThemeProvider> */}
      </>
    );
  }
  export default WishListPage;
  
