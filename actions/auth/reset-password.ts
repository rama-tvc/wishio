"use server";

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */

import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { z } from "zod";

const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export async function resetPassword(token: string, newPassword: string) {
  try {
    // Validate input
    const result = ResetPasswordSchema.safeParse({ token, newPassword });
    if (!result.success) {
      throw new Error("Token and new password are required");
    }

    // Find token in database
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      throw new Error("Invalid reset token");
    }

    // Check if token has expired
    if (resetToken.expires < new Date()) {
      await prisma.passwordResetToken.delete({ where: { token } });
      throw new Error("Reset token has expired");
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10);

    // Update user's password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    });

    // Delete used token
    await prisma.passwordResetToken.delete({ where: { token } });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to reset password");
  }
}
