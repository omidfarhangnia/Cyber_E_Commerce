"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const pageChangerBars = [
  { id: 0, leftClass: "left-[0%]" },
  { id: 1, leftClass: "left-[10%]" },
  { id: 2, leftClass: "left-[20%]" },
  { id: 3, leftClass: "left-[30%]" },
  { id: 4, leftClass: "left-[40%]" },
  { id: 5, leftClass: "left-[50%]" },
  { id: 6, leftClass: "left-[60%]" },
  { id: 7, leftClass: "left-[70%]" },
  { id: 8, leftClass: "left-[80%]" },
  { id: 9, leftClass: "left-[90%]" },
];

export default function PageChanger() {
  const pageChangerRef = useRef();

  useGSAP(
    () => {
      const pageContainer = document.querySelector(".page--container");
      const projectTemplate = document.querySelector(".project--template");

      if (true) return;

      pageContainer.classList.replace("z-[-2]", "z-[2]");
      projectTemplate.classList.add("h-[100vh]");

      const tl = gsap.timeline();
      tl.timeScale(1);
      const q = gsap.utils.selector(pageChangerRef);

      tl.to(q(".even--bars"), {
        opacity: 0,
        stagger: {
          each: 0.1,
          from: "start",
          ease: "none",
        },
      })
        .to(
          q(".odd--bars"),
          {
            opacity: 0,
            stagger: {
              each: 0.1,
              from: "end",
              ease: "none",
            },
          },
          "-=.3",
        )
        .to(pageChangerRef.current, {
          backgroundColor: "#ffffff00",
          duration: 0.5,
          ease: "none",
          onComplete: function () {
            pageContainer.classList.replace("z-[2]", "z-[-2]");
            projectTemplate.classList.remove("h-[100vh]");
          },
        });
    },
    {
      scope: ".page--container",
    },
  );

  return (
    <div
      ref={pageChangerRef}
      className="page--container fixed left-0 top-0 z-[-2] h-[100vh] w-[100vw] bg-[#ffffff30]"
    >
      {pageChangerBars.map((bar) => {
        return (
          <div
            key={bar.id}
            className={`${bar.id % 2 === 0 ? "even--bars" : "odd--bars"} absolute ${bar.leftClass} top-[-50%] h-[200vh] w-[10%] bg-[#211C24]`}
          ></div>
        );
      })}
    </div>
  );
}
