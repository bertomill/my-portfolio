import localFont from "next/font/local";

export const calsans = localFont({
  src: [
    {
      path: "./CalSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-calsans",
  display: "swap",
});