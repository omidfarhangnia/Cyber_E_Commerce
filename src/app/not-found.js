import Link from "next/link";

export default function NotFound() {
  return (
    <div className="linearGradient--bg flex min-h-[60vh] w-full flex-col items-center justify-center text-white md:py-[60px]">
      <div className="text-[50px] md:text-[calc(80px_+_5vw)]">Oops!</div>
      <div className="mt-[10px] text-[20px] md:text-[25px]">
        404 - PAGE NOT FOUND
      </div>
      <p className="mt-[10px] max-w-[400px] px-[30px] text-center text-[14px] opacity-[.7] md:text-[16px]">
        The page your are looking for might have been removed had its name
        changed or is temporarily unavailable
      </p>
      <Link href={"/"} className="white--btn mt-[40px] md:text-[20px]">
        go to homepage
      </Link>
    </div>
  );
}
