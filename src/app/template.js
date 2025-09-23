"use client";

import Header, { handleBurgerAction } from "@/components/header/header";
import Burger from "@/components/header/burger";

import { useEffect, useRef } from "react";
import SearchBox from "@/components/header/search-box";
import Footer from "@/components/footer/footer";
import { Toaster } from "react-hot-toast";

export default function Template({ children }) {
  const isBurgerPlayed = useRef(false);
  const isSearchBoxOpened = useRef(false);
  const isAnimePlaying = useRef(false);

  useEffect(() => {
    function handleResize(event) {
      if (window.innerWidth > 1024 && isBurgerPlayed.current) {
        handleBurgerAction(isBurgerPlayed, isAnimePlaying);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="font-sf-md project--template relative flex min-h-[100vh] w-full flex-col justify-between overflow-hidden bg-[#ffffff]">
      <Header
        isBurgerPlayed={isBurgerPlayed}
        isSearchBoxOpened={isSearchBoxOpened}
        isAnimePlaying={isAnimePlaying}
      />
      {children}
      <Toaster />
      <Footer />
      <Burger isBurgerPlayed={isBurgerPlayed} isAnimePlaying={isAnimePlaying} />
      <SearchBox
        isSearchBoxOpened={isSearchBoxOpened}
        isAnimePlaying={isAnimePlaying}
      />
    </div>
  );
}
