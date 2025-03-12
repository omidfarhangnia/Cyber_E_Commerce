import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productName = searchParams.get("productName") || "";
  const page = parseInt(searchParams.get("pageNum") || "1", 10);
  const pageSize = 4;
  const offset = (page - 1) * pageSize;

  if (!productName) {
    return NextResponse.json({
      products: [],
      lastPageNum: 0,
    });
  }

  try {
    const amount = await pool.query(
      "SELECT COUNT(*) FROM products WHERE name ILIKE $1",
      [`%${productName}%`],
    );

    const result = await pool.query(
      "SELECT * FROM products WHERE name ILIKE $1 LIMIT $2 OFFSET $3",
      [`%${productName}%`, pageSize, offset],
    );

    console.log(Math.floor(amount.rows[0].count / pageSize));
    return NextResponse.json({
      products: result.rows,
      lastPageNum: parseInt(
        Math.floor(amount.rows[0].count / pageSize) +
          (amount.rows[0].count % pageSize > 0 ? 1 : 0),
        10,
      ),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
