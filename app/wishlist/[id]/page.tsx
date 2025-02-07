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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";
import AddGift from "@/components/AddGift";
import { useParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import SharedLink from "@/components/Sharing";

interface Wish {
  id: string;
  title: string;
  description: string;
  price?: number;
  link?: string;
  status: "RESERVED" | "UNRESERVED";
  image?: string;
}

interface Wishlist {
  id: string;
  title: string;
  description: string;
  date: string;
  wishes: { wish: Wish }[];
}

export default function WishlistPage() {
  const { data: session } = useSession();
  const params = useParams();
  const wishlistId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id || "";
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<string>("all");
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlists/${wishlistId}`);
        if (!response.ok) {
          throw new Error("Ошибка загрузки списка желаемого");
        }

        const data: Wishlist = await response.json();
        setWishlist(data);
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

    if (wishlistId) {
      fetchWishlist();
    }
  }, [wishlistId, session]);

  if (loading) {
    return <p className="text-center text-gray-500">Загрузка...</p>;
  }

  if (!wishlist) {
    return (
      <p className="text-center text-red-500">Список желаемого не найден</p>
    );
  }
  const wishes = wishlist.wishes
    .slice()
    .reverse()
    .map((item) => item.wish);

  const toggleLiked = (id: string) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredWishes = wishes
    ? wishes.filter((wish: Wish) => {
        if (activeTab === "all") return true;
        if (activeTab === "UNRESERVED") return wish.status === "UNRESERVED";
        if (activeTab === "RESERVED") return wish.status === "RESERVED";
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{wishlist.title}</h1>
            <p className="text-gray-600">{wishlist.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <SharedLink />
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
            <TabsTrigger value="UNRESERVED">Доступные</TabsTrigger>
            <TabsTrigger value="RESERVED">Зарезервированные</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWishes.length > 0 ? (
            filteredWishes.map((wish: Wish) => (
              <Card key={wish.id} className="overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={wish.image || "/placeholder.png"}
                    alt={wish.title || ""}
                    fill
                    className="mx-auto"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "";
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle>{wish.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{wish.description}</p>
                  <p className="text-lg font-semibold mt-2">{wish.price} тг</p>
                  <span className="text-lg font-semibold mt-2 hover:underline">
                    <Link href={`https://${wish.link}`}> {wish.link} </Link>
                  </span>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {wish.status === "UNRESERVED" ? (
                    <Button variant="outline">Зарезервировать</Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Зарезервировано
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      toggleLiked(wish.id);
                    }}
                  >
                    <Heart
                      className="h-6 w-6 transition-colors duration-200"
                      fill={liked[wish.id] ? "red" : "none"}
                      color={liked[wish.id] ? "red" : "gray"}
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
