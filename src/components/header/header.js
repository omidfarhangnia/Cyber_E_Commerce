"use client";

import Image from "next/image";
import gsap from "gsap";
import NavLinks from "./nav-link";

export function handleBurgerAction(isBurgerPlayed, isAnimePlaying) {
  // checking for avoiding multiplay animations
  if (isAnimePlaying.current) return;
  isAnimePlaying.current = true;

  // starting animation function
  const tl = gsap.timeline();
  if (isBurgerPlayed.current) {
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

  // resetting the ref values
  isBurgerPlayed.current = !isBurgerPlayed.current;
  isAnimePlaying.current = false;
}

export default function Header(props) {
  return (
    <div className="border-b-solid flex items-center justify-center border-b-[1px] border-b-black bg-white">
      <header className="grid w-full max-w-[1150px] grid-cols-2 content-between items-center px-5 py-8 md:px-10 lg:grid-cols-12 lg:px-4">
        <div className="lg:col-start-1 lg:col-end-2">
          <Image
            width={100}
            height={30}
            src={"/logo/black_logo.svg"}
            alt="logo image"
            priority
          />
        </div>
        <NavLinks {...props} />
      </header>
    </div>
  );
}
