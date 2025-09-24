"use client";

import React, { useState, use, useRef, useEffect } from "react";
import { Product } from "@/components/global-components";
import Image from "next/image";
import { Sec4Skeleton } from "@/components/skeletons/home-skeletons";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchFrom, SearchH1 } from "@/components/search/search";

async function getProductData(productName, pageNum = 1) {
  const res = await fetch(
    `/api/product/searchProduct?productName=${productName}&pageNum=${pageNum}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Page({ params: paramsPromise }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = use(paramsPromise);
  const productName = decodeURIComponent(params.productName);
  const currentPage = Number(searchParams.get("page")) || 1;
  const [searchQuery, setSearchQuery] = useState(productName);
  const [lastPage, setLastPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const headerRef = useRef();

  useEffect(() => {
    setSearchQuery(productName);
  }, [productName]);

  useEffect(() => {
    async function fetchData() {
      if (!productName) return;

      setLoading(true);
      setError(null);
      headerRef.current?.scrollIntoView({ behavior: "smooth" });

      try {
        const data = await getProductData(productName, currentPage);
        setProducts(data.products);
        setLastPage(data.lastPageNum);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productName, currentPage]);

  function handleSearch(e) {
    e.preventDefault();
    const newQuery = searchQuery.trim();
    if (newQuery && newQuery !== productName) {
      router.push(`/search/${newQuery}?page=1`);
    }
  }

  function handleChangePage(newPage) {
    router.push(`/search/${productName}?page=${newPage}`);
  }

  return (
    <div className="flex select-none items-center justify-center bg-[#ffffff]">
      <div className="w-full max-w-[1250px] px-[30px] py-[40px] lg:px-[10px]">
        <SearchH1 headerRef={headerRef} />
        <SearchFrom
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ShowProducts products={products} loading={loading} error={error} />
        {products.length > 0 && (
          <ProductsPagination
            handleChangePage={handleChangePage}
            page={{
              current: currentPage,
              last: lastPage,
            }}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

function ShowProducts({ products, loading, error }) {
  if (error !== null) {
    return (
      <div className="mt-[50px] flex w-full flex-wrap items-center justify-center gap-[40px] lg:gap-[10px]">
        <p className="text-[20px] text-slate-600 lg:text-[30px]">{error}</p>;
      </div>
    );
  }

  return (
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
            ))
          ) : (
            <p className="text-[20px] text-slate-600 lg:text-[30px]">
              No products found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ProductsPagination({ handleChangePage, page, error }) {
  if (error !== null) return;

  return (
    <div className="mx-auto mt-[50px] flex w-[80%] max-w-[600px] items-center justify-between">
      <button
        disabled={page.current === 1}
        onClick={() => handleChangePage(page.current - 1)}
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
        {page.current} / {page.last}
      </span>
      <button
        disabled={page.current >= page.last}
        onClick={() => handleChangePage(page.current + 1)}
        className="disabled:opacity-30"
      >
        <Image width={30} height={30} alt="next icon" src={"/icons/next.svg"} />
      </button>
    </div>
  );
}
