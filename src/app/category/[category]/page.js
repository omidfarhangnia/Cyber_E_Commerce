import { Product } from "@/components/global-components";
import { Sec4Skeleton } from "@/components/skeletons/home-skeletons";
import { sql } from "@vercel/postgres";
import { Suspense } from "react";

async function fetchProductCat(selectedCat) {
  try {
    const products = await sql`
        SELECT * FROM Products
        WHERE category = ${selectedCat}
    `;
    const brands = await sql`
        SELECT DISTINCT brand FROM Products
        WHERE category = ${selectedCat}
    `;

    return { products: products.rows, brands: brands.rows };
  } catch (error) {
    throw new Error("fetching product cat failed");
  }
}

export default async function Page({ params }) {
  const { category } = await params;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1200px] py-[30px] md:py-[90px]">
        <div className="mx-auto flex w-[80%] max-w-[800px] items-center justify-center">
          <span className="inline-block h-[2.5px] w-full bg-black"></span>
          <h1 className="mx-[20px] text-center text-[25px] font-bold capitalize md:text-[40px]">
            {category}
          </h1>
          <span className="inline-block h-[2.5px] w-full bg-black"></span>
        </div>
        <Suspense fallback={<Sec4Skeleton />}>
          <SelectedCat selectedCat={category} />
        </Suspense>
      </div>
    </div>
  );
}

async function SelectedCat({ selectedCat }) {
  const productCat = await fetchProductCat(selectedCat);

  return (
    <div className="flex flex-col justify-center gap-y-[50px] p-[30px] md:gap-y-[100px]">
      {productCat.brands.map((members, i) => {
        const selectedBrandProducts = productCat.products.filter(
          (product) => product.brand === members.brand,
        );
        return (
          <div className="" key={i}>
            <div className="mb-[30px] flex items-center gap-[30px] py-[15px] pl-[15px]">
              <h2 className="select-none text-[25px] font-semibold md:text-[35px]">
                {members.brand}
              </h2>
              <span className="inline-block h-[2px] w-full bg-gradient-to-l from-[#e8e8e82c] to-black"></span>
            </div>
            <div className="flex flex-wrap justify-center gap-[30px]">
              {selectedBrandProducts.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
