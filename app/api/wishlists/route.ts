import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: any, res: any) => {
  const userWishlists = await prisma.wishlist.findMany({
    where: {
      userId: req.query.userId,
    },
  });

  return NextResponse.json(userWishlists);
};
