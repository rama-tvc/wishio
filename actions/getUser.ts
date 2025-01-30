"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function findUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
   
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error finding wishes:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}