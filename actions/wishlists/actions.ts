"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { v4 as uuidv4 } from "uuid";

export async function getWishlists() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wishLists = await prisma.wishList.findMany({
    where: { userId: user!.id },
    include: {
      gifts: {
        include: {
          gift: true,
        },
      },
    },
  });

  return wishLists;
}

export async function createWishlist(data: {
  title: string;
  description: string;
  deadline: Date;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wishList = await prisma.wishList.create({
    data: {
      userId: user!.id,
      title: data.title,
      description: data.description,
      deadline: new Date(data.deadline),
      shareToken: uuidv4(),
    },
  });

  return wishList;
}

export async function getWishlistById(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wishList = await prisma.wishList.findFirst({
    where: {
      id,
      userId: user!.id,
    },
    include: {
      gifts: {
        include: {
          gift: true,
        },
      },
    },
  });

  if (!wishList) {
    throw new Error("Wishlist not found");
  }

  return wishList;
}

export async function updateWishlist(
  id: string,
  data: {
    title?: string;
    description?: string;
    deadline?: Date;
  }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wishList = await prisma.wishList.findFirst({
    where: {
      id,
      userId: user!.id,
    },
  });

  if (!wishList) {
    throw new Error("Wishlist not found");
  }

  const updatedWishList = await prisma.wishList.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
    },
  });

  return updatedWishList;
}

export async function deleteWishlist(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wishList = await prisma.wishList.findFirst({
    where: {
      id,
      userId: user!.id,
    },
  });

  if (!wishList) {
    throw new Error("Wishlist not found");
  }

  await prisma.wishList.delete({
    where: { id },
  });
}

export async function getWishlistByToken(token: string) {
  const wishList = await prisma.wishList.findFirst({
    where: {
      shareToken: token,
    },
    include: {
      gifts: {
        include: {
          gift: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!wishList) {
    throw new Error("Wishlist not found");
  }

  return wishList;
}
