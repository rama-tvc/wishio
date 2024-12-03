"use client";
import AddWish from "@/components/Wish/addWish";
import AddWishList from "@/components/WIshLists/addWishList";
import ButtonExpandList from "@/components/Buttons/buttonExpandList";
import ButtonExpandWish from "@/components/Buttons/buttonExpandWish";
import { IsModalOpenProvider } from "@/components/Buttons/buttonLink";


// import { ThemeProvider } from "@/components/setting";


function WishListPage() {
    return (
      <>
      {/* <ThemeProvider> */}
       
        <IsModalOpenProvider>
        <AddWish/>
        <ButtonExpandWish/>
        <AddWishList/>
        <ButtonExpandList/>
        </IsModalOpenProvider>
        
        {/* </ThemeProvider> */}
      </>
    );
  }
  export default WishListPage;
  
