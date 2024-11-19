"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { handleBurgerAction } from "./header";
import { usePathname } from "next/navigation";
import { handleSearchBoxAction } from "./search-box";

const links = [
  {
    url: "/",
    id: 0,
    label: "Home",
  },
  {
    url: "/about",
    id: 1,
    label: "About",
  },
  {
    url: "/contact-us",
    id: 2,
    label: "Contact Us",
  },
  {
    url: "/blog",
    id: 3,
    label: "Blog",
  },
];

export default function NavLinks({
  isBurgerPlayed,
  isSearchBoxOpened,
  isAnimePlaying,
}) {
  const [auth, setAuth] = useState(true);
  const pathname = usePathname();

  return (
    <>
      <div
        className="cursor-pointer justify-self-end lg:hidden"
        onClick={() => {
          handleBurgerAction(isBurgerPlayed, isAnimePlaying);
        }}
      >
        <Image
          className="transition-all active:opacity-0"
          width={50}
          height={50}
          src={"/icons/burger_icon.svg"}
          alt="burger icon"
        />
      </div>
      <div className="hidden cursor-pointer lg:col-start-2 lg:col-end-5 lg:block lg:pl-[10px] xl:pl-[30px]">
        <div
          onClick={() => {
            handleSearchBoxAction(isSearchBoxOpened, isAnimePlaying);
          }}
          className="search-input flex w-full items-center gap-[10px] rounded-lg border-none bg-[#F5F5F5] px-3 py-2 focus-within:outline-none"
        >
          <Image
            src={"/icons/search.svg"}
            width={32}
            height={32}
            alt="search icon"
          />
          <div className="text-[#656565]">Search</div>
        </div>
      </div>
      <nav className="hidden items-center justify-between gap-[30px] ps-[20px] lg:col-start-5 lg:col-end-13 lg:flex xl:col-start-5">
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
        {!auth ? (
          // user before auth
          <>
            <Link href="/blog" className="nav--links hover:border-black">
              sign up
            </Link>
            <Link href="/blog" className="nav--links hover:border-black">
              log in
            </Link>
          </>
        ) : (
          // user after auth
          <>
            <Link href="/" className="nav--links hover:border-black">
              log out
            </Link>
            <Link href="/">
              <Image
                width={32}
                height={32}
                alt="favorite icon"
                src="/icons/favorites.svg"
              />
            </Link>
            <Link href="/">
              <Image
                width={32}
                height={32}
                alt="favorite icon"
                src="/icons/cart.svg"
              />
            </Link>
            <Link href="/">
              <Image
                width={32}
                height={32}
                alt="favorite icon"
                src="/icons/user.svg"
              />
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
