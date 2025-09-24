"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchFrom, SearchH1 } from "@/components/search/search";

export default function Page() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef();

  function handleSearch(e) {
    e.preventDefault();
    const newQuery = searchQuery.trim();
    if (newQuery) {
      router.push(`/search/${newQuery}?page=1`);
    }
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
      </div>
    </div>
  );
}
