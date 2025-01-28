import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Находим токен в базе
    const verificationData = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationData) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }

    // Проверяем, не истек ли токен
    if (verificationData.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      return NextResponse.json(
        { message: "Verification token has expired" },
        { status: 400 }
      );
    }

    // Создаем пользователя
    await prisma.user.create({
      data: {
        email: verificationData.email,
        password: verificationData.hashedPassword,
      },
    });

    // Удаляем использованный токен
    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
