import { NextRequest, NextResponse } from "next/server";
import findWishlistByUser from "@/actions/getWishlistByUser";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; wishlistId: string } }
) {
  const { userId, wishlistId } = params;

  try {
    // Ищем wishlist, проверяем, что принадлежит userId
    const wishlist = await findWishlistByUser(userId, wishlistId);
    return NextResponse.json(wishlist, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching wishlist by user:", error);

    if (
      error.message === "Wishlist not found" ||
      error.message === "This wishlist does not belong to the user"
    ) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
