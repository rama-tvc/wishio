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
 *         application/json:
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
 *               status:
 *                 type: string
 *                 enum: [RESERVED, UNRESERVED]
 *                 description: Use RESERVED to reserve the wish, UNRESERVED to cancel reservation
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
 *                 status:
 *                   type: string
 *                   enum: [RESERVED, UNRESERVED]
 *                 reservedBy:
 *                   type: string
 *                   description: User ID who reserved the wish
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to modify this wish
 *       404:
 *         description: Wish not found
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

  const { title, description, price, link, image, status } =
    await request.json();

  // Проверяем, принадлежит ли желание списку пользователя
  const isOwner = wish.wishLists.some((wl) => wl.wishList.userId === user!.id);

  // Если пользователь не владелец
  if (!isOwner) {
    // Разрешаем только резервирование/отмену резервирования
    if (status === undefined) {
      return NextResponse.json(
        { error: "Only reservation status can be modified" },
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

  // Если пользователь владелец, он может обновить все поля
  const updatedWish = await prisma.wish.update({
    where: { id: params.id },
    data: {
      title,
      description,
      price,
      link,
      image,
      status,
      // Если владелец снимает резервацию, очищаем reservedBy
      reservedBy: status === "UNRESERVED" ? null : wish.reservedBy,
    },
  });
  return NextResponse.json(updatedWish);
}
