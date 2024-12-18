import Wishes from "../Wish/wishes";
import "@/components/componentsEl//WishLists/addWishList.css";
import "@/components/componentsEl//form.css";
import "./wishListToMain.css";

function WishListToMain() {
  return (
    <div className="wishListToMain">
      <h2>Мой список желаний:</h2>
      <div>
        <Wishes />
      </div>
    </div>
  );
}

export default WishListToMain;
