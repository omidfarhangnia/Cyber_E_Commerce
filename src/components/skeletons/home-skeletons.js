import Image from "next/image";

export function Sec4Skeleton() {
  return <div>skeleton</div>;
}

const skeletonMap = [0, 1, 2, 3];
export function SecFiveSkeleton() {
  return (
    <div className="flex items-center justify-center bg-[#F9F9F9]">
      <div className="flex max-w-[1300px] items-center justify-center gap-[40px] lg:py-[40px]">
        {skeletonMap.map((skeleton) => {
          return (
            <div
              key={skeleton}
              className={`max-w-[450px] ${skeleton !== 0 && "hidden lg:block"}`}
            >
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
