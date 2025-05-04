"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  if (!session) redirect("/sign-in");

  return (
    <div className="flex items-center justify-center pb-[100px]">
      <div className="flex w-full max-w-[1000px] flex-col items-center">
        <div className="mx-auto my-[30px] flex w-[80%] max-w-[800px] select-none items-center justify-center md:my-[100px]">
          <span className="inline-block h-[2.5px] w-full bg-black"></span>
          <h1 className="mx-[20px] w-full text-center text-[23px] font-bold capitalize md:text-[40px]">
            Profile
          </h1>
          <span className="inline-block h-[2.5px] w-full bg-black"></span>
        </div>
        <div className="text-[20px] font-semibold md:text-[30px]">
          Email : {session.user.email}
        </div>
      </div>
    </div>
  );
}
