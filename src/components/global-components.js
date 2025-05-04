"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ProductComment,
  ProductQuestion,
} from "@/app/product/[productId]/page";
import gsap from "gsap";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Product({ product }) {
  const { data: session, update } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [animeLoading, setAnimeLoading] = useState(false);
  const btnRef = useRef();

  useEffect(() => {
    if (session?.user?.favorites) {
      try {
        const favorites = JSON.parse(session.user.favorites);
        setIsLiked(favorites.includes(product.id));
      } catch (error) {
        console.error("Failed to parse favorites:", error);
        setIsLiked(false);
      }
    } else {
      setIsLiked(false);
    }

    if (session?.user?.shopping_cart) {
      try {
        const shopping_cart = JSON.parse(session.user.shopping_cart);
        setIsInCart(shopping_cart.includes(product.id));
      } catch (error) {
        console.error("failed to parse favorites:", error);
        setIsInCart(false);
      }
    } else {
      setIsInCart(false);
    }
  }, [session, product.id]);

  async function handleLikeProduct(e) {
    e.stopPropagation();

    if (animeLoading) return;
    setIsLiked((prevIsLiked) => !prevIsLiked);

    const tl = new gsap.timeline();
    setAnimeLoading(true);
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
      onComplete: async () => {
        const res = await fetch("/api/like-product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product.id,
            email: session.user.email,
            favorites: session.user.favorites,
            status: isLiked ? "remove" : "add",
          }),
        });

        if (res.ok) {
          location.reload();
        } else {
          console.log("liked failed");
          setIsLiked((prevIsLiked) => !prevIsLiked);
        }
        setAnimeLoading(false);
      },
    });
  }

  function handleBuyProduct(e) {
    e.stopPropagation();

    if (animeLoading) return;

    const tl = new gsap.timeline();
    const btnShoppingCart = btnRef.current.querySelector("img");
    const btnAddText = btnRef.current.querySelector(".addSpan");
    const btnRemoveText = btnRef.current.querySelector(".removeSpan");

    async function handleToggleCart() {
      const res = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          email: session.user.email,
          shopping_cart: session.user.shopping_cart,
          status: isInCart ? "remove" : "add",
        }),
      });

      if (res.ok) {
        location.reload();
      } else {
        console.log("liked failed");
        setIsInCart((prevIsInCart) => !prevIsInCart);
      }
    }

    setIsInCart(!isInCart);

    if (!isInCart) {
      // add to cart
      tl.to(btnShoppingCart, {
        x: "100px",
        duration: 0.7,
        ease: "expo",
      })
        .to(
          btnAddText,
          {
            x: "250%",
            duration: 0.4,
            ease: "expo",
          },
          "-=.4",
        )
        .set(btnShoppingCart, {
          x: "-200px",
        })
        .to(btnShoppingCart, {
          x: "10px",
          duration: 0.4,
          ease: "expo.out",
        })
        .set(btnRemoveText, {
          display: "inline",
        })
        .to(btnRemoveText, {
          opacity: "1",
          duration: 0.4,
          ease: "expo.out",
          onComplete: handleToggleCart,
        });
    } else {
      // remove from cart
      tl.to(btnShoppingCart, {
        x: "100px",
        duration: 0.7,
        ease: "expo",
      })
        .to(
          btnRemoveText,
          {
            x: "250%",
            duration: 0.4,
            ease: "expo",
          },
          "-=.4",
        )
        .set(btnShoppingCart, {
          x: "-200px",
        })
        .to(btnShoppingCart, {
          x: "0",
          duration: 0.4,
          ease: "expo.out",
        })
        .set(btnAddText, {
          display: "inline",
        })
        .to(btnAddText, {
          opacity: "1",
          duration: 0.4,
          ease: "expo.out",
          onComplete: handleToggleCart,
        });
    }
  }

  return (
    <>
      <div className="products flex w-[90%] min-w-[160px] max-w-[240px] flex-col items-center rounded-[9px] border-[1px] border-solid border-black px-[10px] py-[25px] hover:bg-[#f4f4f4] hover:transition-colors md:max-w-[300px] md:px-[20px]">
        <Link
          href={`/product/${product.id}`}
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
            <h3 className="mt-[10px] w-[200px] overflow-hidden text-ellipsis text-nowrap text-center font-medium md:text-[18px]">
              {product.name}
            </h3>
          </div>
          <div>
            {product.discount_percent === 0 ? (
              <div className="my-[10px] text-[23px] font-bold md:text-[28px]">
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
        <div className="mb-[15px] mt-[10px] flex w-full items-center justify-center gap-[15px]">
          <button
            disabled={!session && true}
            className="cursor-pointer disabled:cursor-default disabled:opacity-50"
            onClick={handleLikeProduct}
            title={!session ? "You Need To Sign In First" : ""}
          >
            <Image
              width={32}
              height={32}
              alt="like icon"
              src={
                isLiked ? "/icons/like-active.svg" : "/icons/like-inactive.svg"
              }
            />
          </button>
          <button
            ref={btnRef}
            onClick={handleBuyProduct}
            disabled={!session && true}
            title={!session ? "You Need To Sign In First" : ""}
            className="relative flex w-[80%] items-center gap-[5px] overflow-hidden rounded-full bg-black px-[25px] py-[2px] text-[14px] capitalize text-white transition-all hover:bg-gray-900 disabled:cursor-default disabled:opacity-50 md:justify-center md:px-[35px] md:py-[5px]"
          >
            <span
              className={`addSpan ${isInCart && "absolute left-[30%] hidden opacity-0"}`}
            >
              Buy Now
            </span>
            <span
              className={`removeSpan ${!isInCart && "absolute left-[20%] hidden opacity-0"}`}
            >
              remove now
            </span>
            <Image
              width={32}
              height={32}
              alt="product image"
              className="md:h-[35px] md:w-[35px]"
              src={"/icons/shopping-cart.svg"}
            />
          </button>
        </div>
      </div>
    </>
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

export function SignOutBtn() {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <button className="nav--links hover:border-black" onClick={handleSignOut}>
      sign out
    </button>
  );
}
