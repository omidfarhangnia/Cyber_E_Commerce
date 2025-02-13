import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";

async function getProductData(id) {
  try {
    const product = await sql`
    SELECT * FROM products
    WHERE id = ${id}
    `;
    return product.rows[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function getProductSpec(id) {
  try {
    const specifiction = await sql`
        SELECT * FROM specification
        WHERE product_id = ${id}
        `;
    return specifiction.rows;
  } catch (err) {
    throw new Error(err);
  }
}

async function getProductComments(id) {
  try {
    const specifiction = await sql`
        SELECT * FROM comments
        WHERE product_id = ${id}
        `;
    return specifiction.rows;
  } catch (err) {
    throw new Error(err);
  }
}

export default async function Page({ params }) {
  const product = await getProductData(params.productId);
  const productSpec = await getProductSpec(params.productId);
  const productComments = await getProductComments(params.productId);

  if (product?.name === "") return <div>loading....</div>;

  return (
    <div className="flex items-center justify-center bg-[#ffffff]">
      <div className="flex w-full max-w-[1150px] flex-col justify-between px-[15px] py-[40px]">
        <BreakCrumbs product={product} />
        <Product product={product} productSpec={productSpec} />
        <Reviews product={product} productComments={productComments} />
      </div>
    </div>
  );
}

function ProductStar({ score, id = "" }) {
  const starLength = new Array(5).fill(0);
  return (
    <div className="flex">
      {starLength.map((star, i) => {
        return (
          <svg
            key={i}
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="#FFB547"
            xmlns="http://www.w3.org/2000/svg"
          >
            <linearGradient id={`startGrad${i}${id}`}>
              <stop offset={"0%"} stopColor="#FFB547" />
              <stop
                offset={
                  score - i > 1
                    ? `100%`
                    : score - i > 0
                      ? `${(score - i).toFixed(1) * 100}%`
                      : "0%"
                }
                stopColor="#FFB547"
              />
              <stop
                offset={
                  score - i > 1
                    ? `100%`
                    : score - i > 0
                      ? `${(score - i).toFixed(1) * 100}%`
                      : "0%"
                }
                stopColor="black"
              />
              <stop offset={"100%"} stopColor="black" />
            </linearGradient>
            <path
              fill={`url(#${`startGrad${i}${id}`})`}
              d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z"
            />
          </svg>
        );
      })}
    </div>
  );
}

function BreakCrumbs({ product }) {
  return (
    <div className="mb-[30px] flex max-w-[500px] flex-wrap items-center justify-evenly font-semibold">
      <Link href={"/"}>Home</Link>
      <span>
        <Image
          width={20}
          height={20}
          alt="right arrow"
          src={"/icons/category-right-arrow.svg"}
        />
      </span>
      <Link href={`/category/${product.category}`}>{product.category}</Link>
      <span>
        <Image
          width={20}
          height={20}
          alt="right arrow"
          src={"/icons/category-right-arrow.svg"}
        />
      </span>
      <Link href={`/brand/${product.brand}`}>{product.brand}</Link>
      <span>
        <Image
          width={20}
          height={20}
          alt="right arrow"
          src={"/icons/category-right-arrow.svg"}
        />
      </span>
      <Link href={`/product/${product.id}`}>{product.name}</Link>
    </div>
  );
}

function Product({ product, productSpec }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-[20px]">
      <div className="flex w-full items-center justify-center md:w-[50%]">
        <Image
          width={300}
          height={300}
          alt="product image"
          src={product.img_url}
          className="rounded-[20px]"
        />
      </div>
      <div className="flex w-full flex-col items-center capitalize md:w-[50%]">
        <h1 className="text-center text-[25px] font-bold">{product.name}</h1>
        <div className="mt-[20px] flex w-[85%] items-center justify-between font-semibold text-[#4a4a4a]">
          <div>sales number : {product.sales_num}</div>
          <div>{product.score}/5</div>
        </div>
        <div>
          {product.discount_percent === 0 ? (
            <div className="my-[10px] text-[30px] font-bold md:text-[30px]">
              ${product.price}
            </div>
          ) : (
            <div className="flex items-center gap-[20px]">
              <div className="my-[10px] text-[30px] font-bold md:text-[30px]">
                ${product.price}
              </div>
              <div className="relative my-[10px] font-bold opacity-[.8] md:text-[23]">
                $
                {Math.ceil(
                  product.price +
                    (product.price * product.discount_percent) / 100,
                )}
                <div className="absolute left-[-15%] top-[42%] h-[2px] w-[140%] rotate-[-10deg] bg-red-500"></div>
              </div>
            </div>
          )}
        </div>
        <div className="mb-[30px] w-full">
          {productSpec.length !== 0 ? (
            <table className="overflow-x-auto border-[2px] border-solid border-black">
              <tr className="h-[50px] text-start odd:bg-[#F4F4F4]">
                <th className="border-r-solid w-[40%] border-r-2 border-r-black pl-[15px] text-start">
                  title
                </th>
                <th className="pl-[10px] text-start">description</th>
              </tr>
              {productSpec.map((spec) => {
                return (
                  <tr className="odd:bg-[#F4F4F4]">
                    <td className="border-r-solid w-[40%] border-r-2 border-r-black pl-[10px]">
                      {spec.title}
                    </td>
                    <td className="p-[10px] text-center">{spec.description}</td>
                  </tr>
                );
              })}
            </table>
          ) : (
            <div>
              <div className="flex min-h-[calc(200px_+_3vh)] w-full items-center justify-center rounded-[30px] bg-[#F4F4F4] text-[calc(18px_+_1vw)] font-bold text-[#4E4E4E]">
                there is no specification
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full flex-col items-center gap-[30px]">
          <div className="grid w-full grid-cols-12 items-center gap-[10px] rounded-[20px] bg-[#F4F4F4] px-[20px] py-[25px] font-semibold text-[#4E4E4E]">
            <span className="col-start-1 col-end-8">
              {product.is_shipping_free
                ? "free delivery"
                : "delivery requiring payment"}
            </span>
            <Image
              className="col-start-11 col-end-13"
              width={30}
              height={30}
              alt="delivery icon"
              src={"/icons/delivery-truck.svg"}
            />
          </div>
          <div className="grid w-full grid-cols-12 items-center gap-[10px] rounded-[20px] bg-[#F4F4F4] px-[20px] py-[25px] font-semibold text-[#4E4E4E]">
            <span className="col-start-1 col-end-8">
              {product.is_installment
                ? "Installment payment"
                : "pay in a lump sum"}
            </span>{" "}
            <Image
              className="col-start-11 col-end-13"
              width={25}
              height={25}
              alt="delivery icon"
              src={"/icons/shop.svg"}
            />
          </div>
          <div className="grid w-full grid-cols-12 items-center gap-[10px] rounded-[20px] bg-[#F4F4F4] px-[20px] py-[25px] font-semibold text-[#4E4E4E]">
            <span className="col-start-1 col-end-8">
              {product.warranty_period > 0
                ? `${product.warranty_period} months warranty`
                : "no warranty"}
            </span>
            <Image
              className="col-start-11 col-end-13"
              width={25}
              height={25}
              alt="delivery icon"
              src={"/icons/verify.svg"}
            />
          </div>
        </div>
        <Link
          href={"/"}
          className="white--btn mt-[20px] w-full border-black text-center text-black"
        >
          Add to Wishlist
        </Link>
        <Link
          href={"/"}
          className="black--btn mt-[20px] w-full bg-black text-center text-white"
        >
          Add to Card
        </Link>
      </div>
    </div>
  );
}

function Reviews({ product, productComments }) {
  return (
    <div>
      <h3>Reviews</h3>
      <div>
        <div>
          <div>{product.score}</div>
          <div>of {product.sales_num} reviews</div>
        </div>
        <ProductStar score={product.score} />
      </div>
      <form action={"#"}>
        <textarea />
      </form>
      <div>
        {productComments.length === 0 ? (
          <div>
            <div>there is no comment</div>
            <div>{product.id}</div>
          </div>
        ) : (
          productComments.map((comment, i) => {
            return <ProductComment key={i} comment={comment} />;
          })
        )}
      </div>
    </div>
  );
}

function ProductComment({ comment }) {
  return (
    <div>
      <div className="flex flex-wrap">
        <Image
          width={60}
          height={60}
          alt="author image"
          src={comment.author_img}
        />
        <h6>{comment.author_name}</h6>
        <div>{comment.score}</div>
        <ProductStar score={comment.score} id={comment.id} />
      </div>
      <div>
        <div>{comment.title}</div>
        <p>{comment.description}</p>
      </div>
      {comment.product_img !== null && (
        <div>
          <Image
            width={100}
            height={100}
            alt="product image"
            src={comment.product_img}
          />
        </div>
      )}
    </div>
  );
}
