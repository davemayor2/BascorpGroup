import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Investments | Bascorp Group",
  description:
    "Diversified Investments, Multiple Paths to Growth. Explore Bascorp Group's key investment sectors across healthcare, trade, private equity, Aviation, telecommunications, and Real Estate.",
};

export default function OurInvestmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
