"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProductData(searchQuery, pageNum.current);
      setProducts(data.products);
      setPageNum({
        ...pageNum,
        last: data.lastPageNum,
      });
    }
    fetchProducts();
  }, [searchQuery, pageNum]);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery}`);
    }
  }

  return (
    <div className="h-[50vh] w-full bg-blue-500">
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Search Products</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPageNum({
                current: 1,
                last: null,
              });
            }}
            placeholder="Search product..."
          />
          <button type="submit">Search</button>
        </form>
        <div className="flex w-[500px] justify-between">
          <button
            disabled={pageNum.current === 0}
            onClick={() =>
              setPageNum({
                ...pageNum,
                current: pageNum - 1,
              })
            }
          >
            prev
          </button>
          <span>
            {pageNum.current}/{pageNum.last}
          </span>
          <button
            onClick={() =>
              setPageNum({
                ...pageNum,
                current: pageNum + 1,
              })
            }
            className=""
          >
            next
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index}>{product.name}</div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
