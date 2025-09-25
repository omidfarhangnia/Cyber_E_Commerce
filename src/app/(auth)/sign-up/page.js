"use client";

import { checkValidation } from "@/components/auth/validation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  if (session) redirect("/");

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // status = "idle" | "submitting" | "error"
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (checkValidation(email, password, setStatus, setError)) {
      setStatus("submitting");
      setError("");
    } else {
      return;
    }

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setStatus("idle");
        router.push("/sign-in");
      } else {
        setStatus("error");
        setError("email is in used.");
      }
    } catch (err) {
      setStatus("error");
      setError("something went wrong, please try again.");
    }
  }

  return (
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
              autoComplete="email"
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
              autoComplete="current-password"
              placeholder="****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mb-[-20px] mt-[-15px] h-[18px] text-center text-[14px] capitalize text-red-500">
            {status === "error" && error}
          </p>
          <input
            type="submit"
            disabled={status === "submitting"}
            value={status === "submitting" ? "submitting" : "submit"}
            className="rounded-full bg-black py-[10px] text-[20px] uppercase text-white shadow-lg"
          />
        </form>
        <p className="mb-[30px] px-[20px] text-center text-[18px] capitalize">
          if you have already an account{" "}
          <Link
            href={"/sign-in"}
            className="uppercase underline underline-offset-4"
          >
            sign in
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
