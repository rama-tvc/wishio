"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getUserWishlists = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const userWishlists = await prisma.wishlist.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return userWishlists;
};
