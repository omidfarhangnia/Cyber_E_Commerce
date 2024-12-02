import gsap from "gsap";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function handleSearchBoxAction(
  isSearchBoxOpened,
  isAnimePlaying,
  isRedirectPorpuse = false,
  pathname = "",
) {
  // checking for avoiding multiplay animations
  if (isAnimePlaying.current) return;
  isAnimePlaying.current = true;

  // starting animation function
  const tl = gsap.timeline();
  if (isSearchBoxOpened.current) {
    tl.to(".searchBox--container > div", {
      y: "-60vh",
      duration: 0.3,
      ease: "expo",
    })
      .to(
        ".searchBox--container",
        {
          background: "rgba(0,0,0,0)",
          duration: 0.6,
          ease: "expo.in",
        },
        "<",
      )
      .set(".searchBox--container", {
        bottom: "100%",
      })
      .set(".searchBox--container > div", {
        y: "0",
        onComplete: () => {
          if (isRedirectPorpuse) {
            redirect(pathname);
          }
        },
      });
  } else {
    tl.to(".searchBox--container", {
      bottom: 0,
      duration: 0.5,
      ease: "expo",
    }).to(
      ".searchBox--container",
      {
        background: "rgba(0,0,0,0.6)",
        duration: 0.6,
        ease: "expo.in",
      },
      "<",
    );
  }

  // resetting the ref values
  isSearchBoxOpened.current = !isSearchBoxOpened.current;
  isAnimePlaying.current = false;
}

export default function SearchBox({ isSearchBoxOpened, isAnimePlaying }) {
  const [inputText, setInputText] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory) {
      setSearchHistory(searchHistory);
    }
  }, []);

  function handleSearch() {
    // set data on local storage
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory) {
      if (searchHistory.length >= 10) {
        searchHistory.unshift(inputText);
        searchHistory.pop();
      } else {
        searchHistory.unshift(inputText);
      }
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    } else {
      localStorage.setItem("searchHistory", JSON.stringify([inputText]));
    }
    setSearchHistory(JSON.parse(localStorage.getItem("searchHistory")));
    // redirect to search page
    handleSearchBoxAction(
      isSearchBoxOpened,
      isAnimePlaying,
      true,
      `/search/${inputText}`,
    );
    setInputText("");
  }

  function handleClearHistory() {
    localStorage.setItem("searchHistory", "[]");
    setSearchHistory([]);
  }

  return (
    <div className="searchBox--container fixed bottom-full z-50 h-[100vh] w-full bg-[rgba(0,0,0,0)]">
      <div className="relative flex h-[60%] min-h-[450px] w-full flex-col items-center gap-[30px] rounded-b-[50%] bg-[#F6F6F6] pt-[7%]">
        <div
          className="absolute right-[20px] top-[20px]"
          onClick={() => {
            handleSearchBoxAction(isSearchBoxOpened, isAnimePlaying);
          }}
        >
          <Image
            src={"/icons/close.svg"}
            width={40}
            height={40}
            alt="close icon"
          />
        </div>
        <div className="flex w-[80%] items-center justify-center gap-[20px]">
          <input
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
        <div className="w-[55%]">
          <div className="flex items-center justify-between">
            <div className="flex select-none items-center gap-[10px]">
              <Image
                src={"/icons/history.svg"}
                width={22}
                height={22}
                alt="search icon"
              />
              <h3 className="text-[20px] capitalize" onClick={handleSearch}>
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
                  width={22}
                  height={22}
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
              <div className="mt-[15px] flex flex-wrap gap-[20px]">
                {searchHistory?.map((member, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        handleSearchBoxAction(
                          isSearchBoxOpened,
                          isAnimePlaying,
                          true,
                          `/search/${member}`,
                        );
                      }}
                      className="history--box"
                    >
                      {member}
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
