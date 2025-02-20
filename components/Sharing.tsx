"use client";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2 } from "lucide-react";

export default function SharedLink({ getToken }: { getToken: string }) {
  const [title, setTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "";

  useEffect(() => {
    setTitle(`${API_BASE_URL}/sharePage/${getToken}`);
  }, [getToken, API_BASE_URL]);

  const handleCopy = (e: React.FormEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(title);
    toast({ title: "Ссылка скопирована в буфер обмена" });
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Поделиться
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ссылка на список</DialogTitle>
          <DialogDescription>
            Отправьте эту ссылку друзьям, чтобы они могли зарезервировать
            подарки
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Ссылка на список
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                disabled
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCopy}>Скопировать</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
