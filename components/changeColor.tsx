"use client"
import { useEffect, useState } from "react";
// import AddWish from "./addWish";



function ChangeColor (){
    const [changeBackground, setChangeBackground] = useState(false);
const reverseBackground = () => {
  if (!changeBackground) {
    setChangeBackground(true);
  }
  else {
  setChangeBackground(false);
  }
}
useEffect(() => {
if (!changeBackground) {
    document.body.style.backgroundColor = "#f5f7f9";
    document.body.style.color = "#4a4a4a";
  
}
else {
    document.body.style.backgroundColor = "#1e1e2e";
    document.body.style.color = "#e0e0e0";
}
// const buttonSelect = document.getElementsByClassName("theme-change") as HTMLCollectionOf<HTMLButtonElement>;
// console.log("Found buttons:", buttonSelect.length);
// for (const button of buttonSelect) {
//     button.style.backgroundColor = changeBackground ? "light" : "dark";
//     button.style.color = changeBackground ? "dark" : "light";
// }
}, [changeBackground]);



    return (
        <div>
        <button onClick={reverseBackground}>Изменение темы
        </button>
        </div>
    )
}
export default ChangeColor

