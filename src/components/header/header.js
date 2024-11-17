"use client";

import Image from "next/image";
import gsap from "gsap";
import NavLinks from "./nav-link";
import blackLogo from "../../../public/logo/black_logo.svg";

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
    <div className="border-b-solid flex items-center justify-center border-b-[1px] border-b-black">
      <header className="grid w-full max-w-[1150px] grid-cols-2 content-between items-center px-5 py-8 md:px-10 lg:grid-cols-12 lg:px-4">
        <div className="lg:col-start-1 lg:col-end-3">
          <Image width={100} height={30} src={blackLogo} alt="logo image" />
        </div>
        <NavLinks isPlayed={isPlayed} />
      </header>
    </div>
  );
}
