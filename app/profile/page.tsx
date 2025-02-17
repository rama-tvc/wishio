"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { getProfile } from "@/actions/profile/get";
import { updateProfile } from "@/actions/profile/update";

export default function Profile() {
  const { data: session, update: updateSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setName(response.name || "");
        setEmail(response.email || "");
        setImageUrl(response.image || "");
        setPreviewUrl(response.image || "");

        if (response.birthdate) {
          const date = new Date(response.birthdate);
          const formattedDate = date.toISOString().split("T")[0];
          setBirthdate(formattedDate);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Ошибка загрузки профиля",
          description: "Не удалось загрузить данные профиля",
        });
      }
    };

    if (session?.user?.email) {
      fetchProfile();
    }
  }, [session]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 5MB",
      });
      return;
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Ошибка",
        description: "Допустимые форматы: JPEG, PNG, WebP",
      });
      return;
    }

    // Store the file and create preview
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert birthdate to ISO string format for the server
      const birthdateISO = birthdate
        ? new Date(birthdate).toISOString()
        : undefined;

      // Prepare update data
      const updateData = {
        name,
        birthdate: birthdateISO,
        image: imageUrl,
        file: selectedFile || undefined,
      };

      const updatedUser = await updateProfile(updateData);

      // Update session and UI
      await updateSession();
      setImageUrl(updatedUser.image || "");
      setPreviewUrl(updatedUser.image || "");
      setSelectedFile(null);

      toast({
        title: "Профиль успешно обновлен",
        description: "Ваши изменения сохранены",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      // Reset preview on error
      setPreviewUrl(imageUrl);
      toast({
        title: "Ошибка при обновлении профиля",
        description: "Попробуйте еще раз",
      });
    } finally {
      setIsLoading(false);
    }
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
            <Avatar
              className="w-20 h-20 cursor-pointer"
              onClick={handleImageClick}
            >
              <AvatarImage
                src={previewUrl || "/placeholder.svg"}
                alt="Profile picture"
              />
              <AvatarFallback>
                {name?.slice(0, 2).toUpperCase() || "ИИ"}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
            />
            <Button
              onClick={handleImageClick}
              disabled={isLoading}
              variant="secondary"
            >
              {isLoading ? "Загрузка..." : "Изменить фото"}
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  disabled
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
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
