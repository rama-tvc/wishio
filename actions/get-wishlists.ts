"use server";

import { prisma } from "@/lib/prisma";

export const getWishlists = async (userId: string) => {
  const userWishlists = await prisma.wishlist.findMany({
    where: {
      userId: userId,
    },
  });

  return userWishlists;
};
