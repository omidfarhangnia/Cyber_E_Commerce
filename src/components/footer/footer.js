import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    header: "Services",
    links: [
      "bonus program",
      "gift cards",
      "credit and payment",
      "service contracts",
      "non-cash account",
      "payment",
    ],
  },
  {
    header: "Assitance to the buyer",
    links: [
      "find an order",
      "terms of delivery",
      "exchange and return of goods",
      "guarantee",
      "frequently asked questions",
      "terms of use of the site",
    ],
  },
];

export default function Footer() {
  return (
    <div className="flex items-center justify-center bg-[#181313] px-[32px] py-[48px] md:bg-black lg:px-[50px] lg:py-[108px]">
      <div className="flex w-full max-w-[1150px] flex-wrap items-center gap-[32px] md:gap-0 lg:justify-between">
        <div className="flex w-full flex-col items-center md:w-[40%] md:items-start md:self-start">
          <Image
            width={100}
            height={30}
            className="h-auto w-auto"
            alt="white logo"
            src={"/logo/white-logo.svg"}
          />
          <p className="mt-[16px] text-center text-[13px] font-semibold leading-[24px] text-[#CFCFCF] md:text-start">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than.
          </p>
        </div>
        {footerLinks.map((footerLink, i) => {
          return (
            <div
              key={i}
              className="flex w-full flex-col items-center md:w-[30%] md:items-start lg:w-[20%]"
            >
              <h4 className="mb-[15px] select-none font-semibold text-white">
                {footerLink.header}
              </h4>
              <div className="flex flex-col items-center gap-[20px] md:items-start">
                {footerLink.links.map((link, i) => (
                  <Link
                    key={i}
                    href={"/"}
                    className="nav--links text-[14px] capitalize text-[#CFCFCF] hover:border-[#CFCFCF] md:text-start"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        <div className="mt-[20px] flex w-full justify-center gap-[20px] md:justify-start">
          <Link href={"/"}>
            <Image
              width={27}
              height={27}
              src={"/icons/twitter.svg"}
              alt="twitter icon"
            />
          </Link>
          <Link href={"/"}>
            <Image
              width={27}
              height={27}
              className="h-auto"
              src={"/icons/facebook.svg"}
              alt="facebook icon"
            />
          </Link>
          <Link href={"/"}>
            <Image
              width={27}
              height={27}
              className="h-auto"
              src={"/icons/tiktok.svg"}
              alt="tiktok icon"
            />
          </Link>
          <Link href={"/"}>
            <Image
              width={27}
              height={27}
              src={"/icons/instagram.svg"}
              alt="instagram icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
