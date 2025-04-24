"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  if (session) redirect("/");

  const router = useRouter();
  const [email, setEmail] = useState("randomEmail@gmail.com");
  const [password, setPassword] = useState("1234");

  async function handleSubmit(e) {
    e.preventDefault();

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

    if (res?.ok) {
      router.push("/sign-in");
    } else {
      throw new Error("email or password is invalid");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-[50px]">
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      <p>
        if you have already an account <Link href={"/sign-in"}>sign in</Link>
      </p>
    </div>
  );
}
