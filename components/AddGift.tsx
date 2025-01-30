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
import Image from "next/image";

export default function AddGift() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("link", link);
    formData.append("image", image);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch("api/profile/update", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile updated:", data);
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
                Название*
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
                placeholder="Название подарка"
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
                placeholder="Опишите подарок"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Цена*
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="col-span-3"
                  placeholder="Стоимость подарка в тенге"
                  required
                />
                <span className="ml-2 text-gray-500">тг</span>
              </div>
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
                placeholder="Ссылка с marketplace"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label
                htmlFor="upload-photo"
                className="cursor-pointer inline-block"
                onClick={handleImageChange}
              >
                <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg">
                  Добавить фото
                </Button>
              </label>
              <div className="w-16 h-16 ml-16 overflow-hidden rounded-md border border-gray-300 bg-gray-100">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt="Image"
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="object-cover w-full h-full text-xs break-all">
                    Нет изображения
                  </div>
                )}
              </div>
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
