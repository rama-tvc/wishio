"use client";

import { useState } from "react";
import { useIsModalOpen } from "../Buttons/buttonLink";
import "@/components/componentsEl/Buttons/closeButton.css";
import "@/components/componentsEl/addWishList.css";
import "@/components/componentsEl/form.css";

function AddWish() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    link: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const { isModalOpenWish, closeModalWish } = useIsModalOpen();

  return (
    <div className="formList">
      {isModalOpenWish && (
        <div className="modal">
          <div className="cl-btn-2">
            <div onClick={closeModalWish}>
              <div className="leftright" onClick={closeModalWish}></div>
              <div className="rightleft" onClick={closeModalWish}></div>
              <span className="close-btn" onClick={closeModalWish}>
                Закрыть
              </span>
            </div>
          </div>
          <form onSubmit={HandleSubmit} className="formSubmit">
            <div>
              <div className="labelForm">Введите ваш желаемый подарок:</div>
              <label htmlFor="name">Имя:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete=""
                placeholder="введите ваше имя"
              />
              <label htmlFor="present">Название подарка:</label>
              <input
                type="text"
                id="present"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={2}
                placeholder="введите желаемый подарок"
              />
              <label htmlFor="link">Ссылка с marketplace(если имеется)</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="вставьте ссылку с marketplace"
              />

              <button
                type="submit"
                className="changeBackgroundButton"
                onClick={closeModalWish}
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      )}
      ;
    </div>
  );
}

export default AddWish;
