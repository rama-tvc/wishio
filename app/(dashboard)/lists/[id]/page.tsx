"use client"

import "../listPage.css";
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
function ListPage() {
  const params = useParams();
  const { id } = params;

  const guestData = {
    id, 
    name: "guest",
    surname: "GuestS",
    birthday: "2000-01-31",
    sex: "",
    login:"Guest"
  }

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    birthday: "",
    sex: "",
    login: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
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
  }

  return (
    <div className="idInfo">
       <form onSubmit={HandleSubmit} className="formInfo">
        <label htmlFor="">Личные данные {id}</label>
              <div>
               <label htmlFor="name">Имя:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  required
                  placeholder={guestData.name}
                />
                <label htmlFor="surname">Фамилия:</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={userData.surname}
                  onChange={handleChange}
                  placeholder={guestData.surname}
                />
                <label htmlFor="birthday">Дата рождения:* </label>
                <input type="date" id="birthday" name="birthday" value={userData.birthday}
                  onChange={handleChange} required min="1924-01-01" max="2024-12-31"/>
                <label htmlFor="Sex">Пол:</label>
                <select name="sex" id="sex" value={userData.sex} onChange={handleChange}>
                  <option value="">Выберите</option>
                  <option value="male">Мужчина</option>
                  <option value="female">Женщина</option>
                </select>
                 <label htmlFor="login">Логин:</label>
                  <input
                  type="text"
                  id="login"
                  name="login"
                  value={userData.login}
                  onChange={handleChange}
                  required
                  placeholder={guestData.login}
                />
              
                
                <button type="submit" className="theme-change">Изменить данные</button>
              </div>
            </form>
      <h1>Личные данные {guestData.id}</h1>
    
    </div>
  );
}
export default ListPage;
