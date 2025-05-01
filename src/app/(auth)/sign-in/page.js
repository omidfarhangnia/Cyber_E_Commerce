"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  if (session) redirect("/");

  const [email, setEmail] = useState("random@gmail.com");
  const [password, setPassword] = useState("1234");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.ok) {
      throw new Error("invalided email and password");
    }
  }

  return (
    // <div className="flex flex-col items-center justify-center p-[50px]">
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       name="email"
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       name="password"
    //       type="password"
    //       placeholder="****"
    //       defaultValue={"1234"}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <input type="submit" value="submit" />
    //   </form>
    //   <p>
    //     if you have no account <Link href={"/sign-up"}>sign up</Link>
    //   </p>
    // </div>
    <div className="relative flex min-h-[700px] items-center justify-center">
      <div className="relative z-[3] mx-[20px] flex flex-col items-center justify-center rounded-[40px] bg-gray-200 p-[20px]">
        <form
          className="flex flex-col gap-[30px] px-[30px] py-[30px] md:gap-[45px] md:px-[100px] md:py-[50px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="email"
              className="text-[25px] font-semibold capitalize"
            >
              email
            </label>
            <input
              className="border-y-2 border-black bg-transparent px-[10px] py-[5px] text-[20px] transition-all focus:border-gray-800 focus:bg-gray-100 focus:outline-none"
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="password"
              className="text-[25px] font-semibold capitalize"
            >
              password
            </label>
            <input
              className="border-y-2 border-black bg-transparent px-[10px] py-[5px] text-[20px] transition-all focus:border-gray-800 focus:bg-gray-100 focus:outline-none"
              name="password"
              type="password"
              id="password"
              placeholder="****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="submit"
            className="rounded-full bg-black py-[10px] text-[20px] uppercase text-white shadow-lg"
          />
        </form>
        <p className="mb-[30px] px-[20px] text-center text-[18px] capitalize">
          if you have no account{" "}
          <Link
            href={"/sign-up"}
            className="uppercase underline underline-offset-4"
          >
            sign up
          </Link>
          .
        </p>
      </div>
      <div className="bg-glass absolute left-0 top-0 z-[2] h-full w-full"></div>
      <div className="absolute left-0 top-0 z-[1] h-full w-full overflow-hidden">
        <div className="box-anime absolute left-[10%] top-[-5%] aspect-square w-[40vw] max-w-[250px] rotate-[35deg] bg-[#9d9d9d]"></div>
        <div className="box-anime absolute bottom-[3%] right-[5%] aspect-square w-[40vw] max-w-[250px] rotate-[20deg] bg-[#b0b0b0]"></div>
        <div className="box-anime absolute right-[10%] top-[20%] aspect-square w-[20vw] max-w-[100px] rotate-[20deg] bg-[#888888]"></div>
        <div className="box-anime absolute bottom-[20%] left-[5%] aspect-square w-[20vw] max-w-[100px] rotate-[10deg] bg-[#717171]"></div>
      </div>
    </div>
  );
}
