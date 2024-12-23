"use client";
import React, { useState } from "react";

import { useIsModalOpen } from "./buttonLink";

function ButtonExpandWish() {
  const [expandWish, setExpandWish] = useState(false);
  const expanded = () => {
    setExpandWish((prevExpand) => !prevExpand);
    console.log(expandWish);
  };
  const { isModalOpenWish, openModalWish } = useIsModalOpen();

  return (
    <div className="formList bg-white rounded-lg shadow-md p-6">
      {!isModalOpenWish && (
        <div>
          <button
            aria-expanded={expandWish}
            aria-controls="formList"
            className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={expanded}
          >
            <span>Взаимодействие с желанием:</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                expandWish ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {expandWish && (
            <div id="formList" className="mt-4">
              <ul className="space-y-2">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md"
                    onClick={openModalWish}
                  >
                    Создать желание
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
                    Редактировать желание
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md">
                    Удалить желание
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default ButtonExpandWish;
