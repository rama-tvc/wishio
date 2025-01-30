// app/wishlist/[userId]/[wishlistId]/page.tsx
"use client"; // говорим, что это Client Component

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Heart } from "lucide-react";
import AddGift from "@/components/AddGift";

interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  reserved: boolean;
}

export default function WishlistPage() {
  // const { userId, wishlistId } = params;

  const [wishlist, setWishlist] = useState({
    id: "1",
    title: "День рождения 2025",
    description: "Мой список желаний на 35-летие",
    date: "2025-06-15",
    gifts: [
      {
        id: "1",
        name: "Книга 'Мастер и Маргарита'",
        description: "Любимое произведение, хочу иметь в коллекционном издании",
        price: 2000,
        image: "/placeholder.svg?height=200&width=200",
        reserved: false,
      },
      {
        id: "2",
        name: "Фитнес-браслет",
        description: "Для отслеживания активности и сна",
        price: 5000,
        image: "/placeholder.svg?height=200&width=200",
        reserved: true,
      },
      {
        id: "3",
        name: "Кофемашина",
        description: "Автоматическая кофемашина для дома",
        price: 30000,
        image: "/placeholder.svg?height=200&width=200",
        reserved: false,
      },
    ],
  });
  // const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  const toggleLiked = (id: string) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // useEffect(() => {
  //   const fetchWishList = async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/user/${userId}/${wishlistId}/wishes`
  //       );
  //       const data = await response.json();
  //       setWishlist(data);
  //     } catch (error) {
  //       console.error("Ошибка при получении вишлиста:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchWishList();
  // }, [userId, wishlistId]);

  // if (loading) return <p>Loading...</p>;
  // if (!wishlist) return <p>Не удалось загрузить вишлист.</p>;

  const filteredWishes = wishlist.gifts.filter((gift: Gift) => {
    if (activeTab === "all") return true;
    if (activeTab === "available") return !gift.reserved;
    if (activeTab === "reserved") return gift.reserved;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{wishlist.title}</h1>
            <p className="text-gray-600">{wishlist.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Поделиться
            </Button>
            <AddGift />
          </div>
        </div>

        <Tabs
          defaultValue="all"
          className="mb-8"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList>
            <TabsTrigger value="all">Все подарки</TabsTrigger>
            <TabsTrigger value="available">Доступные</TabsTrigger>
            <TabsTrigger value="reserved">Зарезервированные</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWishes.length > 0 ? (
            filteredWishes.map((gift: Gift) => (
              <Card key={gift.id} className="overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={gift.image || "/placeholder.svg"}
                    alt={gift.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{gift.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{gift.description}</p>
                  <p className="text-lg font-semibold mt-2">{gift.price} тг</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled={gift.reserved}>
                    {gift.reserved ? "Зарезервировано" : "Зарезервировать"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      toggleLiked(gift.id);
                    }}
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
            <div className="col-span-3">
              <p className="text-center text-gray-600">Отсутствует</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
