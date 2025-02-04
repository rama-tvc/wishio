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
import { render } from "@react-email/render";
import PasswordResetEmail from "../emails/PasswordResetEmail";

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

    // Generate the HTML email using React Email
    const emailHtml = await render(PasswordResetEmail({ resetUrl }));

    // Отправляем email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Сброс пароля",
      html: emailHtml,
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
