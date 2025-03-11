"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Product } from "@/components/global-components";

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
  const [selecedCat, setSelectedCat] = useState("none");
  return (
    <div className="flex h-full items-center justify-center bg-[#ffffff] px-[20px]">
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-center px-[15px] py-[40px]">
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
    current: 1,
    last: null,
  });
  const catRef = useRef(null);
  const labelLowerCase = String(category.label).toLowerCase();
  const pageArr = [...Array(pageNum.last).keys()];

  async function getProductsFromSelectedCat(newPage = 1) {
    setLoading(true);
    const res = await fetch(
      `/api/product/category?selectedCat=${labelLowerCase}&pageNum=${newPage}`,
    );
    const data = await res.json();
    setProducts(data.products);
    setPageNum({ current: newPage, last: data.lastPageNum });
    setLoading(false);
  }

  function handleClick() {
    if (categoryTl.isActive()) return;
    const newSelectedCat = labelLowerCase === selecedCat ? "" : labelLowerCase;
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
          onComplete: () => {
            if (catRef.current) {
              catRef.current.scrollIntoView({ behavior: "smooth" });
            }
            categoryTl.clear();
          },
        },
        "accordArrow",
      );
    }
    getProductsFromSelectedCat();
    setSelectedCat(newSelectedCat);
  }

  return (
    <div
      ref={catRef}
      className={`flex w-full max-w-[900px] flex-col rounded-[30px] p-[20px] md:p-[30px] ${labelLowerCase === selecedCat && "bg-[#f5f5f5]"}`}
    >
      <div className="mb-[20px] flex w-full items-center justify-between md:mb-[40px]">
        <Link
          className="select-none rounded-full text-[18px] font-semibold text-black underline underline-offset-4 hover:no-underline md:text-[calc(18px_+_0.5vw)]"
          href={category.url}
        >
          {category.label}
        </Link>
        <div
          className={`border-[1px] ${labelLowerCase}--arrow border-solid border-black hover:bg-gray-300 hover:transition-all`}
        >
          <Image
            onClick={handleClick}
            width="30"
            height="30"
            alt="arrow"
            className="md:h-[35px] md:w-[35px]"
            src={"/icons/arrow.svg"}
          />
        </div>
      </div>
      {labelLowerCase === selecedCat && (
        <div className="flex items-center justify-center">
          {loading ? (
            <div className="h-[200px] w-full content-center text-center text-[30px] uppercase md:text-[40px]">
              loading{" "}
              <span className="loading--dot--anime__1 inline-block h-[.3em] w-[.3em] rounded-full bg-[#2e2e2e]"></span>{" "}
              <span className="loading--dot--anime__2 inline-block h-[.3em] w-[.3em] rounded-full bg-[#a8aaae]"></span>{" "}
              <span className="loading--dot--anime__3 inline-block h-[.3em] w-[.3em] rounded-full bg-[#d8d8d8]"></span>
            </div>
          ) : (
            <div
              className={`mt-[20px] flex w-full flex-wrap items-center justify-center gap-[30px]`}
            >
              {products.map((product) => {
                return <Product key={product.id} product={product} />;
              })}
              <div className="mb-[20px] mt-[10px] w-full md:mt-[20px]">
                <div className="mx-auto flex max-w-[400px] justify-center rounded-full border-[1px] border-solid border-black bg-white py-[10px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      getProductsFromSelectedCat(pageNum.current - 1);
                    }}
                    disabled={pageNum.current === 1}
                    className="disabled:opacity-25"
                  >
                    <Image
                      width={30}
                      height={30}
                      alt="prev icon"
                      className="h-[23px] w-[23px] md:h-[30px] md:w-[30px]"
                      src={"/icons/previous.svg"}
                    />
                  </button>
                  <div className="flex items-center gap-[20px] px-[20px]">
                    {pageArr.map((i) => {
                      return (
                        <div
                          key={i}
                          className={`${
                            !(
                              i >= pageNum.current - 3 &&
                              i <= pageNum.current + 1
                            ) && "hidden"
                          } flex h-[30px] w-[30px] cursor-pointer select-none items-center justify-center rounded-full border-[1px] border-solid border-black text-[18px] ${
                            i === pageNum.current - 1
                              ? "bg-gray-400"
                              : "bg-gray-100"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            getProductsFromSelectedCat(i + 1);
                          }}
                        >
                          <span>{i + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      getProductsFromSelectedCat(pageNum.current + 1);
                    }}
                    disabled={pageNum.current === pageNum.last}
                    className="disabled:opacity-25"
                  >
                    <Image
                      width={30}
                      height={30}
                      alt="prev icon"
                      className="h-[23px] w-[23px] md:h-[30px] md:w-[30px]"
                      src={"/icons/next.svg"}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
