"use server";
import { prisma } from "@/lib/prisma";

export const getUserWish = async () => {
  try {
    const userWish = await prisma.wish.findMany({
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
  }
};
