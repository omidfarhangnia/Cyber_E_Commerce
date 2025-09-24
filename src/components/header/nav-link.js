"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { SignOutBtn } from "../global-components";

export const links = [
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
    url: "/category",
    id: 3,
    label: "Category",
  },
];

export default function NavLinks({ setIsBurgerMenuOpen, setIsSearchOpen }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <>
      <div
        className="cursor-pointer justify-self-end lg:hidden"
        onClick={() => {
          setIsBurgerMenuOpen(true);
        }}
      >
        <Image
          className="transition-all active:opacity-0"
          width={50}
          height={50}
          src={"/icons/burger-icon.svg"}
          alt="burger icon"
        />
      </div>
      <div className="hidden cursor-pointer lg:col-start-2 lg:col-end-5 lg:block lg:pl-[10px] xl:pl-[30px]">
        <div
          onClick={() => setIsSearchOpen(true)}
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
      <nav className="hidden items-center justify-between gap-[30px] ps-[20px] text-[15px] lg:col-start-5 lg:col-end-13 lg:flex xl:col-start-5">
        {links.map((link) => {
          return (
            <Link
              className={`${pathname === link.url && "font-semibold"} nav--links hover:border-black`}
              href={link.url}
              key={link.id}
            >
              {link.label}
            </Link>
          );
        })}
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
          </>
        )}
      </nav>
    </>
  );
}
