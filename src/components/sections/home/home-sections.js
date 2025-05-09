"use client";

import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/components/global-components";
import {
  Sec4Skeleton,
  Sec5Skeleton,
} from "@/components/skeletons/home-skeletons";

export function HomeSec1() {
  useGSAP(() => {
    const tl = new gsap.timeline();

    tl.from(".section_1--img", {
      opacity: 0,
      duration: 0.6,
      delay: 0.5,
      ease: "expo",
    }).from(".section_1--contentContainer > *", {
      x: -100,
      duration: 0.3,
      stagger: 0.1,
      opacity: 0,
    });
  });

  return (
    <div className="section_1 flex items-center justify-center bg-[#211C24]">
      <div className="flex w-full max-w-[1150px] flex-wrap items-center justify-center px-[16px] pt-[88px] lg:justify-evenly">
        <div className="section_1--contentContainer flex w-full flex-col items-center gap-[20px] lg:w-[45%] lg:items-start">
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
        <div className="section_1--img relative h-[300px] overflow-hidden lg:h-full lg:w-[40%] lg:overflow-visible">
          <Image
            width="400"
            height="600"
            alt="this is iphone image"
            className="relative h-auto w-auto object-contain lg:ml-auto"
            src="/images/iphone-image.webp"
            priority
          />
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
                priority
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

const categoryTl = new gsap.timeline();
let initialItems = [0, 1, 2];

export function HomeSec3() {
  const [selectedItem, setSelectedItem] = useState(initialItems);

  useEffect(() => {
    categoryTl.clear();
    categoryTl
      .set(".window--parts", { opacity: 1 })
      .to(".window--parts", {
        opacity: 0,
        filter: "blur(100px)",
        stagger: {
          each: 0.05,
          ease: "linear",
          from: "end",
        },
        delay: 0.2,
      })
      .set(".window--parts", { filter: "none" });
  }, [selectedItem]);

  function setNewItems(dir) {
    let newItems;
    if (dir === "next") {
      newItems = selectedItem.map((item) => {
        return item === 5 ? 0 : (item = item + 1);
      });
    } else {
      newItems = selectedItem.map((item) => {
        return item === 0 ? 5 : (item = item - 1);
      });
    }
    setSelectedItem(newItems);
  }

  function playCategoryAnime(dir) {
    if (categoryTl.isActive()) return;
    categoryTl.to(".window--parts", {
      opacity: 1,
      stagger: {
        each: 0.05,
        ease: "linear",
      },
      onComplete: () => setNewItems(dir),
    });
  }

  return (
    <div className="flex items-center justify-center bg-[#FAFAFA]">
      <div className="category w-full max-w-[1150px] px-[16px] py-[50px] md:px-[50px]">
        <div className="flex items-center justify-between">
          <Link href={"/category/"}>
            <h4 className="text-[23px] font-medium leading-[40px]">
              Browse By Category
            </h4>
          </Link>
          <div className="flex items-center justify-center gap-[10px]">
            <button
              onClick={() => playCategoryAnime("prev")}
              className="prev--catBtn transition-opacity hover:opacity-60"
            >
              <Image
                width={32}
                height={32}
                src={"/icons/category-left-arrow.svg"}
                style={{ height: "auto" }}
                alt="left arrow category"
              />
            </button>
            <button
              onClick={() => playCategoryAnime("next")}
              className="next--catBtn transition-opacity hover:opacity-60"
            >
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
          <div className="flex items-center justify-center gap-[30px] py-[48px] md:gap-[10%]">
            {selectedItem.map((itemIndex, i) => {
              return (
                <Link
                  className={`transition-transform hover:translate-y-[10px] md:w-[200px] ${i !== 0 ? "hidden md:block" : "w-[50%] md:w-[200px]"}`}
                  key={itemIndex}
                  href={secThreeCates[itemIndex].url}
                >
                  <div className="relative">
                    <div className="window--parts absolute right-0 top-0 h-[50%] w-[50%] rounded-tr-[20px] bg-[#0e0e0e] opacity-0"></div>
                    <div className="window--parts absolute left-0 top-0 h-[50%] w-[50%] rounded-tl-[20px] bg-[#2A2A2A] opacity-0"></div>
                    <div className="window--parts absolute bottom-0 left-0 h-[50%] w-[50%] rounded-bl-[20px] bg-[#575757] opacity-0"></div>
                    <div className="window--parts absolute bottom-0 right-0 h-[50%] w-[50%] rounded-br-[20px] bg-[#7b7b7b] opacity-0"></div>
                    <div className="flex min-h-[128px] flex-col items-center justify-center gap-[10px] rounded-[20px] bg-[#EDEDED] md:aspect-square">
                      <div>
                        <Image
                          width={56}
                          height={56}
                          src={secThreeCates[itemIndex].iconUrl}
                          alt={secThreeCates[itemIndex].text + " icons"}
                        />
                      </div>
                      <div className="text-[18px] font-medium">
                        {secThreeCates[itemIndex].text}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const productStatusTl = new gsap.timeline();

export function HomeSec4() {
  const [products, setProducts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("highestDiscount");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      fetchSelectedProducts(selectedStatus);
    }
  }, [selectedStatus, isMounted]);

  function playProductUnderlineAnime(newStatus) {
    if (productAnimeTl.isActive()) return;
    productAnimeTl
      .to(`.${selectedStatus}--underline`, {
        scaleX: 0,
        duration: 0.1,
      })
      .to(`.${newStatus}--underline`, {
        scale: 1,
        duration: 0.1,
      })
      .set(`.${selectedStatus}--underline`, {
        delay: 0.005,
        onComplete: () => {
          setSelectedStatus(newStatus);
          productStatusTl.clear();
        },
      });

    setSelectedStatus(newStatus);
  }

  async function fetchSelectedProducts(selectedCat) {
    setLoading(true);
    const res = await fetch(`/api/section4?selectedCat=${selectedCat}`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  return (
    <>
      <div className="section_4 flex w-full items-center justify-center bg-[#ffffff]">
        <div className="w-full max-w-[1300px] px-[16px] py-[55px]">
          <div className="mb-[32px] flex flex-wrap items-center justify-start gap-x-[30px] gap-y-[10px]">
            <button
              className={`relative w-[40%] min-w-[150px] text-start font-semibold capitalize md:w-auto md:min-w-0 ${selectedStatus !== "highestDiscount" && "text-[#8B8B8B]"}`}
              onClick={() => playProductUnderlineAnime("highestDiscount")}
            >
              <div className="relative inline">
                highest discount
                <div
                  className={`highestDiscount--underline absolute bottom-[-5px] left-0 h-[2px] w-full bg-[#000000] ${selectedStatus !== "highestDiscount" && "scale-x-0"}`}
                ></div>
              </div>
            </button>
            <button
              className={`relative w-[40%] min-w-[150px] text-start font-semibold capitalize md:w-auto md:min-w-0 ${selectedStatus !== "highestScore" && "text-[#8B8B8B]"}`}
              onClick={() => playProductUnderlineAnime("highestScore")}
            >
              <div className="relative inline">
                highest score
                <div
                  className={`highestScore--underline absolute bottom-[-5px] left-0 h-[2px] w-full bg-[#000000] ${selectedStatus !== "highestScore" && "scale-x-0"}`}
                ></div>
              </div>
            </button>
            <button
              className={`relative w-[40%] min-w-[150px] text-start font-semibold capitalize md:w-auto md:min-w-0 ${selectedStatus !== "bestSeller" && "text-[#8B8B8B]"}`}
              onClick={() => playProductUnderlineAnime("bestSeller")}
            >
              <div className="relative inline">
                best seller
                <div
                  className={`bestSeller--underline absolute bottom-[-5px] left-0 h-[2px] w-full bg-[#000000] ${selectedStatus !== "bestSeller" && "scale-x-0"}`}
                ></div>
              </div>
            </button>
            <button
              className={`relative w-[40%] min-w-[150px] text-start font-semibold capitalize md:w-auto md:min-w-0 ${selectedStatus !== "freeShipping" && "text-[#8B8B8B]"}`}
              onClick={() => playProductUnderlineAnime("freeShipping")}
            >
              <div className="relative inline">
                free shipping
                <div
                  className={`freeShipping--underline absolute bottom-[-5px] left-0 h-[2px] w-full bg-[#000000] ${selectedStatus !== "freeShipping" && "scale-x-0"}`}
                ></div>
              </div>
            </button>
          </div>
          <div className="products__container flex w-full flex-wrap items-center justify-center gap-x-[10px] gap-y-[15px]">
            {isMounted ? (
              loading ? (
                <Sec4Skeleton />
              ) : (
                products.map((product) => {
                  return <Product key={product.id} product={product} />;
                })
              )
            ) : (
              <Sec4Skeleton />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function HomeSec5() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/section5");
    const data = await res.json();
    setProduct(data);
    setLoading(false);
  }

  return (
    <>
      {loading && product.length !== 0 ? (
        <Sec5Skeleton />
      ) : (
        <div>
          <div className="hidden md:block">
            <Sec5LgDevice data={product} />
          </div>
          <div className="block md:hidden">
            <Sec5SmDevice data={product} />
          </div>
        </div>
      )}
    </>
  );
}

function Sec5LgDevice({ data }) {
  return (
    <div className="section_5lg">
      <div className="flex flex-wrap justify-center bg-gradient-to-r from-[#ffffff] from-[30%] to-[#2C2C2C] to-[60%]">
        {data.map((product) => {
          const bgColor = [
            "bg-[",
            product.theme_color,
            "]",
            " lg:w-[25%] w-[50%] flex flex-col justify-between max-w-[400px] devices",
          ].join("");
          return (
            <div className={bgColor} key={product.id}>
              <div
                className={`relative flex items-center ${product.id === 4 ? "justify-end" : "justify-center"} w-full`}
              >
                <Image
                  width={350}
                  height={350}
                  alt="popular image"
                  className={`object-contain ${product.id === 4 && "object-right"} h-[300px] w-[70%]`}
                  src={product.imgurl}
                />
              </div>
              <div className="flex flex-col items-center px-[32px] pb-[30px] pt-[15px] lg:py-[54px]">
                <h3
                  className={`${product.id > 2 ? "text-white" : "text-black"} select-none text-center text-[23px] lg:text-start lg:text-[30px]`}
                >
                  {product.title}
                </h3>
                <p className="mb-[15px] mt-[25px] w-full overflow-hidden overflow-ellipsis text-nowrap text-justify text-[15px] font-medium text-[#909090]">
                  {product.description}
                </p>
                <Link href={"/"}>
                  <button
                    className={`${product.id > 2 ? "white--btn" : "black--btn"} relative`}
                  >
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const productAnimeTl = new gsap.timeline();
const initialPostsNum = [3, 0, 1];
function Sec5SmDevice({ data }) {
  const [postsNum, setPostsNum] = useState(initialPostsNum);

  const prevBg = ["bg-[", data[postsNum[0]]?.theme_color, "]"].join("");
  const currentBg = ["bg-[", data[postsNum[1]]?.theme_color, "]"].join("");
  const nextBg = ["bg-[", data[postsNum[2]]?.theme_color, "]"].join("");

  useEffect(() => {
    productAnimeTl.clear();
    productAnimeTl
      .set(".productLoader--parts", { opacity: 1 })
      .to(".productLoader--parts", {
        opacity: 0,
        filter: "blur(100px)",
        stagger: {
          each: 0.05,
          ease: "linear",
          from: "end",
        },
        delay: 0.2,
      })
      .set(".productLoader--parts", { filter: "none" })
      .set(".productLoader--container", { display: "none" });
  }, [postsNum]);

  function playCategoryAnime(dir) {
    if (productAnimeTl.isActive()) return;
    productAnimeTl.set(".productLoader--container", { display: "block" });
    productAnimeTl.to(".productLoader--parts", {
      opacity: 1,
      stagger: {
        each: 0.05,
        ease: "linear",
      },
      onComplete: () => setNewPostsNum(dir),
    });
  }

  function setNewPostsNum(dir) {
    let newItems;
    if (dir === "next") {
      newItems = postsNum.map((item) => {
        return item === 3 ? 0 : (item = item + 1);
      });
    } else {
      newItems = postsNum.map((item) => {
        return item === 0 ? 3 : (item = item - 1);
      });
    }
    setPostsNum(newItems);
  }

  return (
    <div>
      {data[postsNum[1]] && (
        <div className={`relative overflow-hidden ${currentBg}`}>
          <div className="productLoader--container absolute left-0 top-0 z-10 hidden h-full w-full rotate-[135deg] scale-[3] blur-[.15px]">
            <div className="productLoader--parts absolute right-0 top-0 h-[50%] w-[50%] bg-[#0e0e0e] opacity-0"></div>
            <div className="productLoader--parts absolute left-0 top-0 h-[50%] w-[50%] bg-[#2A2A2A] opacity-0"></div>
            <div className="productLoader--parts absolute bottom-0 left-0 h-[50%] w-[50%] bg-[#575757] opacity-0"></div>
            <div className="productLoader--parts absolute bottom-0 right-0 h-[50%] w-[50%] bg-[#7b7b7b] opacity-0"></div>
          </div>
          <div className="min-h-[650px]">
            <div
              className={`relative flex items-center ${data[postsNum[1]].id === 4 ? "justify-end" : "justify-center"} w-full`}
            >
              <Image
                width={350}
                height={350}
                alt="popular image"
                className={`object-contain ${data[postsNum[1]].id === 4 && "object-right"} h-[300px] w-[70%]`}
                src={data[postsNum[1]].imgurl}
              />
            </div>
            <div className="flex flex-col items-center px-[32px] pb-[30px] pt-[15px] lg:py-[54px]">
              <h3
                className={`${data[postsNum[1]].id > 2 && "text-white"} select-none text-center text-[23px] lg:text-start lg:text-[30px]`}
              >
                {data[postsNum[1]]?.title}
              </h3>
              <p
                className={`${data[postsNum[1]].id > 2 && "text-[#c9c9c9]"} mb-[15px] mt-[25px] w-full text-justify text-[15px] font-medium text-[#909090]`}
              >
                {data[postsNum[1]]?.description}
              </p>
              <Link href={"/"}>
                <button
                  className={`${data[postsNum[1]].id > 2 ? "white--btn" : "black--btn"} relative`}
                >
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[50px] w-full justify-between">
            <button
              onClick={() => playCategoryAnime("prev")}
              className={`${prevBg} prev--catBtn w-[20%] rounded-r-full px-[3%]`}
            >
              <Image
                width={32}
                height={32}
                className="h-auto"
                src={"/icons/category-left-arrow.svg"}
                alt="left arrow category"
              />
            </button>
            <button
              onClick={() => playCategoryAnime("next")}
              className={`${nextBg} next--catBtn w-[20%] rounded-l-full px-[3%]`}
            >
              <Image
                width={32}
                height={32}
                className="ml-auto"
                src={"/icons/category-right-arrow.svg"}
                alt="left arrow category"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
