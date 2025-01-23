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
      date: "2025-12-31",
      itemCount: 3,
      status: "active",
      lastModified: "2024-01-19",
    },
  ]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-6">
        <div className="font-semibold mb-4">Фильтры</div>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500 mb-2">Статус</div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <Checkbox />
                <span className="text-sm">Активные</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox />
                <span className="text-sm">Архивные</span>
              </label>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-2">Сортировка</div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <Checkbox />
                <span className="text-sm">По дате создания</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox />
                <span className="text-sm">По названию</span>
              </label>
            </div>
          </div>
        </div>
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
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
              <CreateWishlist />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
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
                {wishlists.map((wishlist) => (
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
                    <TableCell>{wishlist.date}</TableCell>
                    <TableCell>{wishlist.itemCount}</TableCell>
                    <TableCell>{wishlist.lastModified}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {wishlist.status === "active" ? "Активный" : "Архивный"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
