"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("omidfnia@gmail.com");
  const [password, setPassword] = useState("1234");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.refresh();
      router.push("/");
    } else {
      throw new Error("invalided email and password");
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
          defaultValue={"1234"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      <p>
        if you have no account <Link href={"/sign-up"}>sign up</Link>
      </p>
    </div>
  );
}
