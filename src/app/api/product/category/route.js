import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const selectedCat = searchParams.get("selectedCat");
  const page = parseInt(searchParams.get("pageNum") || "1", 10);
  const pageSize = 2;
  const offset = (page - 1) * pageSize;

  if (!selectedCat) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 },
    );
  }

  try {
    const amount = await pool.query(
      "SELECT COUNT(*) FROM products WHERE category = $1",
      [selectedCat],
    );
    const result = await pool.query(
      "SELECT * FROM products WHERE category = $1 LIMIT $2 OFFSET $3",
      [selectedCat, pageSize, offset],
    );

    return NextResponse.json({
      products: result.rows,
      productNum: parseInt(
        amount.rows[0].count / pageSize + (amount.rows[0].count % pageSize),
        10,
      ),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
