"use client";
import AddWish from "@/components/addWish";
import Wishes from "@/components/wishes";
function WishListPage() {
    return (
      <>
        <h2>Мой список желаний:</h2>
        <ul>
          <Wishes />
          <AddWish />
        </ul>
      </>
    );
  }
  export default WishListPage;
  
