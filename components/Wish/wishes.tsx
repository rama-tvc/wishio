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
      title: "Хочу айфон 16",
      isReserved: true,
    },
    {
      id: 2,
      title: "Хочу книгу по программированию",
      isReserved: false,
    },
  ]);

  const buttonReverse = (id: number) => {
    const updateWishes = wishes.map((wish) =>
      wish.id === id ? { ...wish, isReserved: !wish.isReserved } : wish
    );
    setWishes(updateWishes);
  };
//   const {changeBackground} = useTheme();

  return (
    <>
      {wishes.map((wish) => (
        <div key={wish.id}>
          <p>{wish.title}</p>
          <button onClick={() => buttonReverse(wish.id)} className="theme-change">
            {wish.isReserved ? "Available" : "Reserve"}
          </button>
        </div>
      ))}
    </>
  );
}

export default Wishes;
