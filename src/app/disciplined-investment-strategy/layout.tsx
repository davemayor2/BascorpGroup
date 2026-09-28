import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disciplined Investment Strategy | Bascorp Group",
  description:
    "Bascorp applies a disciplined investment framework to identify opportunities with strong fundamentals, realistic growth plans, and clearly defined paths to value creation.",
};

export default function DisciplinedInvestmentStrategyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
