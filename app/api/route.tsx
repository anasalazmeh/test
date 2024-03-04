import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const countGame = await prisma.games.count({
      where: { userId: userId },
    });
    return NextResponse.json({ countGame }, { status: 200 });
  } catch (error) {
    console.error("[GIT color]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { valueNumber } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!valueNumber && parseInt(valueNumber) < 0)
      return new NextResponse("Value is required", { status: 400 });

    const number = Math.floor(Math.random() * (10 - 0 - 1)) + 0;
    if (number == valueNumber) {
      const game = await prisma.games.create({
        data: {
          number: String(valueNumber),
          userId
        },
      });
      return NextResponse.json("success", { status: 200 });
    }
    return new NextResponse("error", { status: 200 });
  } catch (error) {
    console.error("[post color]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
