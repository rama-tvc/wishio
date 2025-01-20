"use client";

import GeneralLayout from "@/components/componentsEl/Mainpage/ReduxMainpage";
import { useParams } from "next/navigation";
import { useState } from "react";

function SettingPage() {
  const params = useParams();
  const { id } = params;

  const guestData = {
    id,
    name: "guest",
    surname: "GuestS",
    birthday: "2000-01-31",
    sex: "",
    login: "Guest",
  };

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    birthday: "",
    sex: "",
    login: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev: any) => ({
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
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <GeneralLayout>
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Личные данные {id}
          </h2>
          <form onSubmit={HandleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Имя:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  required
                  placeholder={guestData.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Фамилия:
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={userData.surname}
                  onChange={handleChange}
                  placeholder={guestData.surname}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium text-gray-700"
                >
                  Дата рождения:*
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={userData.birthday}
                  onChange={handleChange}
                  required
                  min="1924-01-01"
                  max="2024-12-31"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label
                  htmlFor="sex"
                  className="block text-sm font-medium text-gray-700"
                >
                  Пол:
                </label>
                <select
                  name="sex"
                  id="sex"
                  value={userData.sex}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="">Выберите</option>
                  <option value="male">Мужчина</option>
                  <option value="female">Женщина</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="login"
                  className="block text-sm font-medium text-gray-700"
                >
                  Логин:
                </label>
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={userData.login}
                  onChange={handleChange}
                  required
                  placeholder={guestData.login}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Изменить данные
            </button>
          </form>
        </div>
      </GeneralLayout>
    </div>
  );
}

export default SettingPage;
