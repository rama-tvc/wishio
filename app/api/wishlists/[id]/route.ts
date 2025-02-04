import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

/**
 * @swagger
 * /api/wishlists/{id}:
 *   get:
 *     summary: Get a specific wishlist by ID
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wishlist ID
 *     responses:
 *       200:
 *         description: The wishlist data
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
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                 wishes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       wish:
 *                         type: object
 *       404:
 *         description: Wishlist not found
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const wishList = await prisma.wishList.findUnique({
    where: {
      id: params.id,
    },
    include: {
      wishes: {
        include: {
          wish: true,
        },
      },
    },
  });

  if (!wishList) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(wishList);
}

/**
 * @swagger
 * /api/wishlists/{id}:
 *   put:
 *     summary: Update a specific wishlist
 *     tags: [Wishlists]
 *     security:
 *       - NextAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wishlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, COMPLETED, ARCHIVED]
 *     responses:
 *       200:
 *         description: Updated wishlist
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wishlist not found or not authorized
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

  const wishList = await prisma.wishList.findUnique({
    where: { id: params.id },
  });

  if (!wishList || wishList.userId !== user!.id) {
    return NextResponse.json(
      { error: "Not found or not authorized" },
      { status: 404 }
    );
  }

  const { title, description, deadline, status } = await request.json();

  const updatedWishList = await prisma.wishList.update({
    where: { id: params.id },
    data: {
      title,
      description,
      deadline: new Date(deadline),
      status,
    },
  });

  return NextResponse.json(updatedWishList);
}

/**
 * @swagger
 * /api/wishlists/{id}:
 *   delete:
 *     summary: Delete a specific wishlist
 *     tags: [Wishlists]
 *     security:
 *       - NextAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wishlist ID
 *     responses:
 *       200:
 *         description: Wishlist deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wishlist not found or not authorized
 */
export async function DELETE(
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

  await prisma.wishList.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
