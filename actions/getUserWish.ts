"use server";
import { prisma } from "@/lib/prisma";

export const getUserWish = async (userId: string | undefined) => {
 
  try {
    const userWish = await prisma.wish.findMany({
      where: {
        userId: userId, 
      },
      select: {
        id: true,
        title: true,
        isReserved: true,
        imageUrl: true,
      },
    });
    return userWish;
  } catch (e) {
    console.error("Error fetching wishes:", e);
    throw new Error("Failed to fetch wishes");
  };
}