import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="flex flex-col items-center justify-center p-[50px]">
      <form>
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={"omidfnia@gmail.com"}
        />
        <input
          name="password"
          type="password"
          placeholder="****"
          defaultValue={"1234"}
        />
        <input type="submit" value="submit" />
      </form>
      <p>
        if you have already an account <Link href={"/sign-in"}>sign in</Link>
      </p>
    </div>
  );
}
