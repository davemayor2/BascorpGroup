import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashGrotesk = localFont({
  src: "../../public/fonts/ClashGrotesk-Variable.ttf",
  variable: "--font-clash-grotesk",
  weight: "100 900",
});

const instrumentSans = localFont({
  src: "../../public/fonts/InstrumentSans-Variable.ttf",
  variable: "--font-instrument-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bascorp Group | Building Partnerships That Create Lasting Value",
  description: "Bascorp Group is a leading investment company with a track record of success and strategic partnerships across the Arabian Gulf, Middle East and Asia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${clashGrotesk.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
