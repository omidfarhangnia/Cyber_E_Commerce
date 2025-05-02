import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { selectedIds } = await req.json();

  try {
    const result = await sql`
            SELECT * FROM products
            WHERE id = ANY(${selectedIds}::uuid[])
        `;

    return NextResponse.json({
      success: true,
      result: result.rows,
    });
  } catch (err) {
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }
}
