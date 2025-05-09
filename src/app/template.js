"use client";

import Header, { handleBurgerAction } from "@/components/header/header";
import Burger from "@/components/header/burger";

import { useEffect, useRef } from "react";
import SearchBox from "@/components/header/search-box";
import Footer from "@/components/footer/footer";

export default function Template({ children }) {
  const isBurgerPlayed = useRef(false);
  const isSearchBoxOpened = useRef(false);
  const isAnimePlaying = useRef(false);

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      if (window.innerWidth > 1024 && isBurgerPlayed.current) {
        handleBurgerAction(isBurgerPlayed, isAnimePlaying);
      }
    });
  }, []);

  return (
    <div className="font-sf-md project--template relative min-h-[100vh] flex flex-col justify-between w-full overflow-hidden bg-[#ffffff]">
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
