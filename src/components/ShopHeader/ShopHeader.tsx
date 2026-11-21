import { Package, Tags } from "lucide-react";
import type { ShopFilters } from "@/app/shop/shop.interface";
import PageHero from "@/components/PageHero/PageHero";

export default function ShopHeader({
  filters,
  categoryName,
  brandName,
}: {
  filters: ShopFilters;
  categoryName?: string;
  brandName?: string;
}) {
  const searching = filters.q !== "";
  const byBrand = brandName !== undefined && categoryName === undefined;
  const title = categoryName ?? brandName ?? (searching ? "Search Results" : "All Products");

  let breadcrumb = [{ label: "Home", href: "/" }, { label: title }];
  if (categoryName) {
    breadcrumb = [{ label: "Home", href: "/" }, { label: "Categories", href: "/categories" }, { label: categoryName }];
  } else if (brandName) {
    breadcrumb = [{ label: "Home", href: "/" }, { label: "Brands", href: "/brands" }, { label: brandName }];
  }

  const subtitle = byBrand
    ? `Shop all ${brandName} products`
    : searching
      ? `Showing results for "${filters.q}"`
      : "Explore our complete product collection";

  return <PageHero breadcrumb={breadcrumb} icon={byBrand ? Tags : Package} subtitle={subtitle} title={title} />;
}