import Link from "next/link";
import Slider from "@/components/Slider/Slider";

import slide1 from "@/assets/images/slide1.jpg";
import slide2 from "@/assets/images/slide2.jpg";
import slide3 from "@/assets/images/slide3.jpg";

const imageList = [slide1.src, slide2.src, slide3.src];

const slides = [
  { title: "Fresh Products Delivered to your Door", subtitle: "Get 20% off your first order" },
  { title: "Premium Quality Guaranteed", subtitle: "Fresh from farm to your table" },
  { title: "Fast & Free Delivery", subtitle: "Same day delivery available in most areas" },
];

function SlideText({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-linear-to-r from-green-600/85 via-green-500/70 to-green-400/60" />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-16 sm:px-20 lg:px-24">
        <h2 className="max-w-md text-3xl leading-tight font-bold text-white">{title}</h2>
        <p className="mt-3 text-base text-white/90">{subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-green-600 transition hover:bg-green-50"
            href="/shop"
          >
            Shop Now
          </Link>
          <Link
            className="rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            href="/categories"
          >
            View Deals
          </Link>
        </div>
      </div>
    </>
  );
}

const slideContent = slides.map((slide) => (
  <SlideText key={slide.title} title={slide.title} subtitle={slide.subtitle} />
));

function HomeSlider() {
  return (
    <section aria-label="Featured offers">
      <Slider
        imageList={imageList}
        slideContent={slideContent}
        effect="fade"
        navigation
        pagination
        priority
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      />
    </section>
  );
}

export default HomeSlider;