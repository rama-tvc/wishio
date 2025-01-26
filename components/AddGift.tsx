"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Gift } from "lucide-react";

export default function AddGift() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика добавления подарка
    console.log("Add gift:", name, description, price, link, image);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Gift className="mr-2 h-4 w-4" />
          Добавить подарок
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить подарок</DialogTitle>
          <DialogDescription>
            Добавьте новый подарок в ваш список желаний
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Название
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Описание
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Цена
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Ссылка
              </Label>
              <Input
                id="link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Изображение
              </Label>
              <Input
                id="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="col-span-3"
                placeholder="URL изображения"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Добавить подарок</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
