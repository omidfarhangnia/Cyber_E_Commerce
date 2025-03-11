import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productName = searchParams.get("productName") || "";
  const page = parseInt(searchParams.get("pageNum") || "1", 10);
  const pageSize = 100;
  const offset = (page - 1) * pageSize;

  try {
    const amount = await pool.query(
      "SELECT COUNT(*) FROM products WHERE name ILIKE $1",
      [`%${productName}%`],
    );

    const result = await pool.query(
      "SELECT * FROM products WHERE name ILIKE $1 LIMIT $2 OFFSET $3",
      [`%${productName}%`, pageSize, offset],
    );

    return NextResponse.json({
      products: result.rows,
      lastPageNum: parseInt(
        amount.rows[0].count / pageSize + (amount.rows[0].count % pageSize),
        10,
      ),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
