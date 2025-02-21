"use client";

import Image from "next/image";

export function Sec4Skeleton() {
  return (
    <div className="relative w-full min-h-[60vh]">
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#F6F6F6]">
        <div className="product--window--parts__1 absolute right-0 top-0 h-[50%] w-[50%] bg-[#0e0e0e]"></div>
        <div className="product--window--parts__2 absolute left-0 top-0 h-[50%] w-[50%] bg-[#2A2A2A]"></div>
        <div className="product--window--parts__3 absolute bottom-0 left-0 h-[50%] w-[50%] bg-[#575757]"></div>
        <div className="product--window--parts__4 absolute bottom-0 right-0 h-[50%] w-[50%] bg-[#7b7b7b]"></div>
      </div>
    </div>
  );
}

export function Sec5Skeleton() {
  return (
    <>
      <Sec5LgSkeleton />
      <Sec5SmSkeleton />
    </>
  );
}

const skeletonMap = [0, 1, 2, 3];
function Sec5LgSkeleton() {
  return (
    <div className="hidden items-center justify-center bg-[#F9F9F9] md:flex">
      <div className="flex max-w-[2000px] flex-wrap items-center justify-center">
        {skeletonMap.map((skeleton) => {
          return (
            <div key={skeleton} className="w-[50%] py-[30px] lg:w-[25%]">
              <div className="flex flex-col items-center justify-center px-[20px] py-[30px]">
                <div className="skeleton--animation w-[60%] rounded-[30px] border-[5px] border-solid border-[#C7CDD2]">
                  <Image
                    width={200}
                    height={200}
                    alt="img logo"
                    src={"/images/skeleton-img.svg"}
                    className="skeleton--img"
                  />
                </div>
                <div className="skeleton--animation mt-[30px] h-[30px] w-[80%] rounded-full bg-[#222222]"></div>
                <div className="skeleton--animation mt-[20px] flex h-[50px] w-[70%] flex-wrap justify-between">
                  <div className="h-[10px] w-[50%] rounded-full bg-[#767676]"></div>
                  <div className="h-[10px] w-[30%] rounded-full bg-[#767676]"></div>
                  <div className="h-[10px] w-[90%] rounded-full bg-[#767676]"></div>
                  <div className="h-[10px] w-[20%] rounded-full bg-[#767676]"></div>
                  <div className="h-[10px] w-[70%] rounded-full bg-[#767676]"></div>
                </div>
                <div className="skeleton--animation mt-[20px] h-[50px] w-[50%] max-w-[200px] rounded-full bg-[#C7CDD2]"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Sec5SmSkeleton() {
  return (
    <div className="bg-white py-[30px] lg:w-[25%]">
      <div className="flex flex-col items-center justify-center px-[20px] py-[30px]">
        <div className="skeleton--animation w-[60%] rounded-[30px] border-[5px] border-solid border-[#C7CDD2]">
          <Image
            width={200}
            height={200}
            alt="img logo"
            src={"/images/skeleton-img.svg"}
            className="skeleton--img"
          />
        </div>
        <div className="skeleton--animation mt-[30px] h-[30px] w-[80%] rounded-full bg-[#222222]"></div>
        <div className="skeleton--animation mt-[20px] flex h-[50px] w-[70%] flex-wrap justify-between">
          <div className="h-[10px] w-[50%] rounded-full bg-[#767676]"></div>
          <div className="h-[10px] w-[30%] rounded-full bg-[#767676]"></div>
          <div className="h-[10px] w-[90%] rounded-full bg-[#767676]"></div>
          <div className="h-[10px] w-[20%] rounded-full bg-[#767676]"></div>
          <div className="h-[10px] w-[70%] rounded-full bg-[#767676]"></div>
        </div>
        <div className="skeleton--animation mt-[20px] h-[50px] w-[50%] max-w-[200px] rounded-full bg-[#C7CDD2]"></div>
      </div>
    </div>
  );
}

export function GlobalSkeleton() {
  return (
    <div className="globalSkeleton--anime my-[40px] h-[400px] w-full rounded-[50px]"></div>
  );
}
