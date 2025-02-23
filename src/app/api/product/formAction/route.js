import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req) {
  try {
    const { title, score, description, productId } = await req.json();

    const date = new Date();
    const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate() + 1).padStart(2, "0")}`;

    const result = await pool.query(
      "INSERT INTO comments (title, description, score, date, product_id, author_img) VALUES($1, $2, $3, $4, $5, $6)",
      [
        title,
        description,
        score,
        currentDate,
        productId,
        "https://fphw0h5a4ihmh2dg.public.blob.vercel-storage.com/users_image/author_image_2-GsoyeoC67kkgp0CP6FvgnVTpdZ2Woh.png",
      ],
    );

    return NextResponse.json({ message: "product added" }, result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
