"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { sendNewComment } from "./global-components-sr";

export function Product({ product }) {
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

export function ProductForm({ id }) {
  const [errorMessage, formAction, isPending] = useActionState(sendNewComment);
  const [score, setScore] = useState(0);

  return (
    <form
      action={formAction}
      className="my-[30px] w-full rounded-[15px] bg-[#f4f4f4] p-[20px]"
    >
      <h4 className="mb-[20px] text-[18px] font-medium capitalize">
        leave a comment
      </h4>
      <div className="mb-[20px] flex flex-col">
        <label
          htmlFor="commentTitle"
          className="ml-[5px] font-medium capitalize text-[#303030]"
        >
          title
        </label>
        <input
          required
          type="text"
          id="commentTitle"
          className="rounded-[5px] border-[1px] border-solid border-[#303030] bg-transparent px-[10px] py-[4px] focus:outline-none"
        />
      </div>
      <div className="mb-[20px] flex items-center justify-between">
        <label
          htmlFor="commentTitle"
          className="ml-[5px] font-medium capitalize text-[#303030]"
        >
          score
        </label>
        <input
          required
          type="number"
          min={0}
          max={5}
          step={0.1}
          value={score}
          onChange={(e) => setScore(e.target.value)}
          id="commentScore"
          className="w-[60%] rounded-[5px] border-[1px] border-solid border-[#303030] bg-transparent px-[10px] py-[4px] text-center focus:outline-none"
        />
      </div>
      <div className="mb-[20px] flex flex-col">
        <label
          htmlFor="commentDescription"
          className="ml-[5px] font-medium capitalize text-[#303030]"
        >
          description
        </label>
        <textarea
          required
          id="commentDescription"
          className="w-full resize-none rounded-[5px] border-[1px] border-solid border-[#303030] bg-transparent p-[10px] px-[10px] py-[4px] focus:outline-none"
          cols={15}
          rows={6}
        />
      </div>
      <div>
        <input
          type="submit"
          className="w-full cursor-pointer rounded-[5px] border-[1px] border-solid border-[#303030] py-[10px] text-[20px] font-semibold capitalize hover:bg-[#d9d9d9] hover:transition-all"
          value="submit"
        />
      </div>
    </form>
  );
}
