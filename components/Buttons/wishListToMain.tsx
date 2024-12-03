import Wishes from "../Wish/wishes";
import "@/components/WishLists/addWishList.css"
import "@/components/form.css"
import "./wishListToMain.css"


function WishListToMain () {

return(
    <div className="wishListToMain">
<h2>Мой список желаний:</h2>
<ul>
  <Wishes />
</ul>
</div>
)}

export default WishListToMain;