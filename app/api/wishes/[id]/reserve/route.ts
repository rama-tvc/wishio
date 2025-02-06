import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/auth";

/**
 * @swagger
 * /api/wishes/{id}/reserve:
 *   post:
 *     summary: Reserve or unreserve a wish
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [RESERVED, UNRESERVED]
 *                 description: Use RESERVED to reserve the wish, UNRESERVED to cancel reservation
 *     responses:
 *       200:
 *         description: Updated wish reservation status
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to reserve/unreserve this wish
 *       404:
 *         description: Wish not found
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

  const { status } = await request.json();

  // Проверяем, принадлежит ли желание списку пользователя
  const isOwner = wish.wishLists.some((wl) => wl.wishList.userId === user!.id);

  // Владелец не может резервировать свои желания
  if (isOwner) {
    return NextResponse.json(
      { error: "You cannot reserve your own wish" },
      { status: 403 }
    );
  }

  // Проверяем, что подарок не зарезервирован другим пользователем
  if (
    wish.status === "RESERVED" &&
    wish.reservedBy !== user!.id &&
    status === "RESERVED"
  ) {
    return NextResponse.json(
      { error: "This wish is already reserved by another user" },
      { status: 403 }
    );
  }

  // Проверяем, что пользователь отменяет свою собственную резервацию
  if (status === "UNRESERVED" && wish.reservedBy !== user!.id) {
    return NextResponse.json(
      { error: "You can only cancel your own reservation" },
      { status: 403 }
    );
  }

  const updatedWish = await prisma.wish.update({
    where: { id: params.id },
    data: {
      status,
      reservedBy: status === "RESERVED" ? user!.id : null,
    },
  });

  return NextResponse.json(updatedWish);
}
