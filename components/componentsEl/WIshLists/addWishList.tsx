"use client";
import "./addWishList.css";
import "@/components/componentsEl/Buttons/closeButton.css";

import "@/components/componentsEl/modal.css";
import "@/components/componentsEl/form.css";
import { useIsModalOpen } from "../Buttons/buttonLink";

import { useState } from "react";

function AddWishList() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const wishAddURL = "";
    try {
      const response = await fetch(wishAddURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const { isModalOpenList, closeModalList } = useIsModalOpen();

  return (
    <div className="formList">
      {isModalOpenList && (
        <div className="modal">
          <div className="cl-btn-2">
            <div onClick={closeModalList}>
              <div className="leftright" onClick={closeModalList}></div>
              <div className="rightleft" onClick={closeModalList}></div>
              <span className="close-btn" onClick={closeModalList}>
                Закрыть
              </span>
            </div>
          </div>
          <form onSubmit={HandleSubmit} className="formSubmit">
            <div>
              <div className="labelForm">
                Создайте свой список подарков для определенных людей:
              </div>
              <label htmlFor="name">Название списка:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="опишите свой список"
              />
              <label htmlFor="description">Опишите свой список:</label>
              <input
                type="text"
                id="present"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="дополнительная информация"
              />
              <label htmlFor="visibility">Приватность:</label>
              <select
                id="visibility"
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
              >
                <option value="others">Другое</option>
                <option value="friends">Для друзей</option>
                <option value="family">Для семьи</option>
                <option value="soulmate">Для второй половинки</option>
                <option value="all">Для всех</option>
              </select>

              <button
                type="submit"
                className="theme-change"
                onClick={closeModalList}
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddWishList;
