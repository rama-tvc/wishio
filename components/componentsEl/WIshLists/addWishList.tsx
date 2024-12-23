"use client";
import "@/components/componentsEl/Buttons/closeButton.css";
import "@/components/componentsEl/modal.css";
import { useIsModalOpen } from "../Buttons/buttonLink";
import { useState } from "react";
import addUserWishList from "@/actions/addUserWishList";

function AddWishList() {
  const [formData, setFormData] = useState({
    title: "",
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
  const basePath = "/my-app"; // Убедитесь, что путь совпадает с next.config.js

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.visibility) {
      alert("Заполните обязательные поля!");
      return;
    }

    try {
      const response = await fetch(`${basePath}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          visibility: formData.visibility,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании списка желаний.");
      }

      const result = await response.json();
      console.log("Wishlist created:", result);
      setFormData({ title: "", description: "", visibility: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка при создании/обновлении списка.");
    }
  };

  const { isModalOpenList, closeModalList } = useIsModalOpen();

  return (
    <div className="relative">
      {isModalOpenList && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <div className="cl-btn-2 absolute top-4 right-4">
              <div onClick={closeModalList}>
                <div className="leftright"></div>
                <div className="rightleft"></div>
                <span className="close-btn">Закрыть</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Создайте свой список подарков:
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Название списка
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  required
                  placeholder="Например: Подарки на Новый год"
                  className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Описание списка
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Например: Для коллег по работе"
                  className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="visibility"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Приватность
                </label>
                <select
                  id="visibility"
                  name="visibility"
                  value={formData.visibility || ""}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="others">Другое</option>
                  <option value="friends">Для друзей</option>
                  <option value="family">Для семьи</option>
                  <option value="soulmate">Для второй половинки</option>
                  <option value="all">Для всех</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModalList}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddWishList;
