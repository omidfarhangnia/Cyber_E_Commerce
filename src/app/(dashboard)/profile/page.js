"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  if (!session) redirect("/sign-in");

  return (
    <div>
      <h1 className="text-[50px]">you are in profile page</h1>
    </div>
  );
}
