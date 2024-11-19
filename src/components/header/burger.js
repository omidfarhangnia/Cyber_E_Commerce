"use client";

import "@/components/burger_style.css";
import { handleBurgerAction } from "./header";
import Image from "next/image";
import Link from "next/link";
import { links, categories } from "./nav-link";
import { usePathname } from "next/navigation";

export default function Burger({ isBurgerPlayed, isAnimePlaying }) {
  const pathname = usePathname();

  return (
    <div className="divider-container absolute bottom-[150%] flex h-[140vh] w-[600vw] flex-col">
      <div className="bg-[#211C24]">
        <div className="nav-links-sm relative z-10 h-[100vh] opacity-0">
          <Image
            width={300}
            height={1000}
            src={"/bg/background.svg"}
            alt="background svg"
            className="absolute right-0 top-0 h-[100vh] w-[100vw] object-cover"
          />
          <div className="fixed right-[10vw] top-[10vh] h-[70vh] w-[80vw] rounded-[30px] bg-[rgba(255,255,255,0.4)] px-[20px] py-[30px]">
            <div className="flex justify-between">
              <Link href={"/"}>
                <Image
                  width={90}
                  height={30}
                  src={"/logo/black_logo.svg"}
                  alt="logo image"
                  priority
                />
              </Link>
              <div
                onClick={() => {
                  handleBurgerAction(isBurgerPlayed, isAnimePlaying);
                }}
              >
                <Image
                  src={"/icons/close.svg"}
                  width={30}
                  height={30}
                  alt="close icon"
                />
              </div>
            </div>
            <div className="mt-[30px] flex flex-col items-start gap-[10px] pl-[10px] text-[20px]">
              {links.map((link) => {
                return (
                  <Link
                    className={`${pathname === link.url && "font-bold"} nav--links hover:border-black`}
                    href={link.url}
                    key={link.id}
                  >
                    {" "}
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-[30px] flex flex-wrap justify-evenly gap-[5px]">
              {categories.map((category) => {
                return (
                  <Link
                    className="rounded-full bg-[#2E2E2E] px-[15px] py-[5px] text-[#969696] transition-all hover:text-white"
                    href={category.url}
                    key={category.id}
                  >
                    {category.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="z-10 h-[40vh] w-full">
        <div className="relative">
          <div className="shape-divider-bottom">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
          <div className="shape-divider-top">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
