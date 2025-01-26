"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const [name, setName] = useState("Иван Иванов");
  const [email, setEmail] = useState("ivan@example.com");
  const [birthdate, setBirthdate] = useState("1990-01-01");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика обновления профиля
    console.log("Update profile:", name, email, birthdate);
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Профиль пользователя</CardTitle>
          <CardDescription>Управляйте своей личной информацией</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg" alt="Profile picture" />
              <AvatarFallback>ИИ</AvatarFallback>
            </Avatar>
            <Button>Изменить фото</Button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="birthdate">Дата рождения</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Сохранить изменения
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
