"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// Определяем интерфейс для подарка
interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  reserved?: boolean;
}

export default function MyReservePage() {
  const [wishlist, setWishlist] = useState<{ myReserveGifts: Gift[] }>({
    myReserveGifts: [
      {
        id: "1",
        name: "Книга 'Мастер и Маргарита'",
        description: "Любимое произведение, хочу иметь в коллекционном издании",
        price: 2000,
        image: "/placeholder.svg?height=200&width=200",
        reserved: true,
      },
      {
        id: "3",
        name: "Кофемашина",
        description: "Автоматическая кофемашина для дома",
        price: 30000,
        image: "/placeholder.svg?height=200&width=200",
        reserved: true,
      },
    ],
  });

  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const [showCancel, setShowCancel] = useState<{ [key: string]: boolean }>({});

  // Функция переключения лайка
  const toggleLiked = (id: string) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Функция переключения показа "Отменить резерв"
  const toggleShowCancel = (id: string) => {
    setShowCancel((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Фильтруем только зарезервированные подарки
  const reservedGifts = wishlist.myReserveGifts.filter((gift) => gift.reserved);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Заголовок */}
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        🎁 Мои зарезервированные подарки
      </h2>

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservedGifts.length > 0 ? (
          reservedGifts.map((gift) => (
            <Card
              key={gift.id}
              className="overflow-hidden shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl bg-white"
            >
              {/* Изображение */}
              <div className="relative h-56 bg-gray-100">
                <Image
                  src={gift.image || "/placeholder.svg"}
                  alt={gift.name}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>

              {/* Контент карточки */}
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {gift.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4">
                <p className="text-gray-600">{gift.description}</p>
                <p className="text-xl font-bold mt-3 text-gray-800">
                  {gift.price} тг
                </p>
              </CardContent>

              {/* Футер карточки */}
              <CardFooter className="p-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  className={`transition-all ${
                    showCancel[gift.id]
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => toggleShowCancel(gift.id)}
                >
                  {showCancel[gift.id]
                    ? "❌ Отменить резерв"
                    : "✅ Зарезервировано"}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:scale-110 transition-transform"
                  onClick={() => toggleLiked(gift.id)}
                >
                  <Heart
                    className="h-6 w-6 transition-colors duration-200"
                    fill={liked[gift.id] ? "red" : "none"}
                    color={liked[gift.id] ? "red" : "gray"}
                  />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          // Если подарков нет
          <div className="col-span-3 flex flex-col items-center text-gray-600">
            <p className="text-lg">😔 Нет зарезервированных подарков</p>
            <p className="text-sm text-gray-500 mt-2">
              Как только появятся зарезервированные подарки, они отобразятся
              здесь.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
