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
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

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
    const data = await getProductData(searchQuery, newPage);
    setProducts(data.products);
    setPageNum({
      current: newPage,
      last: data.lastPageNum,
    });
    setLoading(false);
  }

  return (
    <div className="min-h-[50vh] w-full bg-blue-500">
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
            disabled={pageNum.current === 1}
            onClick={() => handleChangePage(pageNum.current - 1)}
            className="disabled:bg-red-500"
          >
            prev
          </button>
          <span>
            {pageNum.current}/{pageNum.last}
          </span>
          <button
            disabled={pageNum.current >= pageNum.last}
            onClick={() => handleChangePage(pageNum.current + 1)}
            className="disabled:bg-red-500"
          >
            next
          </button>
        </div>

        <div>
          {loading ? (
            "loadding........"
          ) : (
            <div style={{ marginTop: "20px" }}>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div key={index}>{product.name}</div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
