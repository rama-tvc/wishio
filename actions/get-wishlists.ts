"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const getUserWishlists = async () => {
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
export default getUserWishlists;