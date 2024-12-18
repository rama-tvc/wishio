"use client";
import React, { useState } from "react";
import "@/components/componentsEl/WishLists/addWishList.css";
import { useIsModalOpen } from "./buttonLink";
import "@/components/componentsEl/form.css";

function ButtonExpandWish() {
  const [expandWish, setExpandWish] = useState(false);
  const expanded = () => {
    setExpandWish((prevExpand) => !prevExpand);
    console.log(expandWish);
  };
  const { isModalOpenWish, openModalWish } = useIsModalOpen();

  return (
    <div className="formList">
      {!isModalOpenWish && (
        <div>
          <button
            aria-expanded={expandWish}
            aria-controls="formList"
            className="buttonExpandWish"
            onClick={expanded}
          >
            Взаимодействие с желанием:
          </button>
          {expandWish && (
            <div id="formList">
              <ul>
                <li>
                  <button className="formListButton" onClick={openModalWish}>
                    Создать желание:
                  </button>
                </li>
                <li>
                  <button className="formListButton">
                    Редактировать желание:
                  </button>
                </li>
                <li>
                  <button className="formListButton">Удалить желание:</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
      ;
    </div>
  );
}
export default ButtonExpandWish;
