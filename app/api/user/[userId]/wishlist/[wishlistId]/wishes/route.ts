import { NextRequest, NextResponse } from "next/server";
import findWishesByWishlistByUser from "@/actions/getWishByWishlistByUser";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; wishlistId: string } }
) {
  const { userId, wishlistId } = params;

  try {
    // Ищем товары (wishes), проверяем, что wishlist принадлежит userId
    const wishes = await findWishesByWishlistByUser(userId, wishlistId);
    return NextResponse.json(wishes, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching wishes by wishlist by user:", error);

    if (
      error.message === "Wishlist not found" ||
      error.message === "This wishlist does not belong to the user"
    ) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
