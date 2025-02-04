import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/wishlists/token/{token}:
 *   get:
 *     summary: Get a specific wishlist by ID
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The wishlist token
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
  { params }: { params: { token: string } }
) {
  const wishList = await prisma.wishList.findUnique({
    where: {
      shareToken: params.token,
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
