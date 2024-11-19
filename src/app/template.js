"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer";
import Burger from "@/components/header/burger";

import { useRef } from "react";
import SearchBox from "@/components/header/search-box";

export default function Template({ children }) {
  const isBurgerPlayed = useRef(false);
  const isSearchBoxOpened = useRef(false);
  const isAnimePlaying = useRef(false);

  return (
    <div className="font-sf-md relative h-[100vh] w-full overflow-hidden bg-blue-500">
      <Header
        isBurgerPlayed={isBurgerPlayed}
        isSearchBoxOpened={isSearchBoxOpened}
        isAnimePlaying={isAnimePlaying}
      />
      {children}
      <Footer />
      <Burger isBurgerPlayed={isBurgerPlayed} isAnimePlaying={isAnimePlaying} />
      <SearchBox
        isSearchBoxOpened={isSearchBoxOpened}
        isAnimePlaying={isAnimePlaying}
      />
    </div>
  );
}
