"use client";

import React, { useState, useEffect, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/components/global-components";
import Image from "next/image";
import { Sec4Skeleton } from "@/components/skeletons/home-skeletons";

async function getProductData(productName, pageNum) {
  const res = await fetch(
    `/api/product/searchProduct?productName=${productName}&pageNum=${pageNum}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  return res.json();
}

export default function Page({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(params.productName);
  const [pageNum, setPageNum] = useState({
    current: 1,
    last: null,
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const heaaderRef = useRef();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const data = await getProductData(searchQuery, pageNum.current);
      setProducts(data.products);
      setPageNum({
        ...pageNum,
        last: data.lastPageNum,
      });
      setLoading(false);
    }
    fetchProducts();
  }, [searchQuery]);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery}`);
    }
  }

  async function handleChangePage(newPage) {
    setLoading(true);
    heaaderRef.current.scrollIntoView({ behavior: "smooth" });
    const data = await getProductData(searchQuery, newPage);
    setProducts(data.products);
    setPageNum({
      current: newPage,
      last: data.lastPageNum,
    });
    setLoading(false);
  }

  return (
    <div className="flex select-none items-center justify-center bg-[#ffffff]">
      <div className="w-full max-w-[1250px] px-[30px] py-[40px] lg:px-[10px]">
        <h1
          ref={heaaderRef}
          className="mb-[20px] text-center text-[calc(23px_+_1vw)] font-semibold md:mb-[40px] md:mt-[20px]"
        >
          Search Products
        </h1>

        <form
          onSubmit={handleSearch}
          className="mx-auto mb-[20px] mt-[50px] flex justify-between md:max-w-[600px] lg:max-w-[800px]"
        >
          <input
            type="text"
            className="w-[60%] rounded-full border-[.3px] border-solid border-slate-500 px-[15px] py-[10px] placeholder:text-[16px] placeholder:capitalize focus:bg-slate-50 focus:outline-none md:px-[30px] md:text-[20px] md:placeholder:text-[20px]"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPageNum({
                current: 1,
                last: null,
              });
            }}
            placeholder="product name"
          />
          <button
            type="submit"
            className="rounded-full bg-slate-300 px-[20px] text-[14px] uppercase transition-colors hover:bg-slate-200 md:px-[40px] md:text-[20px]"
          >
            Search
          </button>
        </form>

        <div className="w-full">
          {loading ? (
            <div className="overflow-hidden rounded-[20px]">
              <Sec4Skeleton />
            </div>
          ) : (
            <div className="mt-[50px] flex w-full flex-wrap items-center justify-center gap-[40px] lg:gap-[10px]">
              {products.length > 0 ? (
                products.map((product) => (
                  <Product key={product.id} product={product} />
                  // <div key={product.id}>{product.name}</div>
                ))
              ) : (
                <p className="text-[20px] text-slate-600 lg:text-[30px]">
                  No products found
                </p>
              )}
            </div>
          )}
        </div>

        {products.length > 0 && (
          <div className="mx-auto mt-[50px] flex w-[80%] max-w-[600px] items-center justify-between">
            <button
              disabled={pageNum.current === 1}
              onClick={() => handleChangePage(pageNum.current - 1)}
              className="disabled:opacity-30"
            >
              <Image
                width={30}
                height={30}
                alt="previous icon"
                src={"/icons/previous.svg"}
              />
            </button>
            <span className="text-[18px] font-bold">
              {pageNum.current} / {pageNum.last}
            </span>
            <button
              disabled={pageNum.current >= pageNum.last}
              onClick={() => handleChangePage(pageNum.current + 1)}
              className="disabled:opacity-30"
            >
              <Image
                width={30}
                height={30}
                alt="next icon"
                src={"/icons/next.svg"}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
