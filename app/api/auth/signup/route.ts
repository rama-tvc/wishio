/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Verification email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Email already exists or invalid input
 *       500:
 *         description: Internal server error
 */

// pages/api/auth/signup.ts
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import ConfirmRegister from "../emails/ConfirmRegister";
import { render } from "@react-email/render";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Создаем токен подтверждения
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await hash(password, 10);

    // Сохраняем временные данные пользователя
    await prisma.verificationToken.create({
      data: {
        email,
        token: verificationToken,
        hashedPassword,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 часа
      },
    });

    // Настраиваем отправку email
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Формируем ссылку для подтверждения
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;

    // Отправляем email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Подтвердите вашу регистрацию",
      html: await render(ConfirmRegister({ verificationUrl })),
    });

    return NextResponse.json(
      { message: "Verification email sent. Please check your inbox." },
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
