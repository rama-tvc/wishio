"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "@/hooks/use-toast";
import { useChange } from "@/hooks/useIsChange";
import { getReservedWishes } from "@/actions/gifts/actions";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface WishList {
  id: string;
  name: string;
  user: User;
}

interface WishListRelation {
  wishList: WishList;
}

interface Gift {
  id: string;
  name: string;
  reservedBy: string;
  wishLists: WishListRelation[];
}

export default function MyReservePage() {
  const [wishlist, setWishlist] = useState<Gift | null>(null);
  const [loading, setLoading] = useState(true);
  const [unReservedMap, setUnReservedMap] = useState<{
    [key: string]: boolean;
  }>({});
  const { isChangeFetch } = useChange();

  const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

  useEffect(() => {
    const fetchWishlist = async (attempt = 1, maxAttempts = 5) => {
      setLoading(true);

      try {
        const response = await getReservedWishes();
        console.log("response", response);
        const correctedData: WishListRelation[] = response.flatMap((item) =>
          item.wishLists.map((w) => w.wishList)
        );

        if (!Array.isArray(response) || response.length === 0) {
          console.log(
            `Попытка ${attempt}: данные не получены, повторный запрос...`
          );

          if (attempt < maxAttempts) {
            setTimeout(() => fetchWishlist(attempt + 1, maxAttempts), 2000);
          } else {
            console.error("Максимальное количество попыток достигнуто.");
            setWishlist(null);
            toast({
              title: "Ошибка",
              description: "Не удалось загрузить список желаемого",
            });
          }
        } else {
          setWishlist({
            wishLists: response,
          });
          console.log(wishlist);
        }
      } catch (error) {
        console.error("Ошибка при загрузке:", error);

        if (attempt < maxAttempts) {
          setTimeout(() => fetchWishlist(attempt + 1, maxAttempts), 2000);
        } else {
          toast({
            title: "Ошибка",
            description: "Не удалось загрузить список желаемого",
          });
        }
      } finally {
        setLoading(false);
      }
    };
    if (!wishlist) {
      fetchWishlist();
    }
  }, [isChangeFetch, API_BASE_URL, wishlist]);

  if (loading) {
    return <p className="text-center text-gray-500">Загрузка...</p>;
  }

  if (!wishlist) {
    return (
      <p className="text-center text-red-500">
        Список зарезервированных подарков отсутствует
      </p>
    );
  }

  const reserveWish = async (wishId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/wishes/${wishId}/reserve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "RESERVED",
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Ошибка резерва");
      }

      toast({
        title: "Зарезервировано",
        description: "Ваш подарок успешно зарезервирован",
      });
      console.log(response);
    } catch (e) {
      toast({
        title: "Резерв владельцем",
        description: "Вы не можете зарезервировать свой подарок",
      });
      console.error("Ошибка при резерве", e);
    }
  };

  const unReserveWish = async (wishId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/wishes/${wishId}/reserve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "UNRESERVED",
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Ошибка резерва");
      }

      toast({
        title: "Резерв отменен",
        description: "Резерв подарка отменен",
      });

      setWishlist((prev) => {
        if (!prev || !prev.wishLists) return prev;
        return {
          ...prev,
          wishes: prev.wishLists.map((wishRelation) =>
            wishRelation.wishList.id === wishId
              ? { ...wishRelation.wishList, status: "UNRESERVED" }
              : wishRelation.wishList
          ),
        };
      });
    } catch (e) {
      toast({
        title: "Ошибка",
        description: "Вы не можете отменить резерв другого пользователя",
      });
      console.error("Ошибка при резерве", e);
    }
  };
  const toggleReserveStatus = (wishId: string) => {
    setUnReservedMap((prev) => ({
      ...prev,
      [wishId]: !prev[wishId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Мои зарезервированные желания
            </h1>
            <p className="text-gray-600">
              Список желаемого, которое я зарезервировал
            </p>
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist?.wishes?.map((wish) => (
            <Card key={wish.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={wish.image || "/placeholder.png"}
                  alt={wish.title || "Без названия"}
                  fill
                  className="mx-auto"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/placeholder.png";
                  }}
                />
              </div>

              <CardHeader>
                <CardTitle>{wish.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600">{wish.description}</p>
                <p className="text-lg font-semibold mt-2">
                  {wish.price ? `${wish.price} тг` : "Цена не указана"}
                </p>
                {wish.link && (
                  <span className="text-lg font-semibold mt-2 hover:underline">
                    <Link
                      href={
                        wish.link.startsWith("http")
                          ? wish.link
                          : `https://${wish.link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {wish.link}
                    </Link>
                  </span>
                )}
              </CardContent>
              <CardContent>
                {" "}
                <p className="mt-2 text-sm text-gray-500">
                  Подарок для:{" "}
                  {(wish?.wishLists?.length ?? 0 > 0)
                    ? wish?.wishLists
                        ?.map((wishItem) => wishItem.wishList?.user?.name)
                        .join(", ")
                    : "Неизвестный пользователь"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {unReservedMap[wish.id] ? (
                  <Button
                    variant="outline"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={async () => {
                      try {
                        await reserveWish(wish.id);
                        toggleReserveStatus(wish.id);
                      } catch (e) {
                        console.error("error", e);
                      }
                    }}
                  >
                    Зарезервировать
                  </Button>
                ) : (
                  <Button
                    className="bg-gray-300 text-gray-700 hover:bg-red-500"
                    variant="outline"
                    onClick={async () => {
                      try {
                        await unReserveWish(wish.id);
                        toggleReserveStatus(wish.id);
                      } catch (e) {
                        console.error("error", e);
                      }
                    }}
                  >
                    Зарезервировано
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
