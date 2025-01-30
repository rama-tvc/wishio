"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function findWishlistByUser(userId: string, wishlistId: string) {
  try {
    
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: wishlistId },
      include: {
        wishes: true, 
      },
    });


    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    if (wishlist.userId !== userId) {
      throw new Error("This wishlist does not belong to the user");
    }

    return wishlist;
  } catch (error) {
    console.error("Error finding wishlist by user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
