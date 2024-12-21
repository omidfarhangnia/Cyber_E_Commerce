import { sql } from "@vercel/postgres";

export async function getSelectedProducts(selectedStatus) {
  // try {
  //   let data;
  //   if (selectedStatus === "bestSeller") {
  //     data = await sql`
  //       SELECT * FROM products
  //       ORDER BY sales_num
  //       LIMIT 8;
  //       `;
  //   } else if (selectedStatus === "highestWarrantyPeriod") {
  //     data = await sql`
  //       SELECT * FROM products
  //       ORDER BY warranty_period
  //       LIMIT 8;
  //       `;
  //   } else {
  //     data = await sql`
  //       SELECT * FROM products
  //       WHERE is_shipping_free=1
  //       LIMIT 8;
  //       `;
  //   }
  //   return data.rows;
  // } catch (err) {
  //   throw new Error(err);
  // }
}
