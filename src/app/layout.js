import localFont from "next/font/local";
import "./globals.css";
// import fff from "../../public/fonts/Montserrat-Black.ttf";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const montserrat = localFont({
  src: [
    {
      path: "../../public/fonts/Montserrat-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Thin.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>{children}</body>
    </html>
  );
}
