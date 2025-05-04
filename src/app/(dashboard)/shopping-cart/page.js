"use client";

import { Product } from "@/components/global-components";
import { Sec4Skeleton } from "@/components/skeletons/home-skeletons";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function ShoppingCartProducts({ shopping_cart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/product/selected-products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedIds: shopping_cart }),
        });

        const data = await res.json();
        setProducts(data.result);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [shopping_cart]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[1250px]">
        {loading ? (
          <Sec4Skeleton />
        ) : (
          <div className="py-[30px]">
            <div className="mx-auto my-[30px] flex w-[80%] max-w-[800px] select-none items-center justify-center">
              <span className="inline-block h-[2.5px] w-full bg-black md:w-[250px]"></span>
              <h1 className="mx-[20px] w-full text-center text-[23px] font-bold capitalize md:text-[40px]">
                shopping cart
              </h1>
              <span className="inline-block h-[2.5px] w-full bg-black md:w-[250px]"></span>
            </div>
            {products.length === 0 ? (
              <div className="my-[50px] text-center text-[15px] font-semibold capitalize text-gray-700 md:text-[20px]">
                you have no product in your shopping cart
              </div>
            ) : (
              <div className="flex w-full flex-wrap items-center justify-center gap-x-[10px] gap-y-[15px]">
                {products.map((product) => {
                  return <Product product={product} key={product.id} />;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const { data: session } = useSession();
  if (!session) redirect("/");

  return (
    <div>
      <div>
        <ShoppingCartProducts
          shopping_cart={JSON.parse(session.user?.shopping_cart)}
        />
      </div>
    </div>
  );
}
