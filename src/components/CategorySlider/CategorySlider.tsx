import Link from "next/link";
import { getAllCategories } from "@/app/categories/category.services";
import Slider from "../Slider/Slider";

async function CategorySlider() {
  const categoriesList = await getAllCategories();
  const imageList = categoriesList.map((e) => e.image);
  const altList = categoriesList.map((e) => e.name);

  const slideContent = categoriesList.map((category) => (
    <Link
      aria-label={`Browse ${category.name}`}
      className="absolute inset-0 z-1 flex items-end justify-center bg-linear-to-t from-black/55 via-transparent to-transparent pb-3"
      href={`/shop?category=${category._id}`}
      key={category._id}
    >
      <span className="text-sm font-semibold text-white">{category.name}</span>
    </Link>
  ));

  return (
    <Slider
      imageList={imageList}
      altList={altList}
      slideContent={slideContent}
      slidesPerView={6}
      spaceBetween={20}
      breakpoints={{
        0: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
      effect="slide"
      navigation
      className="h-40"
    />
  );
}

export default CategorySlider;