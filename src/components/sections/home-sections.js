import Image from "next/image";

export default function HomeSec1() {
  return (
    <div className="flex items-center justify-center bg-[#211C24]">
      <div className="flex w-full max-w-[1150px] flex-wrap items-center justify-center px-[16px] pt-[88px] lg:justify-evenly">
        <div className="flex w-full flex-col items-center gap-[20px] lg:w-[45%] lg:items-start">
          <h3 className="text-[25px] font-semibold leading-[32px] text-[#7A777C]">
            Pro.Beyond.
          </h3>
          <h1 className="text-center text-[66px] leading-[70px] text-white lg:text-start">
            IPhone 14 <span className="font-semibold">Pro</span>
          </h1>
          <p className="text-center text-[16px] font-medium text-[#909090] lg:text-start">
            Created to change everything for the better. For everyone
          </p>
          <button className="white--btn my-[28px] lg:my-0">Shop Now</button>
        </div>
        <div className="h-[300px] overflow-hidden lg:h-full lg:w-[40%]">
          <Image
            width="400"
            height="600"
            alt="this is iphone image"
            className="lg:ml-auto"
            src="/images/iphone-image.webp"
          />
        </div>
      </div>
    </div>
  );
}
