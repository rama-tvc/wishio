import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        name: true,
        email: true,
        image: true,
        birthdate: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { name, image, birthdate } = data;

    // Validate birthdate format if provided
    let birthdateObj = undefined;
    if (birthdate) {
      birthdateObj = new Date(birthdate);
      if (isNaN(birthdateObj.getTime())) {
        return NextResponse.json(
          { error: "Invalid birthdate format" },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: name,
        image: image,
        birthdate: birthdateObj,
      },
    });

    return NextResponse.json(
      {
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
          birthdate: updatedUser.birthdate,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating profile" },
      { status: 500 }
    );
  }
}
