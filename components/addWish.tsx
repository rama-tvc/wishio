"use client";

import { useState } from "react";

function AddWish() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
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

  return (
    <form onSubmit={HandleSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="present">Название подарка:</label>
        <input
          type="text"
          id="present"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Отправить</button>
      </div>
    </form>
  );
}

export default AddWish;
