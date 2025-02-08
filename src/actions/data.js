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

async function fetchFreeShippingProducts() {
  try {
    const data = await sql`
      SELECT * FROM products
      WHERE is_shipping_free = 1
      LIMIT 8
    `;
    return data.rows;
  } catch (err) {
    return [];
  }
}

async function fetchHighestDiscountProducts() {
  try {
    const data = await sql`
      SELECT * FROM products
      ORDER BY discount_percent DESC
      LIMIT 8
    `;
    return data.rows;
  } catch (err) {
    return [];
  }
}

async function fetchHighestScoreProducts() {
  try {
    const data = await sql`
      SELECT * FROM products
      ORDER BY score DESC
      LIMIT 8
    `;
    return data.rows;
  } catch (err) {
    return [];
  }
}

async function fetchBestSellerProducts() {
  try {
    const data = await sql`
      SELECT * FROM products
      ORDER BY sales_num DESC
      LIMIT 8;
    `;
    return data.rows;
  } catch (err) {
    return [];
  }
}

export async function fetchSec4Data() {
  const highestDiscountProducts = await fetchHighestDiscountProducts();
  const higestScoreProducts = await fetchHighestScoreProducts();
  const bestSellerProducts = await fetchBestSellerProducts();
  const freeShippingProducts = await fetchFreeShippingProducts();

  return {
    highestDiscount: highestDiscountProducts,
    highestScore: higestScoreProducts,
    bestSeller: bestSellerProducts,
    freeShipping: freeShippingProducts,
  };
}

export async function fetchSec5Data() {
  try {
    const data = await sql`
      SELECT * FROM popularproducts
      ORDER BY id ASC
    `;

    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
}
