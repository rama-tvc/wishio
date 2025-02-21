"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { MobileMenu } from "./MobileMenu";
import { useEffect, useState } from "react";
import { getProfile } from "@/actions/profile/get";
import { useAuthModal } from "@/hooks/useAuthModal";

export default function Header() {
  const { openAuthModal } = useAuthModal();
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "",
    image: "",
  });
  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      setProfile({
        name: response.name || "",
        image: response.image || "/placeholder.png",
      });
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        openAuthModal();
      }
      console.error("Ошибка загрузки профиля:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [updateSession]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text">
          Wishio
        </Link>
        <nav className="hidden md:flex space-x-4 items-center">
          {session && (
            <div>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 mr-4"
              >
                Мои списки
              </Link>
              <Link
                href="/my-reserves"
                className="text-gray-600 hover:text-gray-900 mr-2"
              >
                Мои резервы
              </Link>
            </div>
          )}
          {session ? (
            <>
              <Avatar onClick={() => router.push("/profile")}>
                <AvatarImage
                  src={profile.image || "/placeholder.png"}
                  alt={profile.name || "User avatar"}
                />
                <AvatarFallback>
                  {profile.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button onClick={handleLogout}>Выйти</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button>Войти</Button>
              </Link>
              <Link href="/register">
                <Button>Регистрация</Button>
              </Link>
            </>
          )}
        </nav>
        <MobileMenu isLoggedIn={!!session} onLogout={handleLogout} />
      </div>
    </header>
  );
}
