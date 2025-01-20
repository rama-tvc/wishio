"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const createWishlist = async (title: string) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const wishlist = await prisma.wishlist.create({
    data: {
      title: title,
      userId: user.id,
    },
  });

  return wishlist;
};