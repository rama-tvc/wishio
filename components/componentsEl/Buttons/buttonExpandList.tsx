"use client";
import React, { useState } from "react";
import "@/components/componentsEl/WishLists/addWishList.css";
import { useIsModalOpen } from "./buttonLink";
import "@/components/componentsEl/form.css";

function ButtonExpandList() {
  const [expand, setExpand] = useState(false);
  const expanded = () => {
    setExpand((prevExpand) => !prevExpand);
    console.log(expand);
  };
  const { isModalOpenList, openModalList } = useIsModalOpen();

  return (
    <div className="formList">
      {!isModalOpenList && (
        <div>
          <button
            aria-expanded={expand}
            aria-controls="formList"
            className="buttonExpandList"
            onClick={expanded}
          >
            Взаимодействие со списком:
          </button>
          {expand && (
            <div id="formList">
              <ul>
                <li>
                  <button className="formListButton" onClick={openModalList}>
                    Создать список:
                  </button>
                </li>
                <li>
                  <button className="formListButton">
                    Редактировать список:
                  </button>
                </li>
                <li>
                  <button className="formListButton">Удалить список:</button>
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
export default ButtonExpandList;
