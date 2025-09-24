"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
gsap.registerPlugin(useGSAP);

export default function SearchBox({ isSearchOpen, setIsSearchOpen }) {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(
    () => {
      timelineRef.current = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          gsap.set(containerRef.current, { display: "none" });
        },
      });

      timelineRef.current
        .set(containerRef.current, { display: "block" })
        .to(containerRef.current, {
          top: 0,
          duration: 0.5,
          ease: "expo",
        })
        .to(
          containerRef.current,
          {
            background: "rgba(0,0,0,0.6)",
            duration: 0.6,
            ease: "expo.in",
          },
          "<",
        );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (timelineRef.current && !timelineRef.current.isActive()) {
      if (isSearchOpen) {
        timelineRef.current.play(0);
      } else {
        gsap.set(containerRef.current, { display: "block" });
        timelineRef.current.reverse();
      }
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory) {
      setSearchHistory(searchHistory);
    }
  }, []);

  function handleSearch(searchedTitle = null) {
    const query = (searchedTitle || inputText).trim();
    if (!query) return;

    // set data on local storage
    const newHistory = [
      query,
      ...searchHistory.filter((item) => item !== query),
    ].slice(0, 10);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    setSearchHistory(newHistory);

    setIsSearchOpen(false);
    setInputText("");
    // redirect to search page
    router.push(`/search/${query}`);
  }

  function handleClearHistory() {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  }

  return (
    <div
      ref={containerRef}
      style={{ display: "none" }}
      className="searchBox--container fixed top-[-600%] z-50 h-[100vh] w-full bg-[rgba(0,0,0,0)]"
    >
      <div className="relative flex h-[60%] min-h-[450px] w-full flex-col items-center justify-center gap-[30px] rounded-b-[30%] bg-[#F6F6F6] pt-[7%] md:rounded-b-[50%]">
        <div
          className="absolute right-[20px] top-[20px] cursor-pointer"
          onClick={() => setIsSearchOpen(false)}
        >
          <Image
            src={"/icons/close.svg"}
            width={40}
            height={40}
            alt="close icon"
          />
        </div>
        <div className="flex w-[80%] flex-wrap items-center justify-center gap-[20px] pt-[50px] md:pt-0">
          <input
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (!inputText.length) return;
              handleSearch();
            }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Product"
            className="input"
            type="text"
          />
          <button
            className="submit--btn"
            onClick={() => {
              if (!inputText.length) return;
              handleSearch();
            }}
          >
            Search
          </button>
        </div>
        <div className="w-full max-w-[1000px] px-[5%]">
          <div className="flex items-center justify-between capitalize">
            <div className="flex select-none items-center justify-center gap-[10px]">
              <Image
                src={"/icons/history.svg"}
                width={20}
                height={20}
                alt="search icon"
              />
              <h3 className="capitalize md:text-[20px]" onClick={handleSearch}>
                search history
              </h3>
            </div>
            {searchHistory.length !== 0 && (
              <div
                onClick={handleClearHistory}
                className="flex cursor-pointer items-center gap-[10px]"
              >
                <h3>clear history</h3>
                <Image
                  alt="rubbish bin"
                  src={"/icons/rubbish-bin.svg"}
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
          <div>
            {searchHistory.length === 0 ? (
              <div className="mt-[50px] flex flex-col items-center justify-center">
                <div className="text-[14px] capitalize text-[#222222]">
                  your history is empty
                </div>
                <Image
                  width={100}
                  height={100}
                  alt="empty icon"
                  src={"/icons/empty-box.svg"}
                />
              </div>
            ) : (
              <div className="mt-[20px] flex flex-wrap justify-center gap-[5px] md:gap-[20px]">
                {searchHistory?.map((searchedTitle, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (!searchedTitle.length) return;
                        handleSearch(searchedTitle);
                      }}
                      className="history--box"
                    >
                      {searchedTitle}
                      <div className="w-[30px]">
                        <Image
                          width={30}
                          height={30}
                          src={"/icons/arrow.svg"}
                          alt="this is arrow"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
