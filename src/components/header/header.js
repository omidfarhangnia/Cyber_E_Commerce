"use client";

import Image from "next/image";
import gsap from "gsap";
import NavLinks from "./nav-link";
import Link from "next/link";
import { categories } from "./nav-link";

export function handleBurgerAction(isBurgerPlayed, isAnimePlaying) {
  // checking for avoiding multiplay animations
  if (isAnimePlaying.current) return;
  isAnimePlaying.current = true;

  // starting animation function
  const tl = gsap.timeline();
  if (isBurgerPlayed.current) {
    tl.to(".nav-links-sm", {
      opacity: 0,
      duration: 0.3,
    })
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
          onComplete: () => {
            document.querySelector(".divider-container").style.display = "none";
          },
        },
        "startLabel",
      );
  } else {
    tl.to(
      ".divider-container",
      {
        bottom: "-40vh",
        duration: 2.5,
        onStart: () => {
          document.querySelector(".divider-container").style.display = "flex";
        },
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
      .to(".nav-links-sm", {
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
    <>
      <div className="flex items-center justify-center bg-white">
        <header className="grid w-full max-w-[1150px] grid-cols-2 content-between items-center px-5 py-8 md:px-10 lg:grid-cols-12 lg:px-4">
          <div className="lg:col-start-1 lg:col-end-2">
            <Link href={"/"}>
              <Image
                width={90}
                height={30}
                src={"/logo/black-logo.svg"}
                alt="logo image"
                priority
              />
            </Link>
          </div>
          <NavLinks {...props} />
        </header>
      </div>
      <div className="hidden bg-[#2E2E2E] lg:block">
        <div className="mx-auto flex max-w-[1128px] items-center justify-between px-[20px]">
          {categories.map((category) => {
            return (
              <div className="relative" key={category.id}>
                <Link
                  href={category.url}
                  className="group mx-auto flex items-center gap-[6px] transition-all hover:translate-y-[-2px]"
                >
                  <Image
                    width={30}
                    height={30}
                    alt="link icons"
                    className="opacity-50 group-hover:opacity-80"
                    src={category.svg}
                  />
                  <span className="py-[7px] font-medium leading-[32px] text-[#969696] group-hover:text-[#e5e5e5]">
                    {category.label}
                  </span>
                </Link>
                {category.id !== 5 && (
                  <div className="absolute right-[-36px] top-[8px] h-[30px] w-[2px] bg-[#969696]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
