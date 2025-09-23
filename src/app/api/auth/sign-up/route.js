import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "an unexpected error occured." },
      { status: 500 },
    );
  }
}
