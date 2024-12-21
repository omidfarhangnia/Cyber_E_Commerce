import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";

async function getSec5Data() {
  try {
    const data = await sql`
          SELECT * FROM popularproducts
      `;

    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
}

export default async function HomeSectionFive() {
  const data = await getSec5Data();

  return (
    <div className="">
      <div className="bg-[#FFFFFF]">
        <div className="relative">
          <Image
            width={300}
            height={300}
            alt="popular image"
            className="object-contain"
            src={"/images/popularProducts2.png"}
          />
          <Image
            className="absolute right-[10%] top-0 w-[70%] max-w-[300px] object-contain"
            width={300}
            height={300}
            alt="popular image"
            src={"/images/popularProducts1.png"}
          />
        </div>
        <div className="flex flex-col items-center px-[32px] py-[48px] lg:py-[54px]">
          <h3 className="text-center text-[35px] lg:text-start">
            Popular Products
          </h3>
          <p className="my-[15px] text-center text-[14px] font-medium text-[#909090] lg:text-start">
            iPad combines a magnificent 10.2-inch Retina display, incredible
            performance, multitasking and ease of use.
          </p>
          <Link href={"/"}>
            <button className="black--btn relative lg:my-0">Shop Now</button>
          </Link>
        </div>
      </div>
      {data.map((product) => {
        const bgColor = ["bg-[", product.theme_color, "]", " py-[20px] "].join(
          "",
        );
        return (
          <div className={bgColor}>
            <div className="relative flex items-center justify-center">
              <Image
                width={300}
                height={300}
                alt="popular image"
                className="rounded-[40px] bg-[#b5b5b5] object-contain"
                src={
                  product.imgurl === "https://example.com/test.jpg" &&
                  "/images/skeleton-img.svg"
                }
              />
            </div>
            <div className="flex flex-col items-center px-[32px] py-[48px] lg:py-[54px]">
              <h3
                className={`text-center ${product.theme_color === "#2C2C2C" && "text-white"} text-[35px] lg:text-start`}
              >
                Popular Products
              </h3>
              <p className="my-[15px] text-center text-[14px] font-medium text-[#909090] lg:text-start">
                iPad combines a magnificent 10.2-inch Retina display, incredible
                performance, multitasking and ease of use.
              </p>
              <Link href={"/"}>
                <button className="black--btn relative lg:my-0">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
