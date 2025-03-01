"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ProductComment,
  ProductQuestion,
} from "@/app/product/[productId]/page";
import gsap from "gsap";
import { useRouter } from "next/navigation";

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
            priority
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productId: id,
    title: "",
    score: 0,
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    isOk: false,
    message: "",
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    // if auth and adding name
    setLoading(true);
    setSuccessMessage({ isOk: false, message: "" });
    const res = await fetch(`/api/product/formAction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccessMessage({ isOk: true, message: "Message added successfully!" });
      router.replace(`/product/${id}`);
      setFormData({
        ...formData,
        title: "",
        score: 0,
        description: "",
      });
    } else {
      setSuccessMessage({ isOk: false, message: "Error adding message." });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="my-[30px] w-full max-w-[500px] rounded-[15px] bg-[#f4f4f4] p-[20px]"
    >
      <div className="mb-[20px] flex items-center justify-between">
        <h4 className="text-[18px] font-medium capitalize">leave a comment</h4>
        {successMessage.message && (
          <h5
            className={`text-[12px] text-gray-700 ${successMessage.isOk ? "text-green-600" : "text-red-600"}`}
          >
            {successMessage.message}
          </h5>
        )}
      </div>
      <div className="mb-[20px] flex flex-col">
        <label
          htmlFor="commentTitle"
          className="ml-[5px] font-medium capitalize text-[#303030]"
        >
          title
        </label>
        <input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          value={formData.score}
          onChange={(e) => setFormData({ ...formData, score: e.target.value })}
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
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          id="commentDescription"
          className="w-full resize-none rounded-[5px] border-[1px] border-solid border-[#303030] bg-transparent p-[10px] px-[10px] py-[4px] focus:outline-none"
          cols={15}
          rows={6}
        />
      </div>
      <div>
        <input
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-[5px] border-[1px] border-solid border-[#303030] py-[10px] text-[20px] font-semibold capitalize hover:bg-[#d9d9d9] hover:transition-all disabled:cursor-auto disabled:opacity-50 disabled:hover:bg-transparent"
          value="submit"
        />
      </div>
    </form>
  );
}

const commentViewTl = new gsap.timeline();
export function ProductCommentContainer({ comments }) {
  const [viewMore, setViewMore] = useState(false);

  function handleClickBtn() {
    if (commentViewTl.isActive()) return;
    if (!viewMore) {
      commentViewTl
        .to(".commentContainer", {
          height: "auto",
          duration: 0.5,
          marginBottom: "200px",
          onComplete: () => {
            gsap.set(".commentContainer", { overflow: "visible" });
          },
        })
        .to(".commentViewContainer", {
          duration: 0.3,
          bottom: "-100px",
          height: "100px",
          onComplete: () => {
            setViewMore(!viewMore);
            commentViewTl.clear();
          },
        });
    } else {
      commentViewTl
        .to(".commentContainer", {
          height: "300px",
          duration: 0.5,
          marginBottom: "100px",
          onStart: () => {
            gsap.set(".commentContainer", { overflow: "hidden" });
          },
        })
        .to(".commentViewContainer", {
          duration: 0.3,
          bottom: "0",
          height: "250px",
          onComplete: () => {
            setViewMore(!viewMore);
            commentViewTl.clear();
          },
        });
    }
  }

  return (
    <div className="commentContainer relative flex h-[300px] min-h-[300px] w-full flex-wrap items-center justify-center overflow-hidden md:gap-x-[40px]">
      {comments.map((comment, i) => {
        return <ProductComment key={i} comment={comment} />;
      })}
      <div className="commentViewContainer absolute bottom-0 flex h-[250px] w-full select-none items-end justify-center bg-gradient-to-t from-[#ffffff] from-[50%] to-[#ffffff00]">
        <button
          onClick={handleClickBtn}
          className="white--btn border-black text-[24px] font-semibold text-black"
        >
          {viewMore ? "View Less" : "View More"}
        </button>
      </div>
    </div>
  );
}

const questionViewTl = new gsap.timeline();
export function ProductQuestionContainer({ questions }) {
  const [viewMore, setViewMore] = useState(false);

  function handleClickBtn() {
    if (questionViewTl.isActive()) return;
    if (!viewMore) {
      questionViewTl
        .to(".questionContainer", {
          height: "auto",
          duration: 0.5,
          marginBottom: "200px",
          onComplete: () => {
            gsap.set(".questionContainer", { overflow: "visible" });
          },
        })
        .to(".questionViewContainer", {
          duration: 0.3,
          bottom: "-100px",
          height: "100px",
          onComplete: () => {
            setViewMore(!viewMore);
            questionViewTl.clear();
          },
        });
    } else {
      questionViewTl
        .to(".questionContainer", {
          height: "300px",
          duration: 0.5,
          marginBottom: "100px",
          onStart: () => {
            gsap.set(".questionContainer", { overflow: "hidden" });
          },
        })
        .to(".questionViewContainer", {
          duration: 0.3,
          bottom: "0",
          height: "250px",
          onComplete: () => {
            setViewMore(!viewMore);
            questionViewTl.clear();
          },
        });
    }
  }

  return (
    <div className="questionContainer relative flex h-[300px] w-full flex-wrap items-center justify-center overflow-hidden md:gap-x-[40px]">
      {questions.map((question, i) => {
        return <ProductQuestion key={i} question={question} />;
      })}
      <div className="questionViewContainer absolute bottom-0 flex h-[250px] w-full select-none items-end justify-center bg-gradient-to-t from-[#ffffff] from-[50%] to-[#ffffff00]">
        <button
          onClick={handleClickBtn}
          className="white--btn border-black text-[24px] font-semibold text-black"
        >
          {viewMore ? "View Less" : "View More"}
        </button>
      </div>
    </div>
  );
}
