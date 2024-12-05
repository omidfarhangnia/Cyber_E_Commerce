"use client";

import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";

export function HomeSec1() {
  const sectionOneRef = useRef();

  useGSAP(
    (context, contextSafe) => {
      const tl = gsap.timeline();
      let q = gsap.utils.selector(sectionOneRef.current);

      tl.from(sectionOneRef.current, {
        opacity: 0,
        duration: 1,
        delay: 2,
        ease: "expo",
      }).from(
        q(".imageBorders"),
        {
          opacity: 0,
          duration: 0.5,
          ease: "linear",
          scale: 0.85,
        },
        "-=.5",
      );
    },
    { scope: ".section_1" },
  );

  return (
    <div
      ref={sectionOneRef}
      className="section_1 flex items-center justify-center bg-[#211C24]"
    >
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
          <Link href={"/"}>
            <button className="white--btn relative my-[28px] lg:my-0">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="relative h-[300px] overflow-hidden lg:h-full lg:w-[40%] lg:overflow-visible">
          <Image
            width="400"
            height="600"
            alt="this is iphone image"
            className="relative h-auto lg:ml-auto"
            src="/images/iphone-image.webp"
            priority
          />
          <div className="imageBorders absolute left-[20px] top-[-30px] z-[2] hidden h-[150px] w-[150px] rounded-tl-[20px] border-l-[2px] border-t-[2px] border-solid border-[#6B39F0] lg:block"></div>
          <div className="imageBorders absolute bottom-[-40px] right-[-30px] z-[2] hidden h-[150px] w-[150px] rounded-br-[20px] border-b-[2px] border-r-[2px] border-solid border-[#6B39F0] lg:block"></div>
        </div>
      </div>
    </div>
  );
}

const secTwoContent = [
  {
    id: 0,
    imgUrl: "/images/apple-airpods-max.png",
    header: (
      <>
        Apple AirPods <span className="font-bold">Max</span>
      </>
    ),
    prag: "Computational audio. Listen, it's powerful",
    bgClass: "bg-[#EDEDED]",
    isLight: true,
    width: 200,
    height: 200,
    position: "col-start-1 col-end-3 row-start-2 row-end-3",
  },
  {
    id: 1,
    imgUrl: "/images/apple-vision-pro.png",
    header: (
      <>
        Apple Vision <span className="font-bold">Pro</span>
      </>
    ),
    prag: "An immersive way to experience entertainment",
    bgClass: "bg-[#353535]",
    isLight: false,
    width: 330,
    height: 200,
    position: "col-start-3 col-end-5 row-start-2 row-end-3",
  },
  {
    id: 2,
    imgUrl: "/images/playstation-5.png",
    header: (
      <>
        Playstation <span className="font-bold">5</span>
      </>
    ),
    prag: "Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.",
    bgClass: "bg-[#ffffff]",
    isLight: true,
    width: 200,
    height: 200,
    position: "col-start-1 col-end-5 row-start-1 row-end-2",
  },
  {
    id: 3,
    imgUrl: "/images/macbook-air.png",
    header: (
      <>
        <span className="font-bold">Macbook</span> Air
      </>
    ),
    prag: "The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.",
    bgClass: "bg-[#EDEDED]",
    isLight: true,
    width: 330,
    height: 200,
    position: "col-start-5 col-end-9 row-start-1 row-end-3",
  },
];

export function HomeSec2() {
  return (
    <div className="flex h-[100vh] flex-col lg:grid lg:grid-cols-8 lg:grid-rows-2">
      {secTwoContent.map((section) => {
        return (
          <div
            key={section.id}
            className={`flex ${section.position} flex-col md:flex-row md:justify-evenly ${section.bgClass} items-center bg-[#EDEDED] px-[15px] py-[40px]`}
          >
            <Image
              width={section.width}
              height={section.height}
              className="object-contain md:w-[200px] md:justify-self-stretch"
              alt={section.header}
              src={section.imgUrl}
            />
            <div className="md:w-[50%]">
              <h3
                className={`mt-[24px] ${!section.isLight && "text-white"} text-center text-[34px] leading-[40px]`}
              >
                {section.header}
              </h3>
              <p className="mt-[8px] text-center font-medium leading-[24px] text-[#909090]">
                {section.prag}
              </p>
              {section.id === 3 && (
                <Link href={"/"} className="block text-center">
                  <button className="black--btn relative my-[28px] w-full max-w-[400px] text-[18px] font-semibold lg:my-0">
                    Shop Now
                  </button>
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
