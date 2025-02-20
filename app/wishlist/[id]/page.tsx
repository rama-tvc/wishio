"use client";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddGift from "@/components/AddGift";
import { toast } from "@/hooks/use-toast";
import SharedLink from "@/components/Sharing";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useChange } from "@/hooks/useIsChange";
import { getWishlistById, getWishlists } from "@/actions/wishlists/actions";
import { unreserveWish } from "@/actions/gifts/actions";

interface Wishiochka {
  id: string;
  link?: string | null;
  description?: string;
  image?: string | null;
  price?: number | null;
  status?: string | null;
  title?: string | null;
}
interface Wishes {
  gift: Wishiochka;
}
interface IWishlistItem {
  id: string;
  shareToken?: string | null;
  description?: string;
  title?: string | null;
  gifts: Wishes[];
}

interface IWishList {
  shareToken: string;
  description: string;
  gifts: IWishlistItem[];
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<IWishList | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [unReservedMap, setUnReservedMap] = useState<{
    [key: string]: boolean;
  }>({});
  const { isChangeFetch } = useChange();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");
  const params = useParams();
  const wishlistId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id || "";

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlistById(wishlistId);
        if (data) {
          setTitle(data.title || "");
          setDescription(data.description || "");
          setToken(data.shareToken || "");

          const formattedGifts: IWishlistItem[] = data.gifts.map(
            (item, index) => ({
              id: item.gift.id || `temp-${index}`, // Если id отсутствует, создаём временный
              description: item.gift.description || "",
              title: item.gift.title || "",
              gifts: [{ gift: item.gift }], // Превращаем `gift` в `gifts[]`
            })
          );

          setWishlist({
            shareToken: data.shareToken || "",
            description: data.description || "",
            gifts: formattedGifts,
          });
        }

        console.log("data", data);
        console.log("gifts", data.gifts);
        console.log("wishlist", wishlist);
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить список желаемого",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isChangeFetch]);

  if (loading) {
    return <p className="text-center text-gray-500">Загрузка...</p>;
  }

  if (!wishlist) {
    return (
      <div className="flex justify-between items-center my-7">
        <p className="flex-1 text-center items-end text-red-500">
          Список желаемого не найден
        </p>
        <div className="flex-1 text-center items-center space-x-4">
          <AddGift />
        </div>
      </div>
    );
  }

  const wishes = wishlist.gifts.slice().reverse();

  const filteredWishes = wishes
    ? wishes.filter((gift: Wishiochka) => {
        if (activeTab === "all") return true;
        if (activeTab === "UNRESERVED") return gift.status === "UNRESERVED";
        if (activeTab === "RESERVED") return gift.status === "RESERVED";
      })
    : [];

  const reserveWish = async (wishId: string) => {
    try {
      const response = await reserveWish(wishId);

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
      throw e;
    }
  };
  const unReserveWish = async (wishId: string) => {
    try {
      const response = await unreserveWish(wishId);

      toast({
        title: "Резерв отменен",
        description: "Резерв подарка отменен",
      });
    } catch (e) {
      toast({
        title: "Отмена резерва другим пользователем ",
        description: "Вы не можете отменить резерв другого пользователя",
      });
      console.error("Ошибка при резерве", e);
      throw e;
    }
  };

  const toggleReserveStatus = (
    wishId: string,
    wishStatus: "RESERVED" | "UNRESERVED"
  ) => {
    setUnReservedMap((prev) => {
      if (wishStatus === "RESERVED") {
        return { ...prev, [wishId]: false };
      } else if (wishStatus === "UNRESERVED") {
        return { ...prev, [wishId]: true };
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* <div className="flex items-center justify-center font-semibold">
          Владелец списка: {wishlist.userId}
        </div> */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <SharedLink getToken={token} />
            <AddGift />
          </div>
          <div className="block md:hidden">
            <div className="relative p-2">
              <SharedLink getToken={token} />
            </div>
            <div className="relative p-2">
              <AddGift />
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          className="mb-8"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList>
            <TabsTrigger value="all">Все подарки</TabsTrigger>
            <TabsTrigger value="UNRESERVED">Доступные</TabsTrigger>
            <TabsTrigger value="RESERVED">Зарезервированные</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWishes.length > 0 ? (
            filteredWishes.map((gift: Wishiochka) => (
              <Card key={gift.id} className="overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={gift.image || "/placeholder.png"}
                    alt={gift.title || ""}
                    fill
                    className="mx-auto"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "";
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle>{gift.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{gift.description}</p>
                  <p className="text-lg font-semibold mt-2">{gift.price} тг</p>
                  <span className="text-lg font-semibold mt-2 hover:underline">
                    <Link href={`https://${gift.link}`}> {gift.link} </Link>
                  </span>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {unReservedMap[gift.id] || gift.status === "RESERVED" ? (
                    <Button
                      className="bg-gray-300 text-gray-700 hover:bg-red-500"
                      variant="outline"
                      onClick={async () => {
                        try {
                          await unReserveWish(gift.id);
                          toggleReserveStatus(gift.id, "RESERVED");
                        } catch (e) {
                          console.error("error", e);
                        }
                      }}
                    >
                      Зарезервировано
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={async () => {
                        try {
                          await reserveWish(gift.id);
                          toggleReserveStatus(gift.id, "UNRESERVED");
                        } catch (e) {
                          console.error("error", e);
                        }
                      }}
                    >
                      Зарезервировать
                    </Button>
                  )}
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
