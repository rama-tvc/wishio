"use server";

import prisma from "@/lib/prisma";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import { render } from "@react-email/render";
import PasswordResetEmail from "../emails/PasswordResetEmail";

export async function forgotPassword(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  // Create password reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Save token in database
  await prisma.passwordResetToken.create({
    data: {
      email,
      token: resetToken,
      expires: new Date(Date.now() + 3600000), // 1 hour
    },
  });

  // Configure email transport
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Create reset password URL
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  // Generate HTML email using React Email
  const emailHtml = await render(PasswordResetEmail({ resetUrl }));

  // Send email
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Reset Password",
    html: emailHtml,
  });

  return { success: true };
}
