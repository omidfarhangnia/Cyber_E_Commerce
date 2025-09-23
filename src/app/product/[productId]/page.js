import {
  Product,
  ProductCommentContainer,
  ProductForm,
  ProductQuestionContainer,
} from "@/components/global-components";
import { GlobalSkeleton } from "@/components/skeletons/home-skeletons";
import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function fetchProductData(id) {
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

async function fetchProductSpec(id) {
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

async function fetchProductComments(id) {
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

async function fetchRelatedProducts(product) {
  try {
    const relatedProducts = await sql`
        SELECT * FROM products
        WHERE category = ${product.category} AND id != ${product.id}
        LIMIT 4
        `;
    return relatedProducts.rows;
  } catch (err) {
    throw new Error(err);
  }
}

async function fetchQuestions(id) {
  try {
    const questions = await sql`
        SELECT * FROM questions
        WHERE product_id = ${id}
        `;
    return questions.rows;
  } catch (err) {
    throw new Error(err);
  }
}

export default async function Page({ params }) {
  const { productId } = await params;
  const product = await fetchProductData(productId);

  if (product?.name === "") return <div>loading....</div>;

  return (
    <div className="flex items-center justify-center bg-[#ffffff]">
      <div className="flex w-full max-w-[1200px] flex-col justify-between px-[15px] py-[40px]">
        <BreakCrumbs product={product} />
        <Suspense fallback={<GlobalSkeleton />}>
          <ProductData product={product} />
        </Suspense>
        <Suspense fallback={<GlobalSkeleton />}>
          <Reviews product={product} />
        </Suspense>
        <Suspense fallback={<GlobalSkeleton />}>
          <Questions id={product.id} />
        </Suspense>
        <Suspense fallback={<GlobalSkeleton />}>
          <RelatedProducts product={product} />
        </Suspense>
      </div>
    </div>
  );
}

function ProductStar({ score, id = "", size = 40 }) {
  const starLength = new Array(5).fill(0);
  return (
    <div className="flex">
      {starLength.map((star, i) => {
        return (
          <svg
            key={i}
            width={size}
            height={size}
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

async function ProductData({ product }) {
  const productSpec = await fetchProductSpec(product.id);

  return (
    <div className="flex flex-wrap items-center justify-center gap-[20px] md:items-stretch md:gap-[calc(40px_+_2vw)] md:py-[40px]">
      <div className="flex w-full max-w-[330px] items-center justify-center md:w-[45%] md:max-w-[400px] md:items-start">
        <Image
          width={300}
          height={300}
          alt="product image"
          src={product.img_url}
          priority
          className="w-full rounded-[20px] md:object-contain"
        />
      </div>
      <div className="flex w-full flex-col items-center capitalize md:w-[50%] md:max-w-[500px]">
        <h1 className="text-center text-[25px] font-bold md:text-[35px]">
          {product.name}
        </h1>
        <div className="mt-[20px] flex w-[85%] items-center justify-between font-semibold text-[#4a4a4a] md:w-[60%]">
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
              <thead>
                <tr className="h-[50px] text-start odd:bg-[#F4F4F4]">
                  <th className="border-r-solid w-[40%] border-r-2 border-r-black pl-[15px] text-start">
                    title
                  </th>
                  <th className="pl-[10px] text-start">description</th>
                </tr>
              </thead>
              <tbody>
                {productSpec.map((spec, i) => {
                  return (
                    <tr key={i} className="odd:bg-[#F4F4F4]">
                      <td className="border-r-solid w-[40%] border-r-2 border-r-black pl-[10px]">
                        {spec.title}
                      </td>
                      <td className="p-[10px] text-center">
                        {spec.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
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
      </div>
    </div>
  );
}

async function Reviews({ product }) {
  const productComments = await fetchProductComments(product.id);

  return (
    <div className="mb-[100px] mt-[120px] flex flex-col items-center">
      <div className="md:flex md:w-[60%] md:flex-wrap md:items-center md:justify-between">
        <h3 className="my-[10px] text-center text-[24px] font-medium md:text-[45px]">
          Reviews
        </h3>
        <div className="flex flex-col items-center justify-between">
          <div className="mb-[10px] flex items-baseline justify-center gap-[5px]">
            <div className="text-[56px]">{product.score}</div>
            <div className="text-[#303030]">
              {" "}
              of {product.sales_num} reviews
            </div>
          </div>
          <ProductStar score={product.score} size={35} />
        </div>
      </div>
      <ProductForm id={product.id} />
      <div className="flex w-full items-center justify-center">
        {productComments.length === 0 ? (
          <div className="flex min-h-[calc(200px_+_3vh)] w-full items-center justify-center rounded-[30px] bg-[#F4F4F4] text-[calc(18px_+_1vw)] font-bold text-[#4E4E4E] md:mt-[60px] md:w-[70%]">
            there is no comment
          </div>
        ) : (
          <ProductCommentContainer comments={productComments} />
        )}
      </div>
    </div>
  );
}

export function ProductComment({ comment }) {
  return (
    <div className="my-[30px] flex w-full max-w-[500px] flex-col gap-[20px] rounded-[15px] bg-[#f4f4f4] p-[20px] lg:min-h-[450px]">
      <div className="flex flex-wrap items-center gap-[20px]">
        <Image
          width={60}
          height={60}
          alt="author image"
          src={comment.author_img}
          className="box-content rounded-full border-[3px] border-solid border-black"
        />
        <div>
          <h6 className="text-[18px] font-medium">{comment.author_name}</h6>
          <ProductStar score={comment.score} size={20} id={comment.id} />
        </div>
      </div>
      <div>
        <div className="mb-[10px] text-[20px] font-semibold">
          {comment.title}
        </div>
        <p className="text-justify text-[14px] text-[#212121]">
          {comment.description}
        </p>
      </div>
      {comment.product_img !== null && (
        <div className="w-full">
          <Image
            width={250}
            height={250}
            className="mx-auto"
            alt="product image"
            src={comment.product_img}
          />
        </div>
      )}
    </div>
  );
}

async function RelatedProducts({ product }) {
  const relatedProducts = await fetchRelatedProducts(product);

  return (
    <div className="w-full">
      <h3 className="my-[10px] mb-[30px] text-center text-[24px] font-medium">
        related products
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-x-[10px] gap-y-[15px] [&>div]:lg:w-[24%]">
        {relatedProducts.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}

async function Questions({ id }) {
  const questions = await fetchQuestions(id);

  return (
    <div className="mb-[60px]">
      <h3 className="my-[10px] text-center text-[24px] font-medium md:text-[45px]">
        Questions
      </h3>

      <div className="flex w-full flex-wrap items-center justify-center gap-[50px]">
        {questions.length === 0 ? (
          <div className="flex min-h-[calc(200px_+_3vh)] w-full items-center justify-center rounded-[30px] bg-[#F4F4F4] text-[calc(18px_+_1vw)] font-bold text-[#4E4E4E]">
            there is no question
          </div>
        ) : (
          <ProductQuestionContainer questions={questions} />
        )}
      </div>
    </div>
  );
}

export function ProductQuestion({ question }) {
  return (
    <div className="my-[30px] flex flex-col gap-[20px] rounded-[15px] bg-[#f4f4f4] p-[20px] md:max-w-[500px]">
      <div className="flex flex-col">
        <div className="text-[18px] font-medium">{question.title}</div>
        <div className="self-end text-[14px] text-[#212121]">
          {question.date}
        </div>
      </div>
      <p className="text-justify">{question.answer}</p>
    </div>
  );
}
