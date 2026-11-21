import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type SectionCardProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
};

export default function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>
      <header className="bg-linear-to-r from-green-700 to-green-500 px-6 py-5 text-white">
        <h2 className="flex items-center gap-3 text-lg font-bold">
          <Icon aria-hidden="true" className="size-5" />
          {title}
        </h2>
        <p className="mt-1 pl-8 text-sm text-white/85">{subtitle}</p>
      </header>
      {children}
    </section>
  );
}