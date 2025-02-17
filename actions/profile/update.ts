"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { minioClient, ensurePublicBucket } from "@/lib/minio";

const ProfileUpdateSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  birthdate: z.string().datetime().optional(),
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

export async function updateProfile(data: {
  name?: string;
  image?: string;
  birthdate?: string;
  file?: File;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = ProfileUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  let birthdateObj = undefined;
  if (parsed.data.birthdate) {
    birthdateObj = new Date(parsed.data.birthdate);
    if (isNaN(birthdateObj.getTime())) {
      throw new Error("Invalid birthdate format");
    }
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

  const user = await prisma.user.update({
    where: {
      email: session.user.email ?? "",
    },
    data: {
      name: parsed.data.name,
      image: imageUrl,
      birthdate: birthdateObj,
    },
    select: {
      name: true,
      email: true,
      image: true,
      birthdate: true,
    },
  });

  return user;
}
