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
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { signup } from "@/actions/auth/signup";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const res = await signup(email, password);
      if (res.success) {
        setSuccess(
          res.message || "Please check your email to verify your account"
        );
        setEmail("");
        setPassword("");
      } else {
        setError(res.error || "An unexpected error occurred");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Регистрация в Wishio</CardTitle>
          <CardDescription>
            Создайте аккаунт, чтобы начать использовать Wishio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 text-sm text-green-500 bg-green-50 border border-green-200 rounded-md">
                  {success}
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Регистрация..." : "Зарегистрироваться"}
              </Button>
            </div>
          </form>
          <div className="mt-4">
            <p className="text-center text-sm text-gray-600 my-4">
              Или зарегистрируйтесь через
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <FaGoogle className="mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <FaFacebook className="mr-2" />
                Facebook
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 w-full">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Войти
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
