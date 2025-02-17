"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { minioClient, ensurePublicBucket } from "@/lib/minio";

export async function getReservedWishes() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const reservedWishes = await prisma.gift.findMany({
    where: {
      reservedBy: user!.id,
    },
    include: {
      wishLists: {
        include: {
          wishList: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  return reservedWishes;
}

const UpdateWishSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  link: z.string().url().optional(),
  image: z.string().optional(),
  file: z
    .instanceof(File)
    .refine((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      return file ? validTypes.includes(file.type) : true;
    }, "File must be a valid image (JPEG, PNG, or WebP)")
    .refine((file) => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      return file ? file.size <= maxSize : true;
    }, "File size must be less than 5MB")
    .optional(),
});

export async function updateWish(
  id: string,
  data: {
    title?: string;
    description?: string;
    price?: number;
    link?: string;
    image?: string;
    file?: File;
  }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const parsed = UpdateWishSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wish = await prisma.gift.findFirst({
    where: {
      id,
      wishLists: {
        some: {
          wishList: {
            userId: user!.id,
          },
        },
      },
    },
  });

  if (!wish) {
    throw new Error("Wish not found or unauthorized");
  }

  let imageUrl = data.image;

  // Handle file upload if a file is provided
  if (data.file) {
    const bucketName = process.env.MINIO_BUCKET || "wishio";

    // Ensure bucket exists and is public
    await ensurePublicBucket(bucketName);

    const bytes = await data.file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const objectName = `${Date.now()}-${data.file.name}`;

    // Upload file to MinIO
    await minioClient.putObject(
      bucketName,
      objectName,
      buffer,
      data.file.size,
      {
        "Content-Type": data.file.type,
      }
    );

    // Construct the full URL
    imageUrl = `${process.env.MINIO_ENDPOINT_URL}/${bucketName}/${objectName}`;
  }

  const updatedWish = await prisma.gift.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      link: data.link,
      image: imageUrl,
    },
  });

  revalidatePath("/wishlists");
  return updatedWish;
}

export async function reserveWish(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wish = await prisma.gift.findUnique({
    where: { id },
    include: {
      wishLists: {
        include: {
          wishList: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!wish) {
    throw new Error("Wish not found");
  }

  const isOwnWish = wish.wishLists.some(
    (wl) => wl.wishList.userId === user!.id
  );
  if (isOwnWish) {
    throw new Error("You cannot reserve your own wish");
  }

  if (wish.reservedBy) {
    throw new Error("Wish is already reserved");
  }

  const updatedWish = await prisma.gift.update({
    where: { id },
    data: {
      reservedBy: user!.id,
      status: "RESERVED",
    },
  });

  revalidatePath("/wishlists");
  return updatedWish;
}

export async function unreserveWish(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wish = await prisma.gift.findFirst({
    where: {
      id,
      reservedBy: user!.id,
    },
  });

  if (!wish) {
    throw new Error("Wish not found or not reserved by you");
  }

  const updatedWish = await prisma.gift.update({
    where: { id },
    data: {
      reservedBy: null,
      status: "UNRESERVED",
    },
  });

  revalidatePath("/wishlists");
  return updatedWish;
}

const AddWishSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.number().optional(),
  link: z.string().url().optional(),
  image: z.string().optional(),
  file: z
    .instanceof(File)
    .refine((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      return file ? validTypes.includes(file.type) : true;
    }, "File must be a valid image (JPEG, PNG, or WebP)")
    .refine((file) => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      return file ? file.size <= maxSize : true;
    }, "File size must be less than 5MB")
    .optional(),
});

export async function addWishToWishlist(
  wishlistId: string,
  data: {
    title: string;
    description?: string;
    price?: number;
    link?: string;
    image?: string;
    file?: File;
  }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const parsed = AddWishSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wishList = await prisma.wishList.findFirst({
    where: {
      id: wishlistId,
      userId: user!.id,
    },
  });

  if (!wishList) {
    throw new Error("Wishlist not found");
  }

  let imageUrl = data.image;

  // Handle file upload if a file is provided
  if (data.file) {
    const bucketName = process.env.MINIO_BUCKET || "wishio";

    // Ensure bucket exists and is public
    await ensurePublicBucket(bucketName);

    const bytes = await data.file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const objectName = `${Date.now()}-${data.file.name}`;

    // Upload file to MinIO
    await minioClient.putObject(
      bucketName,
      objectName,
      buffer,
      data.file.size,
      {
        "Content-Type": data.file.type,
      }
    );

    // Construct the full URL
    imageUrl = `${process.env.MINIO_ENDPOINT_URL}/${bucketName}/${objectName}`;
  }

  const gift = await prisma.gift.create({
    data: {
      title: data.title,
      description: data.description ?? "",
      price: data.price,
      link: data.link,
      image: imageUrl,
      wishLists: {
        create: {
          wishListId: wishlistId,
        },
      },
    },
  });

  revalidatePath("/wishlists");
  revalidatePath(`/wishlists/${wishlistId}`);
  return gift;
}
