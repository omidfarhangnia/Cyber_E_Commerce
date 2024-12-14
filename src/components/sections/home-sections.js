"use client";

import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
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
    imgUrl: "/images/apple-airpods-max.svg",
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
    imgClass: "lg:w-[30%] lg:h-[100%] lg:object-cover lg:object-right",
    position:
      "col-start-1 col-end-3 row-start-2 row-end-3 lg:justify-between lg:pl-0",
  },
  {
    id: 1,
    imgUrl: "/images/apple-vision-pro.svg",
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
    imgClass: "lg:w-[35%] lg:h-[100%] lg:object-cover lg:object-right",
    position:
      "col-start-3 col-end-5 row-start-2 row-end-3 lg:justify-between lg:pl-0",
  },
  {
    id: 2,
    imgUrl: "/images/playstation-5.svg",
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
    imgClass: "lg:w-[35%] lg:h-[100%] lg:object-cover lg:object-right",
    position:
      "col-start-1 col-end-5 row-start-1 row-end-2 lg:justify-between lg:py-0 lg:pl-0",
  },
  {
    id: 3,
    imgUrl: "/images/macbook-air.svg",
    header: (
      <>
        Macbook <span className="font-bold">Air</span>
      </>
    ),
    prag: "The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.",
    bgClass: "bg-[#EDEDED]",
    isLight: true,
    width: 330,
    height: 200,
    imgClass:
      "lg:w-[50%] lg:h-[100%] lg:object-cover lg:object-left lg:order-1",
    position:
      "col-start-5 col-end-9 row-start-1 row-end-3 lg:justify-between lg:[&>div>a]:text-start lg:[&>div>h3]:text-[45px] lg:[&>div>h3]:pb-[15px] lg:[&>div>p]:pb-[10px] lg:pl-[50px] lg:pr-0",
  },
];

export function HomeSec2() {
  return (
    <div className="flex w-full justify-center bg-[#EDEDED]">
      <div className="flex max-w-[1500px] flex-col lg:grid lg:h-[600px] lg:grid-cols-8 lg:grid-rows-2">
        {secTwoContent.map((section) => {
          return (
            <div
              key={section.id}
              className={`flex ${section.position} flex-col md:flex-row md:justify-evenly ${section.bgClass} items-center px-[15px] py-[40px]`}
            >
              <Image
                width={section.width}
                height={section.height}
                className={`object-contain md:w-[200px] md:justify-self-stretch ${section.imgClass}`}
                alt={section.header}
                src={section.imgUrl}
              />
              <div className="md:w-[50%] lg:w-[60%]">
                <h3
                  className={`mt-[24px] ${!section.isLight && "text-white"} text-center text-[34px] leading-[40px] lg:text-start lg:text-[30px]`}
                >
                  {section.header}
                </h3>
                <p className="mt-[8px] text-center font-medium leading-[24px] text-[#909090] lg:text-start lg:text-[14px]">
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
    </div>
  );
}

const secThreeCates = [
  {
    iconUrl: "/icons/phones-black.svg",
    text: "Phones",
    url: "/category/phones",
  },
  {
    iconUrl: "/icons/smart-watches-black.svg",
    text: "Smart Watches",
    url: "/category/smart-watches",
  },
  {
    iconUrl: "/icons/cameras-black.svg",
    text: "Cameras",
    url: "/category/cameras",
  },
  {
    iconUrl: "/icons/headphones-black.svg",
    text: "Headphones",
    url: "/category/headphones",
  },
  {
    iconUrl: "/icons/computers-black.svg",
    text: "Computers",
    url: "/category/computers",
  },
  {
    iconUrl: "/icons/gaming-black.svg",
    text: "Gaming",
    url: "/category/gaming",
  },
];

const categoryTL = gsap.timeline();

export function HomeSec3() {
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    const nextBtn = document.querySelector(".next--catBtn");
    const prevBtn = document.querySelector(".prev--catBtn");

    nextBtn.addEventListener("click", () => {
      playCategoryAnime("next");
    });
    prevBtn.addEventListener("click", () => {
      playCategoryAnime("prev");
    });
  }, []);

  function playCategoryAnime(dir) {
    if (categoryTL.isActive()) return;
    categoryTL
      .to(".window--parts", {
        opacity: 1,
        stagger: {
          each: 0.1,
          ease: "linear",
        },
        onComplete: () => {
          if (dir === "next") {
            setSelectedItem((x) => (x === 5 ? 0 : (x = x + 1)));
          } else {
            setSelectedItem((x) => (x === 0 ? 5 : (x = x - 1)));
          }
        },
      })
      .to(".window--parts", {
        opacity: 0,
        filter: "blur(100px)",
        stagger: {
          each: 0.05,
          ease: "linear",
        },
        delay: 0.5,
      })
      .set(".window--parts", { filter: "none" });
  }

  return (
    <div className="flex items-center justify-center bg-[#FAFAFA]">
      <div className="category w-full max-w-[1150px] px-[16px] py-[50px]">
        <div className="flex items-center justify-between">
          <h4 className="text-[23px] font-medium leading-[40px]">
            Browse By Category
          </h4>
          <div className="flex items-center justify-center gap-[10px]">
            <button className="prev--catBtn transition-opacity hover:opacity-60">
              <Image
                width={32}
                height={32}
                src={"/icons/category-left-arrow.svg"}
                alt="left arrow category"
              />
            </button>
            <button className="next--catBtn transition-opacity hover:opacity-60">
              <Image
                width={32}
                height={32}
                src={"/icons/category-right-arrow.svg"}
                alt="left arrow category"
              />
            </button>
          </div>
        </div>
        <div>
          <div className="category-sm-dv flex items-center justify-center py-[48px] md:hidden">
            <Link href={secThreeCates[selectedItem].url}>
              <div className="category--container relative">
                <div className="window--parts absolute right-0 top-0 h-[50%] w-[50%] rounded-tr-[20px] bg-[#0e0e0e] opacity-0"></div>
                <div className="window--parts absolute left-0 top-0 h-[50%] w-[50%] rounded-tl-[20px] bg-[#2A2A2A] opacity-0"></div>
                <div className="window--parts absolute bottom-0 left-0 h-[50%] w-[50%] rounded-bl-[20px] bg-[#575757] opacity-0"></div>
                <div className="window--parts absolute bottom-0 right-0 h-[50%] w-[50%] rounded-br-[20px] bg-[#7b7b7b] opacity-0"></div>
                <div className="flex aspect-square h-[128px] w-[163px] flex-col items-center justify-center gap-[10px] rounded-[20px] bg-[#EDEDED]">
                  <div>
                    <Image
                      width={56}
                      height={56}
                      src={secThreeCates[selectedItem].iconUrl}
                      alt={secThreeCates[selectedItem].text + " icons"}
                    />
                  </div>
                  <div className="text-[18px] font-medium">
                    {secThreeCates[selectedItem].text}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="category-md-dv hidden md:block"></div>
        </div>
      </div>
    </div>
  );
}
