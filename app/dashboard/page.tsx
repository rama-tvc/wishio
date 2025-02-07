"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CreateWishlist from "@/components/CreateWishlist";
import Filters from "@/components/ui/filter";
import { useFilter } from "@/hooks/useFilter";
import VerticalMenu from "@/components/VerticalMenu";

interface WishlistItem {
  id: string;
  title: string;
  date: string;
  itemCount: number;
  status: "active" | "archived";
  lastModified: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [wishlists, setWishlists] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await fetch("/api/wishlists");
        if (!response.ok) {
          throw new Error("Failed to fetch wishlists");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const formattedWishlists = data.map((wishlist) => ({
            id: wishlist.id,
            title: wishlist.title,
            date: new Date(wishlist.deadline).toISOString().split("T")[0],
            itemCount: wishlist.wishes.length || 0,
            status: wishlist.status.toLowerCase() as "active" | "archived",
            lastModified: new Date(wishlist.updatedAt).toLocaleString(),
          }));

          setWishlists(formattedWishlists);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching wishlists:", error);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить данные списков желаемого",
        });
      }
    };

    if (session?.user?.email) {
      fetchWishlists();
    }
  }, [session]);

  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredWishlists = wishlists.filter((wishlist) => {
    if (activeTab === "all") return true;
    return wishlist.status === activeTab;
  });
  const ButtonHandleHidingFilter = () => {
    const { togglePanel } = useFilter();
    return (
      <Button variant="outline" onClick={togglePanel}>
        <Filter className="h-4 w-4 mr-2" />
        Фильтры
      </Button>
    );
  };

  const handleMenuAction = (actionId: number, wishlistId: string) => {
    alert(`действие ${actionId} выполнено для ${wishlistId}`);
    console.log("Действие для", wishlistId);
  };
  const { isOpen } = useFilter();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}

      <div
        className={`transition-transform duration-300 ease-in-out ${
          isOpen ? "-translate-x-180" : "-translate-x-full"
        }
        w-64 = "true"
         border-r = "true"
        bg-white = "true"
        p-6 = "true"`}
      >
        <Filters
          data={wishlists}
          onSort={(sortedData) => setWishlists(sortedData)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="p-6 min-h-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Мои списки желаний</h1>
            <div className="flex items-center space-x-4">
              <ButtonHandleHidingFilter />
              <CreateWishlist />
            </div>
          </div>

          <Tabs
            defaultValue="all"
            className="mb-6"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList>
              <TabsTrigger value="all">Все списки</TabsTrigger>
              <TabsTrigger value="active">Активные</TabsTrigger>
              <TabsTrigger value="archived">Архивные</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="bg-white rounded-lg shadow flex-grow min-h-[inherit] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Дата события</TableHead>
                  <TableHead>Количество подарков</TableHead>
                  <TableHead>Последнее изменение</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWishlists.length > 0 ? (
                  <>
                    {filteredWishlists.map((wishlist) => (
                      <TableRow key={wishlist.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/wishlist/${wishlist.id}`}
                            className="font-medium hover:underline"
                          >
                            {wishlist.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-500">{wishlist.date}</span>
                        </TableCell>
                        <TableCell>{wishlist.itemCount}</TableCell>
                        <TableCell>{wishlist.lastModified}</TableCell>
                        <TableCell>
                          {wishlist.status === "active" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Активный
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Архивный
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <VerticalMenu
                            onAction={(actionId) =>
                              handleMenuAction(actionId, wishlist.id)
                            }
                            title={wishlist.title}
                            wishlistId={wishlist.id}
                            deadline={wishlist.date}
                          />
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Пустая строка для растяжения списка */}
                    <TableRow>
                      <TableCell colSpan={7} className="py-20" />
                    </TableRow>
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-4 text-gray-500"
                    >
                      Нет данных
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
