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
} from "../components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useChange } from "@/hooks/useIsChange";
import { updateWishlist } from "@/actions/wishlists/actions";

interface EditWishlistProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wishlistId: string;
  initialTitle: string;
  initialDeadline: string;
}

export default function EditWishlist({
  open,
  onOpenChange,
  wishlistId,
  initialTitle,
  initialDeadline,
}: EditWishlistProps) {
  const [title, setTitle] = useState(initialTitle);
  const [deadline, setDeadline] = useState(initialDeadline);
  const [description, setDescription] = useState("");
  const { isChangeFetch, setIsChangeFetch } = useChange();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Сохраняем изменения:", {
      wishlistId,
      title,
      deadline,
      description,
    });
    try {
      const response = await updateWishlist(wishlistId, {
        title: title,
        description: description,
        deadline: new Date(deadline),
      });
      await setIsChangeFetch(!isChangeFetch);
    } catch (e) {
      console.error("Ошибка при редактировании:", e);
      toast({ title: "Ошибка", description: "Попробуйте еще раз" });
    } finally {
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать список желаний</DialogTitle>
          <DialogDescription>
            Измените поля списка или сохраните как есть
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
              <Label htmlFor="deadline">Дата</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
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
          </div>
          <DialogFooter>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
