"use client"
import { useState } from "react";
import React from "react";
import "./signup.css"
import Link from "next/link";

function SignUp () {
    
        const [formData, setFormData] = useState({
            name: "",
            surname: "",
            birthday: "",
            sex: "",
            login: "",
            password: "",
          });
        
          const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          }
          
        
          return (
            <div>
            <form onSubmit={HandleSubmit} className="formSignUp">
              <div>
                <h1 className="labelForm">Создайте новый аккаунт</h1>
                <h6>Это просто и быстро.</h6>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Имя*"
                />
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Фамилия"
                />
                <label htmlFor="birthday">Дата рождения:* </label>
                <input type="date" id="birthday" name="birthday" required min="1924-01-01" max="2024-12-31"/>
                <label htmlFor="Sex">Пол:</label>
                <select name="sex" id="sex" value={formData.sex} onChange={handleChange}>
                  <option value="">Выберите</option>
                  <option value="male">Мужчина</option>
                  <option value="female">Женщина</option>
                </select>
                  <input type="date" id="birthday" name="birthday" value={formData.birthday}
                  onChange={handleChange} required min="1924-01-01" max="2024-12-31"/>
                  <input
                  type="text"
                  id="login"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  required
                  placeholder="Логин*"
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Пароль*"
                />
                
                <button type="submit" className="theme-change">Зарегистрироваться</button>
              </div>
            </form>
            <h1>Есть аккаунт?</h1>
            <Link href="/sign-in" className="sign-inLogin">Вход</Link>
            </div>
          )}
    


export default SignUp;