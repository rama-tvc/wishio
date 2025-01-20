"use client";

import { useEffect, useState } from "react";
import { useIsModalOpen } from "../Buttons/buttonLink";
import "@/components/componentsEl/Buttons/closeButton.css";
import { useSession } from "next-auth/react";

function AddWish() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    link: "",
  });

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setFormData((prev) => ({
        ...prev,
        name: session?.user?.email || "",
      }));
    }
  }, [session]);
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
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const { isModalOpenWish, closeModalWish } = useIsModalOpen();

  return (
    <div className="relative">
      {isModalOpenWish && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <div className="cl-btn-2 absolute top-4 right-4">
              <div onClick={closeModalWish}>
                <div className="leftright" onClick={closeModalWish}></div>
                <div className="rightleft" onClick={closeModalWish}></div>
                <span className="close-btn" onClick={closeModalWish}>
                  Закрыть
                </span>
              </div>
            </div>

            <form onSubmit={HandleSubmit} className="space-y-4">
              <div>
                <div className="text-xl font-semibold mb-4 text-gray-800">
                  Введите ваш желаемый подарок:
                </div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Имя:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="введите ваше имя"
                  className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none "
                />
                <label
                  htmlFor="present"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Название подарка:
                </label>
                <input
                  type="text"
                  id="present"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={2}
                  placeholder="введите желаемый подарок"
                  className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ссылка с marketplace(если имеется)
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="вставьте ссылку с marketplace"
                  className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Добавьте картинку (если имеется)
                  </label>
                  <div className="flex items-center space-x-4">
                    <label
                      htmlFor="image"
                      className="cursor-pointer px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      Выбрать файл
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <span className="text-sm text-gray-500">
                      PNG, JPG до 5MB
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={closeModalWish}
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      ;
    </div>
  );
}

export default AddWish;
