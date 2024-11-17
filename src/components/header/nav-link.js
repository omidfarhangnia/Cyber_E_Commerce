import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { handleClickBurger } from "./header";

export default function NavLinks({ isPlayed }) {
  const [auth, setAuth] = useState(false);

  return (
    <>
      <div
        className="justify-self-end lg:hidden"
        onClick={() => {
          handleClickBurger(isPlayed.current);
          isPlayed.current = !isPlayed.current;
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
      <div className="hidden lg:col-start-3 lg:col-end-6 lg:block">
        <input
          type="text"
          className="search-input w-full border-none bg-[#F5F5F5] p-3 focus-within:outline-none"
          placeholder="Search"
        />
      </div>
      <nav className="hidden items-center justify-between gap-[40px] lg:col-start-7 lg:col-end-13 lg:flex">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href={"/contact-us"}>Contact Us</Link>
        <Link href="/blog">Blog</Link>
        {!auth ? (
          // user before auth
          <>
            <Link href="/blog">sign up</Link>
            <Link href="/blog">log in</Link>
          </>
        ) : (
          // user after auth
          <>
            <Link href="/blog">log out</Link>
            <Link href="/blog">
              <Image
                width={32}
                height={32}
                alt="favorite icon"
                src="/icons/favorites.svg"
              />
            </Link>
            <Link href="/blog">
              <Image
                width={32}
                height={32}
                alt="favorite icon"
                src="/icons/cart.svg"
              />
            </Link>
            <Link href="/blog">
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
