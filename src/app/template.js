"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Burger from "@/components/header/burger";
import SearchBox from "@/components/header/search-box";
import Footer from "@/components/footer/footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

function InitialLoader() {
  return (
    <div
      id="initial__loader"
      style={{
        width: "100vw",
        height: "100dvh",
        background: "#e3e3e3",
        position: "fixed",
        zIndex: "100",
        display: "grid",
        gap: "30px",
        gridTemplateColumns: "50px 50px",
        gridTemplateRows: "50px 50px",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div
        className="skeleton--animation"
        style={{
          background: "#0e0e0e",
          width: "50px",
          aspectRatio: "1 / 1",
        }}
      ></div>
      <div
        className="skeleton--animation"
        style={{
          background: "#2A2A2A",
          width: "50px",
          aspectRatio: "1 / 1",
        }}
      ></div>
      <div
        className="skeleton--animation"
        style={{
          background: "#575757",
          width: "50px",
          aspectRatio: "1 / 1",
        }}
      ></div>
      <div
        className="skeleton--animation"
        style={{
          background: "#7b7b7b",
          width: "50px",
          aspectRatio: "1 / 1",
        }}
      ></div>
    </div>
  );
}

export default function Template({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024) {
        setIsBurgerMenuOpen(false);
      }
    }

    const handleLoad = () => {
      const loader = document.getElementById("initial__loader");
      if (loader) {
        setTimeout(() => {
          loader.classList.add("fade-out");

          const onAnimationEnd = () => {
            setIsLoading(false);
            loader.removeEventListener("animationend", onAnimationEnd);
          };

          loader.addEventListener("animationend", onAnimationEnd);
        }, 500);
      }
    };

    window.addEventListener("resize", handleResize);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    setIsBurgerMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {isLoading ? (
        <InitialLoader />
      ) : (
        <div className="font-sf-md project--template relative flex min-h-[100vh] w-full flex-col justify-between overflow-hidden bg-[#ffffff]">
          <Header
            setIsBurgerMenuOpen={setIsBurgerMenuOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
          {children}
          <Toaster />
          <Footer />
          <Burger
            isBurgerMenuOpen={isBurgerMenuOpen}
            setIsBurgerMenuOpen={setIsBurgerMenuOpen}
          />
          <SearchBox
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
        </div>
      )}
    </>
  );
}
