import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Approach | Bascorp Group",
  description:
    "A disciplined investment approach providing tailored solutions for sustainable growth across various sectors.",
};

export default function InvestmentApproachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
