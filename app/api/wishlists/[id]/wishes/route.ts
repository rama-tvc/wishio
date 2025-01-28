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
 *         application/json:
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
 *                 description: Image URL for the wish item
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
 *                 status:
 *                   type: string
 *                   enum: [ACTIVE, RESERVED, COMPLETED]
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wishlist not found or not authorized
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

  const { title, description, price, link, image } = await request.json();

  // Создаем новое желание и связываем его со списком
  const wish = await prisma.wish.create({
    data: {
      title,
      description,
      price,
      link,
      image,
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
