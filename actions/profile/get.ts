"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
export async function getProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email ?? "",
    },
    select: {
      name: true,
      email: true,
      image: true,
      birthdate: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
