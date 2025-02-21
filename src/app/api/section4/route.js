import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const selectedCat = searchParams.get("selectedCat") || "";

  try {
    if (selectedCat === "highestDiscount") {
      const result = await pool.query(
        "SELECT * FROM products ORDER BY discount_percent DESC LIMIT 8",
      );
      return NextResponse.json(result.rows);
    } else if (selectedCat === "highestScore") {
      const result = await pool.query(
        "SELECT * FROM products ORDER BY score DESC LIMIT 8",
      );
      return NextResponse.json(result.rows);
    } else if (selectedCat === "bestSeller") {
      const result = await pool.query(
        "SELECT * FROM products ORDER BY sales_num DESC LIMIT 8;",
      );
      return NextResponse.json(result.rows);
    } else {
      const result = await pool.query(
        "SELECT * FROM products WHERE is_shipping_free = 1 LIMIT 8",
      );
      return NextResponse.json(result.rows);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
