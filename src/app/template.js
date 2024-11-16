"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Burger from "@/components/burger";

import { useRef } from "react";

export default function Template({ children }) {
  const isPlayed = useRef(false);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden bg-gray-700">
      <Header isPlayed={isPlayed} />
      {children}
      <Footer />
      <Burger isPlayed={isPlayed} />
    </div>
  );
}
