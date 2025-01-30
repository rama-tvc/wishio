import { NextRequest, NextResponse } from "next/server";
import findUser from "@/actions/getUser";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    // Вызываем нашу функцию, которая ищет пользователя
    const user = await findUser(userId);

    // Возвращаем найденного пользователя в JSON
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user:", error);

    if (error.message === "User not found") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
