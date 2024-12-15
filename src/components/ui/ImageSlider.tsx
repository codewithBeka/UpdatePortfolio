"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/cs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper"; // Correctly import Swiper type

interface Media {
  url: string;
  type: "image" | "video";
}

interface ImageSliderProps {
  media?: Media[]; // Made media optional
}
interface FullscreenModalProps {
  media: Media[];
  activeIndex: number;
  onClose: () => void;
}
const getYouTubeVideoId = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const ImageSlider = ({ media = [] }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === media.length - 1,
  });

  useEffect(() => {
    if (swiper) {
      const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex);
        setSlideConfig({
          isBeginning: swiper.activeIndex === 0,
          isEnd: swiper.activeIndex === media.length - 1,
        });
      };

      swiper.on("slideChange", handleSlideChange);
      return () => {
        swiper.off("slideChange", handleSlideChange); // Cleanup listener
      };
    }
  }, [swiper, media]);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inactiveStyles = "hidden text-gray-400";

  return (
    <div className="group relative bg-zinc-100 overflow-hidden rounded-xl">
      <div className="absolute  inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">
        {" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyles, "right-3 transition", {
            [inactiveStyles]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
          aria-label="next media"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyles, "left-3 transition", {
            [inactiveStyles]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBeginning,
          })}
          aria-label="previous media"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />
        </button>
      </div>
      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
        onSwiper={setSwiper}
        spaceBetween={50}
        modules={[Pagination]}
        slidesPerView={1}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {media.length > 0 ? (
          media.map((item, i) => (
            <SwiperSlide
              key={i}
              className="relative w-full h-full cursor-pointer"
              onClick={() => {
                setActiveIndex(i);
                setIsModalOpen(true);
                console.log("clicked");
              }}
            >
              {item.type === "image" ? (
                <Image
                  fill
                  loading="eager"
                  className="object-cover object-center w-full h-full"
                  src={item.url}
                  alt={`Media image ${i + 1}`}
                  priority={i === 0}
                />
              ) : item.type === "video" &&
                (item.url.includes("youtube.com") ||
                  item.url.includes("youtu.be")) ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      item.url
                    )}?mute=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-lg"
                  />
                </div>
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-full cursor-pointer"
                />
              )}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="-z-10 relative h-full w-full">
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-center text-red-600 bold text-2xl">
                No media available
              </p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      {isModalOpen && (
        <FullscreenModal
          media={media}
          activeIndex={activeIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ImageSlider;

const FullscreenModal: React.FC<FullscreenModalProps> = ({
  media,
  activeIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === media.length - 1,
  });
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the slider to close the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sliderRef.current &&
        !sliderRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  useEffect(() => {
    if (swiper) {
      const handleSlideChange = (swiper: SwiperType) => {
        setSlideConfig({
          isBeginning: swiper.activeIndex === 0,
          isEnd: swiper.activeIndex === media.length - 1,
        });
      };

      swiper.on("slideChange", handleSlideChange);
      return () => {
        swiper.off("slideChange", handleSlideChange); // Cleanup listener
      };
    }
  }, [swiper, media]);
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };
  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inactiveStyles = "hidden text-gray-400";

  return (
    <div className="fixed top-0  overflow-hidden  inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      {/* <button
        className="absolute top-4 right-4 bg-yellow-400 text-red-600 cursor-pointer z-60"
        onClick={onClose}
        aria-label="Close modal"
      >
        <AiOutlineClose className="h-6 w-6" />
      </button> */}

      <div
        ref={sliderRef}
        className="w-full h-full flex items-center justify-center px-6"
      >
        {" "}
        <div className="absolute  inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">
          {" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              swiper?.slideNext();
              e.stopPropagation(); // Prevent event from bubbling up
            }}
            className={cn(activeStyles, "right-3 transition", {
              [inactiveStyles]: slideConfig.isEnd,
              "hover:bg-primary-300 text-primary-800 opacity-100":
                !slideConfig.isEnd,
            })}
            aria-label="next media"
          >
            <ChevronRight className="h-4 w-4 text-zinc-700" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              swiper?.slidePrev();
              e.stopPropagation(); // Prevent event from bubbling up
            }}
            className={cn(activeStyles, "left-3 transition", {
              [inactiveStyles]: slideConfig.isBeginning,
              "hover:bg-primary-300 text-primary-800 opacity-100":
                !slideConfig.isBeginning,
            })}
            aria-label="previous media"
          >
            <ChevronLeft className="h-4 w-4 text-zinc-700" />
          </button>
        </div>
        <Swiper
          pagination={{
            renderBullet: (_, className) => {
              return `<span class="rounded-full transition ${className}"></span>`;
            },
          }}
          initialSlide={activeIndex}
          onSwiper={setSwiper}
          spaceBetween={50}
          modules={[Pagination]}
          slidesPerView={1}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
        >
          {media.length > 0 ? (
            media.map((item, i) => (
              <SwiperSlide
                key={i}
                className="relative w-full h-full cursor-pointer"
              >
                {item.type === "image" ? (
                  <Image
                    fill
                    loading="eager"
                    className="object-cover object-center w-full h-full"
                    src={item.url}
                    alt={`Media image ${i + 1}`}
                  />
                ) : item.type === "video" &&
                  (item.url.includes("youtube.com") ||
                    item.url.includes("youtu.be")) ? (
                  <div className="relative w-full h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                        item.url
                      )}?mute=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                    />
                  </div>
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-full cursor-pointer"
                  />
                )}
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="-z-10 relative h-full w-full">
              <div className="flex items-center justify-center h-full w-full">
                <p className="text-center text-red-600 bold text-2xl">
                  No media available
                </p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};
