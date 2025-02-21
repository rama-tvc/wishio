"use client";
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
import { toast } from "@/hooks/use-toast";
import {
  getReservedWishes,
  reserveWish,
  unreserveWish,
} from "@/actions/gifts/actions";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface WishList {
  user: User;
}

interface WishLists {
  wishList: WishList;
}

interface GiftReserves {
  id: string;
  description: string;
  image: string;
  link: string;
  price: number;
  status: "RESERVED" | "UNRESERVED";
  title: string;
  wishLists: WishLists[];
}

export default function MyReservePage() {
  const [wishlist, setWishlist] = useState<GiftReserves[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [unReservedMap, setUnReservedMap] = useState<{
    [key: string]: boolean;
  }>({});
  const { data: session } = useSession();

  useEffect(() => {
    const fetchWishlist = async (attempt = 1, maxAttempts = 5) => {
      setLoading(true);

      try {
        const response = await getReservedWishes();
        console.log("response", response);

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
          const correctedData: GiftReserves[] = response.map((item) => ({
            id: item.id,
            description: item.description || "",
            image: item.image || "",
            link: item.link || "",
            price: item.price || 0,
            status: item.status,
            title: item.title,
            wishLists: item.wishLists.map((w) => ({
              wishList: {
                user: {
                  id: w.wishList.user.id,
                  email: w.wishList.user.email,
                  name: w.wishList.user.name ?? "Неизвестный пользователь",
                },
              },
            })),
          }));
          setWishlist(correctedData);
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
    if (session) {
      fetchWishlist();
    }
  }, [session]);

  useEffect(() => {
    console.log("wishlist", wishlist);
  }, [wishlist]);

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

  const reserveWishSend = async (wishId: string) => {
    try {
      await reserveWish(wishId);

      toast({
        title: "Зарезервировано",
        description: "Ваш подарок успешно зарезервирован",
      });
    } catch (e) {
      toast({
        title: "Резерв владельцем",
        description: "Вы не можете зарезервировать свой подарок",
      });
      console.error("Ошибка при резерве", e);
    }
  };

  const unReserveWishSend = async (wishId: string) => {
    try {
      await unreserveWish(wishId);

      toast({
        title: "Резерв отменен",
        description: "Резерв подарка отменен",
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
          {wishlist.map((wish) => (
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
                <CardTitle>{wish.title || "Без названия"}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-800">
                  {wish.description || "Дополнительная информация отсутствует"}
                </p>
              </CardContent>
              <CardContent>
                <p className="text-gray-800">
                  {wish.link || "Ссылка отсутствует"}
                </p>
              </CardContent>
              <CardContent>
                <p className="text-gray-800">{wish.price || 0}тг</p>
              </CardContent>

              <CardContent>
                <p className="mt-2 text-sm text-gray-500">
                  Подарок для:{" "}
                  {wish.wishLists.length > 0
                    ? wish.wishLists
                        .map(
                          (wItem) =>
                            wItem.wishList.user.name ??
                            wItem.wishList.user.email
                        )
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
                        await reserveWishSend(wish.id);
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
                        await unReserveWishSend(wish.id);
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
