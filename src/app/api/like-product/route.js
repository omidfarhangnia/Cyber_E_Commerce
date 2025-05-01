import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { productId, email, favorites, status } = await req.json();

  let updatedFavoritesArr;
  const prevFavorites = JSON.parse(favorites);

  if (status === "add") {
    const newFavorites = [productId];
    updatedFavoritesArr = newFavorites.concat(prevFavorites);
  } else {
    updatedFavoritesArr = prevFavorites.filter((id) => id !== productId);
  }

  console.log("/////////////////////////////")
  console.log("/////////////////////////////")
  console.log(updatedFavoritesArr);
  console.log("/////////////////////////////")
  console.log("/////////////////////////////")

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { favorites: JSON.stringify(updatedFavoritesArr) },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: "Liked failed" }, { status: 500 });
  }
}
