"use client";

import Image from "next/image";
import Link from "next/link";
import { links } from "./nav-link";
import { usePathname, useRouter } from "next/navigation";
import { categories } from "@/app/category/page";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSession } from "next-auth/react";
import { SignOutBtn } from "../global-components";
gsap.registerPlugin(useGSAP);

export default function Burger({ isBurgerMenuOpen, setIsBurgerMenuOpen }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
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
        .to(
          containerRef.current,
          {
            bottom: "-40vh",
            duration: 0.3,
          },
          "startLabel",
        )
        .to(
          containerRef.current,
          {
            x: "-500vw",
            duration: 0.3,
          },
          "startLabel",
        )
        .to(".nav-links-sm", {
          opacity: 1,
          duration: 0.3,
        });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (timelineRef.current) {
      if (isBurgerMenuOpen) {
        if (!timelineRef.current.isActive()) {
          timelineRef.current.play(0);
        }
      } else {
        timelineRef.current.reverse();
      }
    }
  }, [isBurgerMenuOpen]);

  return (
    <div
      ref={containerRef}
      style={{ display: "none" }}
      className="divider-container fixed bottom-[150%] z-50 hidden h-[140vh] w-[600vw] flex-col"
    >
      <div className="bg-[#b5b5b5]">
        <div className="nav-links-sm relative h-[100vh] opacity-0">
          <div className="fixed right-[10vw] top-[10vh] flex w-[80vw] flex-col justify-between rounded-[30px] bg-[rgba(255,255,255,0.4)] px-[20px] py-[30px]">
            <div className="flex items-center justify-between px-[2.5vw]">
              <Link href={"/"}>
                <Image
                  width={90}
                  height={30}
                  className="h-auto w-auto max-w-[80px]"
                  src={"/logo/black-logo.svg"}
                  alt="logo image"
                />
              </Link>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setIsBurgerMenuOpen(false);
                }}
              >
                <Image
                  src={"/icons/close.svg"}
                  width={35}
                  height={35}
                  alt="close icon"
                />
              </div>
            </div>
            <div className="my-4 flex flex-col items-start gap-[10px] pl-[6vw] md:pl-[10vw] md:text-[18px]">
              {links.map((link) => {
                return (
                  <Link
                    className={`${pathname === link.url && "font-bold"} nav--links hover:border-black`}
                    href={link.url}
                    key={link.id}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  if (pathname.startsWith("/search")) {
                    // if we are in search page close page
                    setIsBurgerMenuOpen(false);
                  } else {
                    // if we are not in search page go to search page
                    router.push("/search/");
                  }
                }}
                className={`${pathname.startsWith("/search") && "font-bold"} nav--links hover:border-[#000000]`}
              >
                search
              </button>
              {!session ? (
                <>
                  <Link
                    href="/sign-up"
                    className={`${pathname === "/sign-up" && "font-semibold"} nav--links hover:border-black`}
                  >
                    sign up
                  </Link>
                  <Link
                    href="/sign-in"
                    className={`${pathname === "/sign-in" && "font-semibold"} nav--links hover:border-black`}
                  >
                    sign in
                  </Link>
                </>
              ) : (
                <>
                  <SignOutBtn />
                  <div className="flex w-full items-center gap-x-[5%]">
                    <Link
                      href="/favorites"
                      className={`${pathname === "/favorites" && "opacity-95"} nav--links opacity-60 hover:border-black`}
                    >
                      <Image
                        width={28}
                        height={28}
                        alt="favorite icon"
                        src="/icons/favorites.svg"
                      />
                    </Link>
                    <Link
                      href="/shopping-cart"
                      className={`${pathname === "/shopping-cart" && "opacity-95"} nav--links opacity-60 hover:border-black`}
                    >
                      <Image
                        width={28}
                        height={28}
                        alt="favorite icon"
                        src="/icons/cart.svg"
                      />
                    </Link>
                    <Link
                      href="/profile"
                      className={`${pathname === "/profile" && "opacity-95"} nav--links opacity-60 hover:border-black`}
                    >
                      <Image
                        width={28}
                        height={28}
                        alt="favorite icon"
                        src="/icons/user.svg"
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className="border-t-solid flex w-full flex-wrap justify-center gap-[2%] self-center border-t-[1px] border-t-[#2E2E2E] pt-[20px] text-[14px] md:text-[16px]">
              {categories.map((category) => {
                return (
                  <Link
                    className="border-b-solid box-border w-[45%] min-w-[100px] border-b-[1px] border-b-[#2E2E2E] py-[5px] text-center text-[#000000] transition-all"
                    href={category.url}
                    key={category.id}
                  >
                    {category.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
