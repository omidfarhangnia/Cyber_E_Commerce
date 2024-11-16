"use client";

import Image from "next/image";
import blackLogo from "../../public/logo/black_logo.svg";
import burgerIcon from "../../public/icons/burger_icon.svg";
import gsap from "gsap";

export function handleClickBurger(isPlayed) {
  const tl = gsap.timeline();

  if (isPlayed) {
    tl.to(".nav-links", {
      opacity: 0,
      duration: 0.3,
    })
      .set(".nav-links", { display: "hidden" })
      .to(
        ".divider-container",
        {
          bottom: "150%",
          duration: 2.5,
        },
        "startLabel",
      )
      .to(
        ".divider-container",
        {
          x: 0,
          duration: 1.5,
        },
        "startLabel",
      );
  } else {
    tl.to(
      ".divider-container",
      {
        bottom: "-40vh",
        duration: 2.5,
      },
      "startLabel",
    )
      .to(
        ".divider-container",
        {
          x: "-500vw",
          duration: 1.5,
          delay: 0.5,
        },
        "startLabel",
      )
      .set(".nav-links", {
        display: "block",
      })
      .to(".nav-links", {
        opacity: 1,
        duration: 0.5,
      });
  }
}

export default function Header({ isPlayed }) {
  return (
    <div className="border-b-solid border-b-[1px] border-b-black">
      <header className="flex items-center justify-between px-5 py-8">
        <div>
          <Image width={100} height={30} src={blackLogo} alt="logo image" />
        </div>
        <div
          onClick={() => {
            handleClickBurger(isPlayed.current);
            isPlayed.current = !isPlayed.current;
          }}
        >
          <Image
            className="transition-all active:opacity-0"
            width={50}
            height={50}
            src={burgerIcon}
            alt="burger icon"
          />
        </div>
      </header>
    </div>
  );
}
