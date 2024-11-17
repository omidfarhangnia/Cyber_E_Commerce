"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer";
import Burger from "@/components/header/burger";

import { useRef } from "react";
import SearchBox from "@/components/header/search-box";

export default function Template({ children }) {
  const isPlayed = useRef(false);

  return (
    <div className="font-sf-md relative h-[100vh] w-full overflow-hidden">
      <Header isPlayed={isPlayed} />
      {children}
      <Footer />
      <Burger isPlayed={isPlayed} />
      <SearchBox />
    </div>
  );
}
