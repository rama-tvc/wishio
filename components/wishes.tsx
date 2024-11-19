"use client"
import { useState } from "react";

type Wish = {
  id: number;
  title: string;
  isReserved: boolean;
};

function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      title: "New phone",
      isReserved: true,
    },
    {
      id: 2,
      title: "New book",
      isReserved: false,
    },
  ]);

  const toggleReserved = (id: number) => {
    const updateWishes = wishes.map((wish) =>
      wish.id === id ? { ...wish, isReserved: !wish.isReserved } : wish
    );
    setWishes(updateWishes);
  };

  return (
    <>
      {wishes.map((wish) => (
        <div key={wish.id}>
          <p>{wish.title}</p>
          <button onClick={() => toggleReserved(wish.id)}>
            {wish.isReserved ? "Available" : "Reserve"}
          </button>
        </div>
      ))}
    </>
  );
}

export default Wishes;
