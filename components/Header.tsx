"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { MobileMenu } from "./MobileMenu";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  console.log("session", session);
  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text">
          Wishio
        </Link>
        <nav className="hidden md:flex space-x-4 items-center">
          {session && (
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              Мои списки
            </Link>
          )}
          {session ? (
            <>
              <Avatar>
                <AvatarImage
                  src={session.user?.image || "/placeholder.svg"}
                  alt={session.user?.name || "User avatar"}
                />
                <AvatarFallback>
                  {session.user?.name?.[0] || "U"}
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
