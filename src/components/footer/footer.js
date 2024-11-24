import Image from "next/image";

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
    <div className="">
      <div>
        <Image
          width={100}
          height={30}
          alt="white logo"
          src={"/logo/white-logo.svg"}
        />
        <p>
          We are a residential interior design firm located in Portland. Our
          boutique-studio offers more than.
        </p>
      </div>
      {footerLinks.map((footerLink) => {
        return (
          <div>
            <h4 className="text-green-500">{footerLink.header}</h4>
            {footerLink.links.map((link) => (
              <div>{link}</div>
            ))}
          </div>
        );
      })}
      <div>
        <Image
          width={16}
          height={16}
          src={"/icons/twitter.svg"}
          alt="twitter icon"
        />
        <Image
          width={16}
          height={16}
          src={"/icons/facebook.svg"}
          alt="facebook icon"
        />
        <Image
          width={16}
          height={16}
          src={"/icons/tiktok.svg"}
          alt="tiktok icon"
        />
        <Image
          width={16}
          height={16}
          src={"/icons/instagram.svg"}
          alt="instagram icon"
        />
      </div>
    </div>
  );
}
