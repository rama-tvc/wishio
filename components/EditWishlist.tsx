"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Pencil } from "lucide-react";

interface EditWishlistProps {
  id: string;
  title: string;
  description: string;
  date: string;
  onSave: (
    id: string,
    title: string,
    description: string,
    date: string
  ) => void;
}

export default function EditWishlist({
  id,
  title: initialTitle,
  description: initialDescription,
  date: initialDate,
  onSave,
}: EditWishlistProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [date, setDate] = useState(initialDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(id, title, description, date);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Редактировать
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать список желаний</DialogTitle>
          <DialogDescription>
            Внесите изменения в ваш список желаний
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="title">Название списка</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date">Дата события</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Сохранить изменения</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
