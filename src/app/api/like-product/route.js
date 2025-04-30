import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { productId, email, favorites } = await req.json();

  const newFavorites = [productId];
  const prevFavorites = JSON.parse(favorites);

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { favorites: JSON.stringify(newFavorites.concat(prevFavorites)) },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: "Liked failed" }, { status: 500 });
  }
}
