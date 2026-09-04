import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
};

export default function Section({ children }: SectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {children}
    </section>
  );
}