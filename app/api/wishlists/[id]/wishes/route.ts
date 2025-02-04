import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../../auth/[...nextauth]/route";

/**
 * @swagger
 * /api/wishlists/{id}/wishes:
 *   post:
 *     summary: Add a wish to a specific wishlist
 *     tags: [Wishes]
 *     security:
 *       - NextAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wishlist ID to add the wish to
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the wish
 *               description:
 *                 type: string
 *                 description: Detailed description of the wish
 *               price:
 *                 type: number
 *                 description: Price of the wish item
 *               link:
 *                 type: string
 *                 description: URL link to the wish item
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, or WEBP, max 5MB)
 *     responses:
 *       200:
 *         description: Wish added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 link:
 *                   type: string
 *                 image:
 *                   type: string
 *                   description: Public URL of the uploaded image
 *                 status:
 *                   type: string
 *                   enum: [ACTIVE, RESERVED, COMPLETED]
 *       400:
 *         description: Invalid request or file type/size
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wishlist not found or not authorized
 *       500:
 *         description: Error uploading file or creating wish
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const wishList = await prisma.wishList.findUnique({
    where: { id: params.id },
  });

  if (!wishList || wishList.userId !== user!.id) {
    return NextResponse.json(
      { error: "Not found or not authorized" },
      { status: 404 }
    );
  }

  // Handle multipart form data
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") ? Number(formData.get("price")) : null;
  const link = formData.get("link") as string;
  const imageFile = formData.get("image") as File;

  let imageUrl = null;
  if (imageFile) {
    // Create a new FormData object for the upload
    const uploadFormData = new FormData();
    uploadFormData.append("file", imageFile);

    // Upload the image
    const uploadResponse = await fetch(
      `${request.url.split("/wishlists")[0]}/upload`,
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    if (!uploadResponse.ok) {
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }

    const { publicUrl } = await uploadResponse.json();
    imageUrl = publicUrl;
  }

  // Create new wish and link it to the wishlist
  const wish = await prisma.wish.create({
    data: {
      title,
      description,
      price,
      link,
      image: imageUrl,
      wishLists: {
        create: {
          wishList: {
            connect: {
              id: params.id,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(wish);
}
