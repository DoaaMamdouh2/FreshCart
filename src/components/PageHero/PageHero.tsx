import { Fragment } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  breadcrumb: Crumb[];
  title: string;
  subtitle: string;
  icon: LucideIcon;
  variant?: "green" | "purple";
  compact?: boolean;
};

const gradients = {
  green: "from-green-500 via-green-500 to-green-400",
  purple: "from-violet-600 via-violet-500 to-purple-400",
};

export default function PageHero({
  breadcrumb,
  title,
  subtitle,
  icon: Icon,
  variant = "green",
  compact = false,
}: PageHeroProps) {
  return (
    <header className={`bg-linear-to-r text-white ${gradients[variant]}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${compact ? "py-8" : "py-10"}`}>
        <nav
          aria-label="Breadcrumb"
          className={`flex flex-wrap items-center gap-2 text-sm text-white/85 ${compact ? "mb-5" : "mb-8"}`}
        >
          {breadcrumb.map((crumb, index) => {
            const isLast = index === breadcrumb.length - 1;

            return (
              <Fragment key={crumb.label}>
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {crumb.href && !isLast ? (
                  <Link className="transition hover:text-white" href={crumb.href}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? "font-semibold text-white" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </Fragment>
            );
          })}
        </nav>

        <div className={`flex items-center ${compact ? "gap-4" : "gap-5"}`}>
          <span
            className={`grid shrink-0 place-items-center bg-white/20 shadow-lg shadow-black/10 backdrop-blur-sm ${compact ? "size-14 rounded-xl" : "size-20 rounded-2xl"}`}
          >
            <Icon aria-hidden="true" className={compact ? "size-7" : "size-9"} />
          </span>
          <div>
            <h1
              className={`font-extrabold tracking-tight ${compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}
            >
              {title}
            </h1>
            <p className={`mt-1 text-white/90 ${compact ? "text-base" : "text-lg"}`}>{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}