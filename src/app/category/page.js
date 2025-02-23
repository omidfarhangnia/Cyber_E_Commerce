"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

export const categories = [
  {
    url: "/category/phone",
    id: 0,
    label: "Phone",
    svg: "/icons/phone.svg",
  },
  {
    url: "/category/computer",
    id: 1,
    label: "Computer",
    svg: "/icons/computer.svg",
  },
  {
    url: "/category/smartwatch",
    id: 2,
    label: "SmartWatch",
    svg: "/icons/smartwatch.svg",
  },
  {
    url: "/category/camera",
    id: 3,
    label: "Camera",
    svg: "/icons/camera.svg",
  },
  {
    url: "/category/headphone",
    id: 4,
    label: "Headphone",
    svg: "/icons/headphone.svg",
  },
  {
    url: "/category/gaming",
    id: 5,
    label: "Gaming",
    svg: "/icons/gaming.svg",
  },
];

export default function Page() {
  const [selecedCat, setSelectedCat] = useState("phone");
  return (
    <div className="flex h-full items-center justify-center bg-[#ffffff]">
      <div className="flex w-full max-w-[1200px] flex-col justify-between px-[15px] py-[40px]">
        {categories.map((category) => {
          return (
            <Categories
              category={category}
              selecedCat={selecedCat}
              setSelectedCat={setSelectedCat}
              key={category.id}
            />
          );
        })}
      </div>
    </div>
  );
}

const categoryTl = gsap.timeline();
function Categories({ category, selecedCat, setSelectedCat }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pageNum, setPageNum] = useState({
    currentPage: 1,
    lastPage: null,
  });
  const labelLowerCase = String(category.label).toLowerCase();

  useEffect(() => {
    if (selecedCat === labelLowerCase) {
      getProductsFromSelectedCat();
    }
  }, []);

  async function getProductsFromSelectedCat(newPage = 1) {
    setLoading(true);
    const res = await fetch(
      `/api/product/category?selectedCat=${labelLowerCase}&pageNum=${newPage}`,
    );
    const data = await res.json();
    setProducts(data.products);
    setPageNum({ currentPage: newPage, lastPage: data.productNum });
    setLoading(false);
  }

  function handleClick() {
    if (categoryTl.isActive()) return;
    const newSelectedCat = labelLowerCase === selecedCat ? "" : labelLowerCase;
    getProductsFromSelectedCat();
    if (newSelectedCat) {
      categoryTl.to(
        `.${labelLowerCase}--arrow`,
        {
          rotate: "90deg",
          borderRadius: "40%",
          duration: 0.5,
          ease: "expo.in",
        },
        "accordArrow",
      );
    }
    if (selecedCat) {
      categoryTl.to(
        `.${selecedCat}--arrow`,
        {
          rotate: "0",
          borderRadius: "0%",
          duration: 0.5,
          ease: "expo.in",
          onComplete: () => categoryTl.clear(),
        },
        "accordArrow",
      );
    }
    setSelectedCat(newSelectedCat);
  }

  return (
    <div onClick={handleClick} className="flex flex-col px-[15px] py-[20px]">
      <div className="flex w-full items-center justify-between">
        <Link
          className="select-none rounded-full font-semibold text-black underline underline-offset-4 transition-all hover:text-gray-700"
          href={category.url}
        >
          {category.label}
        </Link>
        <div
          className={`border-[1px] ${labelLowerCase}--arrow border-solid border-black hover:bg-gray-300 hover:transition-all`}
        >
          <Image width="30" height="30" alt="arrow" src={"/icons/arrow.svg"} />
        </div>
      </div>
      {labelLowerCase === selecedCat && (
        <div>
          {loading ? (
            <div>loading...</div>
          ) : (
            <div>
              <div className="flex w-[400px] items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getProductsFromSelectedCat(pageNum.currentPage - 1);
                  }}
                  disabled={pageNum.currentPage === 1}
                  className="bg-blue-300 disabled:opacity-50"
                >
                  past
                </button>
                <div>{pageNum.currentPage}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getProductsFromSelectedCat(pageNum.currentPage + 1);
                  }}
                  disabled={pageNum.currentPage === pageNum.lastPage}
                  className="bg-blue-300 disabled:opacity-50"
                >
                  next
                </button>
                <div>{pageNum.lastPage}</div>
              </div>
              {products.map((product) => {
                return <div key={product.id}>{product.name}</div>;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
