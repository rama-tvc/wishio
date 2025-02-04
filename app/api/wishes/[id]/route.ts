import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

/**
 * @swagger
 * /api/wishes/{id}:
 *   put:
 *     summary: Update a wish or reserve/unreserve it
 *     tags: [Wishes]
 *     security:
 *       - NextAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wish ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               link:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, or WEBP, max 5MB)
 *     responses:
 *       200:
 *         description: Updated wish
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
 *                 reservedBy:
 *                   type: string
 *                   description: User ID who reserved the wish
 *       400:
 *         description: Invalid request or file type/size
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to modify this wish
 *       404:
 *         description: Wish not found
 *       500:
 *         description: Error uploading file or updating wish
 */
export async function PUT(
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

  const wish = await prisma.wish.findUnique({
    where: { id: params.id },
    include: {
      wishLists: {
        include: {
          wishList: true,
        },
      },
    },
  });

  if (!wish) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Check if user owns the wish
  const isOwner = wish.wishLists.some((wl) => wl.wishList.userId === user!.id);

  if (!isOwner) {
    return NextResponse.json(
      { error: "Not authorized to modify this wish" },
      { status: 403 }
    );
  }

  // Handle multipart form data
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") ? Number(formData.get("price")) : null;
  const link = formData.get("link") as string;
  const imageFile = formData.get("image") as File;

  let imageUrl = wish.image; // Keep existing image by default
  if (imageFile) {
    // Create a new FormData object for the upload
    const uploadFormData = new FormData();
    uploadFormData.append("file", imageFile);

    // Upload the image
    const uploadResponse = await fetch(
      `${request.url.split("/wishes")[0]}/upload`,
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

  // Update the wish with new data
  const updatedWish = await prisma.wish.update({
    where: { id: params.id },
    data: {
      title,
      description,
      price,
      link,
      image: imageUrl,
    },
  });

  return NextResponse.json(updatedWish);
}
