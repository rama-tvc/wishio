"use client";
import React, { useState } from "react";

import { useIsModalOpen } from "./buttonLink";

function ButtonExpandList() {
  const [expand, setExpand] = useState(false);
  const expanded = () => {
    setExpand((prevExpand) => !prevExpand);
    console.log(expand);
  };
  const { isModalOpenList, openModalList } = useIsModalOpen();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
      {!isModalOpenList && (
        <div>
          <button
            aria-expanded={expand}
            aria-controls="formList"
            className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={expanded}
          >
            <span>Взаимодействие со списком:</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                expand ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expand && (
            <div className="mt-4">
              <ul>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 
                  hover:bg-blue-100 rounded-md"
                    onClick={openModalList}
                  >
                    Создать список:
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-xm font-medium text-gray-700 bg-gray-100 
                  hover:bg-gray-200 rounded-md"
                  >
                    Редактировать список:
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-xm font-medium text-red-600 bg-red-50
                  hover:bg-red-100 rounded-md"
                  >
                    Удалить список:
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
export default ButtonExpandList;
