import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Governance | Bascorp Group",
  description:
    "A disciplined corporate governance framework establishing accountability, sound internal controls, and responsible oversight.",
};

export default function CorporateGovernanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
