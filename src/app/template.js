"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer";
import Burger from "@/components/header/burger";

import { useRef } from "react";
import SearchBox from "@/components/header/search-box";

export default function Template({ children }) {
  const isBurgerPlayed = useRef(false);
  const isSearchBoxOpen = useRef(false);

  return (
    <div className="font-sf-md relative h-[100vh] w-full overflow-hidden bg-blue-500">
      <Header
        isBurgerPlayed={isBurgerPlayed}
        isSearchBoxOpen={isSearchBoxOpen}
      />
      {children}
      <Footer />
      <Burger isBurgerPlayed={isBurgerPlayed} />
      <SearchBox isSearchBoxOpen={isSearchBoxOpen} />
    </div>
  );
}
