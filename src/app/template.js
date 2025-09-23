"use client";

import Header, { handleBurgerAction } from "@/components/header/header";
import Burger from "@/components/header/burger";

import { useEffect, useRef, useState } from "react";
import SearchBox from "@/components/header/search-box";
import Footer from "@/components/footer/footer";
import { Toaster } from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(true);
  const isBurgerPlayed = useRef(false);
  const isSearchBoxOpened = useRef(false);
  const isAnimePlaying = useRef(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024 && isBurgerPlayed.current) {
        handleBurgerAction(isBurgerPlayed, isAnimePlaying);
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

  return (
    <>
      {isLoading ? (
        <InitialLoader />
      ) : (
        <div className="font-sf-md project--template relative flex min-h-[100vh] w-full flex-col justify-between overflow-hidden bg-[#ffffff]">
          <Header
            isBurgerPlayed={isBurgerPlayed}
            isSearchBoxOpened={isSearchBoxOpened}
            isAnimePlaying={isAnimePlaying}
          />
          {children}
          <Toaster />
          <Footer />
          <Burger
            isBurgerPlayed={isBurgerPlayed}
            isAnimePlaying={isAnimePlaying}
          />
          <SearchBox
            isSearchBoxOpened={isSearchBoxOpened}
            isAnimePlaying={isAnimePlaying}
          />
        </div>
      )}
    </>
  );
}
