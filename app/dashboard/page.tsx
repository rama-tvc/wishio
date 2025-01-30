"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Gift, Calendar, MoreVertical, Search, Filter } from "lucide-react";
import CreateWishlist from "@/components/CreateWishlist";
import Filters from "@/components/ui/Filters";
import { useFilter } from "@/hooks/useFilter";

interface WishlistItem {
  id: string;
  title: string;
  date: string;
  itemCount: number;
  status: "active" | "archived";
  lastModified: string;
}

export default function Dashboard() {
  const [wishlists, setWishlists] = useState<WishlistItem[]>([
    {
      id: "1",
      title: "День рождения 2025",
      date: "2025-06-15",
      itemCount: 5,
      status: "active",
      lastModified: "2024-01-20",
    },
    {
      id: "2",
      title: "Новый год 2026",
      date: "2025-05-31",
      itemCount: 3,
      status: "archived",
      lastModified: "2024-01-19",
    },
  ]);
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
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Мои списки желаний</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Поиск списков..." className="pl-10 w-64" />
              </div>
              <ButtonHandleHidingFilter />
              <CreateWishlist />
            </div>
          </div>

          <Tabs
            defaultValue="active"
            className="mb-6"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList>
              <TabsTrigger value="all">Все списки</TabsTrigger>
              <TabsTrigger value="active">Активные</TabsTrigger>
              <TabsTrigger value="archived">Архивные</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="bg-white rounded-lg shadow">
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
                  filteredWishlists.map((wishlist) => (
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
                    </TableRow>
                  ))
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
