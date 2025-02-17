"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const VerifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export async function verifyEmailAction(token: string) {
  try {
    // Validate input
    const result = VerifyEmailSchema.safeParse({ token });
    if (!result.success) {
      throw new Error("Token is required");
    }

    // Find token in database
    const verificationData = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationData) {
      throw new Error("Invalid verification token");
    }

    // Check if token has expired
    if (verificationData.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      throw new Error("Verification token has expired");
    }

    // Create user
    await prisma.user.create({
      data: {
        email: verificationData.email,
        password: verificationData.hashedPassword,
      },
    });

    // Delete used token
    await prisma.verificationToken.delete({ where: { token } });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to verify email");
  }
}
