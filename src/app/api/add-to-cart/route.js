import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { productId, email, shopping_cart, status } = await req.json();

  let updatedCartArr;
  const prevCart = JSON.parse(shopping_cart);

  if (status === "add") {
    const newCart = [productId];
    updatedCartArr = newCart.concat(prevCart);
  } else {
    updatedCartArr = prevCart.filter((id) => id !== productId);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { shopping_cart: JSON.stringify(updatedCartArr) },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: "Liked failed" }, { status: 500 });
  }
}
