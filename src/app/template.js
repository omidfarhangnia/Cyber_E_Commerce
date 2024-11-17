"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer";
import Burger from "@/components/header/burger";

import { useRef } from "react";

export default function Template({ children }) {
  const isPlayed = useRef(false);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden font-sf-md">
      <Header isPlayed={isPlayed} />
      {children}
      <Footer />
      <Burger isPlayed={isPlayed} />
    </div>
  );
}
