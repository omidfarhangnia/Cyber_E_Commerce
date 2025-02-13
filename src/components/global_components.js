"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Product({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  function handleLikeProduct(e) {
    // auth condition

    setIsLiked(!isLiked);
    const tl = new gsap.timeline();
    tl.to(e.target, {
      y: -10,
      rotateZ: -10,
      duration: 0.2,
      scale: 1.1,
      ease: "bounce",
    }).to(e.target, {
      y: 0,
      rotateZ: 0,
      scale: 1,
      duration: 0.2,
      ease: "bounce",
    });
  }

  function handleSaveProduct(e) {
    // auth condition
    setIsSaved(!isSaved);
    const tl = new gsap.timeline();
    tl.to(e.target, {
      duration: 0.2,
      scale: 1.2,
      ease: "expo",
    }).to(e.target, {
      scale: 1,
      duration: 0.2,
      ease: "expo",
    });
  }

  function handleBuyProduct(e) {
    // auth condition
    const tl = new gsap.timeline();
    console.log(e.target);
    // tl.to(e.target);
  }

  return (
    <div className="products flex w-[90%] min-w-[160px] max-w-[240px] flex-col items-center rounded-[9px] bg-[#F6F6F6] px-[10px] py-[25px] hover:bg-[#e1e1e1] hover:transition-colors md:max-w-[300px] md:px-[20px]">
      <div className="mb-[15px] flex w-full items-center justify-between">
        <div className="cursor-pointer" onClick={handleSaveProduct}>
          <Image
            width={32}
            height={32}
            alt="save icon"
            src={
              isSaved ? "/icons/save-active.svg" : "/icons/save-inactive.svg"
            }
          />
        </div>
        <div className="cursor-pointer" onClick={handleLikeProduct}>
          <Image
            width={32}
            height={32}
            alt="like icon"
            src={
              isLiked ? "/icons/like-active.svg" : "/icons/like-inactive.svg"
            }
          />
        </div>
      </div>
      <Link
        href={`./product/${product.id}`}
        className="flex flex-col items-center"
      >
        <div className="mb-[15px]">
          <Image
            width={160}
            height={160}
            className="rounded-[10px] md:h-[200px] md:w-[200px]"
            alt="product image"
            src={product.img_url}
          />
        </div>
        <div>
          <h3 className="w-[200px] overflow-hidden text-ellipsis text-nowrap text-center text-[18px] font-medium md:text-[24px]">
            {product.name}
          </h3>
        </div>
        <div>
          {product.discount_percent === 0 ? (
            <div className="my-[10px] text-[25px] font-bold md:text-[30px]">
              ${product.price}
            </div>
          ) : (
            <div className="flex items-center gap-[20px]">
              <div className="relative my-[10px] font-bold opacity-[.8] md:text-[23]">
                $
                {Math.ceil(
                  product.price +
                    (product.price * product.discount_percent) / 100,
                )}
                <div className="absolute left-[-15%] top-[42%] h-[2px] w-[140%] rotate-[-10deg] bg-red-500"></div>
              </div>
              <div className="my-[10px] text-[25px] font-bold md:text-[30px]">
                ${product.price}
              </div>
            </div>
          )}
        </div>
      </Link>
      <button
        onClick={handleBuyProduct}
        className="flex items-center gap-[5px] rounded-full bg-black px-[25px] py-[10px] text-white md:justify-center md:px-[35px] md:py-[5px]"
      >
        <span className="font-semiboldbold text-[20px] md:text-[22px]">
          Buy Now
        </span>
        <Image
          width={32}
          height={32}
          alt="product image"
          className="md:h-[40px] md:w-[40px]"
          src={"/icons/shopping-cart.svg"}
        />
      </button>
    </div>
  );
}
