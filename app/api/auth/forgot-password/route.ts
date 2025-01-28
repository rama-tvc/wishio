/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset instructions sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Проверяем существование пользователя
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Создаем токен для сброса пароля
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Сохраняем токен в базе
    await prisma.passwordResetToken.create({
      data: {
        email,
        token: resetToken,
        expires: new Date(Date.now() + 3600000), // 1 час
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

    // Формируем ссылку для сброса пароля
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // Отправляем email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Сброс пароля",
      html: `
        <h1>Сброс пароля</h1>
        <p>Вы запросили сброс пароля. Перейдите по ссылке ниже для установки нового пароля:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Ссылка действительна в течение 1 часа.</p>
        <p>Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
      `,
    });

    return NextResponse.json(
      { message: "Password reset instructions sent to your email" },
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
