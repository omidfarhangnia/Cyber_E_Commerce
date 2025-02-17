"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import SearchSelectedCategory from "./search";

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

export default function Page({ searchParams }) {
  return (
    <div className="flex h-full items-center justify-center bg-[#ffffff]">
      <div className="flex w-full max-w-[1200px] flex-col justify-between px-[15px] py-[40px]">
        <div>{JSON.stringify(searchParams)}</div>
        <SearchSelectedCategory searchParams={searchParams} />
      </div>
    </div>
  );
}

export function CategoriesSmDevice({ category, handleSearch, searchParams }) {
  //   const products = fetchProductsFromCategroy();

  return (
    <div className="flex bg-[#2E2E2E] px-[15px] py-[20px] md:hidden">
      <div>{JSON.stringify(searchParams)}</div>
      <div>
        <Link
          className="rounded-full font-semibold text-[#d6d6d6] transition-all hover:text-white"
          href={category.url}
          key={category.id}
        >
          {category.label}
        </Link>
        <div
          onClick={() => {
            handleSearch(String(category.label).toLowerCase());
          }}
        >
          open
        </div>
      </div>
    </div>
  );
}

export function CategoriesLgDevice({ category }) {
  return <div className="hidden md:flex">category</div>;
}
