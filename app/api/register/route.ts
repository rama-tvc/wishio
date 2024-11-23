import { NextResponse } from "next/server";

const users: { email: string; password: string }[] = [];

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Проверяем, существует ли пользователь
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  // Добавляем нового пользователя
  users.push({ email, password });

  return NextResponse.json({ message: "User registered successfully" });
}
