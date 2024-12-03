"use client"
import { useState } from "react";
import Link from "next/link";
import "./signin.css"

function SignIn () {

const [formData, setFormData] = useState({
            name: "",
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
            
            <div className="login-container">
            <form onSubmit={HandleSubmit} className="login-form">
              <div>
                <h1 className="login-title">Вход в WISHLIST:</h1>
                  <input
                  type="text"
                  className="login-input"
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
                  className="login-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Пароль*"
                />
                
                <button type="submit">Вход</button>
                <div className="login-footer">
                    <Link href="/sign-up">Зарегистрироваться</Link>
                </div>
              </div>
            </form>
            </div>

    )
}
export default SignIn