"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import type { AutoplayOptions, SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type SliderProps = {
  imageList: string[];
  altList?: string[];
  slideContent?: ReactNode[];
  spaceBetween?: number;
  slidesPerView?: number;
  breakpoints?: SwiperOptions["breakpoints"];
  effect?: "slide" | "fade";
  navigation?: boolean;
  pagination?: boolean;
  autoplay?: boolean | AutoplayOptions;
  priority?: boolean;
  className?: string;
};

const paginationStyle =
  "[--swiper-pagination-bottom:16px] [--swiper-pagination-bullet-border-radius:9999px] [--swiper-pagination-bullet-inactive-color:#ffffff] [--swiper-pagination-bullet-inactive-opacity:0.6] [--swiper-pagination-bullet-size:12px] [--swiper-pagination-color:#ffffff] [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-8!";

function ArrowButton({ direction }: { direction: "prev" | "next" }) {
  const swiper = useSwiper();
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  return (
    <button
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      className={`absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-green-600 shadow-md transition hover:bg-white sm:size-12 ${isPrev ? "left-3 sm:left-4" : "right-3 sm:right-4"}`}
      onClick={() => (isPrev ? swiper.slidePrev() : swiper.slideNext())}
      type="button"
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}

export default function Slider({
  imageList,
  altList = [],
  slideContent = [],
  spaceBetween = 0,
  slidesPerView = 1,
  breakpoints,
  effect = "fade",
  navigation = true,
  pagination = false,
  autoplay = false,
  priority = false,
  className = "h-75 sm:h-100",
}: SliderProps) {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination, A11y]}
      effect={effect}
      fadeEffect={{ crossFade: true }}
      speed={800}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      breakpoints={breakpoints}
      loop={imageList.length > slidesPerView}
      autoplay={autoplay}
      pagination={pagination ? { clickable: true } : false}
      className={`${className} ${paginationStyle}`}
    >
      {imageList.map((src, index) => (
        <SwiperSlide className="relative" key={`${src}-${index}`}>
          <Image
            alt={altList[index] ?? ""}
            className="object-cover"
            fill
            priority={priority && index === 0}
            sizes={`${Math.round(100 / slidesPerView)}vw`}
            src={src}
            unoptimized={src.startsWith("http")}
          />
          {slideContent[index]}
        </SwiperSlide>
      ))}

      {navigation && <ArrowButton direction="prev" />}
      {navigation && <ArrowButton direction="next" />}
    </Swiper>
  );
}