"use server";

import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import ConfirmRegister from "../emails/ConfirmRegister";
import { render } from "@react-email/render";
import { z } from "zod";

const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signup(email: string, password: string) {
  try {
    // Validate input
    const result = SignupSchema.safeParse({ email, password });
    if (!result.success) {
      return {
        success: false,
        error: "Please enter a valid email and password (minimum 8 characters)",
      };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, error: "This email is already registered" };
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await hash(password, 10);

    // Save temporary user data
    await prisma.verificationToken.create({
      data: {
        email,
        token: verificationToken,
        hashedPassword,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
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

    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;

    // Send verification email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Confirm your registration",
      html: await render(ConfirmRegister({ verificationUrl })),
    });

    return {
      success: true,
      message: "Please check your email to verify your account",
    };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
