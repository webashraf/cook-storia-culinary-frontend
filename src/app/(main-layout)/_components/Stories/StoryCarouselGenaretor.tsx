/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
"use client";

import { User } from "@nextui-org/user";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import Image, { ImageProps } from "next/image";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { GiTireIronCross } from "react-icons/gi";
import Stories from "stories-react";

import { cn } from "@/src/lib/utils";

import { useOutsideClick } from "./AnimatedModal";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card =
  | {
      src: string;
      images: any[];
      title: string;
      category: string;
      content: React.ReactNode;
    }
  | any;

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }

    // Auto-scroll functionality
    const interval = setInterval(() => {
      scrollRight();
    }, 3000000); // 5 minutes in milliseconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        className="flex w-full overflow-x-scroll overscroll-x-auto  scroll-smooth [scrollbar-width:none]"
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto"
          )}
        >
          {items.map((item, index) => (
            <motion.div
              key={"card" + index}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                  once: true,
                },
              }}
              className="last:pr-[5%] md:last:pr-[33%] rounded-3xl relative"
              initial={{
                opacity: 0,
                y: 20,
              }}
            >
              <div className="flex items-center gap-2 absolute top-1 left-1 z-20 pointer-events-none">
                <Image
                  alt={`${item?.props.card.user?.username} profile picture`}
                  className="rounded-full size-8 object-cover"
                  height={50}
                  src={item?.props?.card?.user?.profilePicture}
                  width={50}
                />
                {/* <div>
                  <h4 className="flex gap-1 text-[14px]">
                    {item?.props.card.user?.username.slice(0, 6)}...
                    <span>
                      {item?.props.card.user?.isPremium ? (
                        <p className="text-warning-500">(Pro)</p>
                      ) : (
                        ""
                      )}
                    </span>
                  </h4>
                  <span className="text-[#acacac] text-[12px]">
                    {moment(item?.props?.card?.createdAt).format(
                      "MMM YYYY h:mm a"
                    )}
                  </span>
                </div> */}
              </div>
              {item}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="justify-end gap-2 mr-10 absolute lg:right-0 right-0 bottom-0 hidden lg:flex">
        <button
          className="relative z-10 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-0 transition-transform duration-300 hover:scale-110"
          disabled={!canScrollLeft}
          onClick={scrollLeft}
        >
          <BsChevronLeft className="text-gray-500" />
        </button>
        <button
          className="relative z-10 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-0 transition-transform duration-300 hover:scale-110"
          disabled={!canScrollRight}
          onClick={scrollRight}
        >
          <BsChevronRight className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              animate={{ opacity: 1 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            />
            <motion.div
              ref={containerRef}
              animate={{ opacity: 1 }}
              className="max-w-xl mx-auto bg-white dark:bg-neutral-900 h-fit  z-[60] my-10 p-4 md:p-5 rounded-3xl font-sans relative"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              layoutId={layout ? `card-${card.title}` : undefined}
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <GiTireIronCross className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <div>
                <User
                  avatarProps={{
                    src: card?.user?.profilePicture,
                  }}
                  description={
                    <span className="text-[#acacac]">
                      {moment(card?.createdAt).format("MMM YYYY h:mm a")}
                    </span>
                  }
                  name={
                    <h4 className="flex gap-1">
                      {card.user?.username}
                      <span>
                        {card.user?.isPremium ? (
                          <p className="text-warning-500">(Pro)</p>
                        ) : (
                          ""
                        )}
                      </span>
                    </h4>
                  }
                />
              </div>
              <div className="py-5">
                <Stories
                  height="600px"
                  pauseStoryWhenInActiveWindow={true}
                  stories={card.images}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-64 w-36 md:h-[12rem] md:w- overflow-hidden flex flex-col items-start justify-start relative z-10"
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            className="text-white text-sm md:text-base font-medium font-sans text-left"
            layoutId={layout ? `category-${card.category}` : undefined}
          >
            {card.category}
          </motion.p>
          <motion.p
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
            layoutId={layout ? `title-${card.title}` : undefined}
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          fill
          alt={card.title}
          className="object-cover absolute z-10 inset-0 h-[200px]"
          src={card.src}
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps | any) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt ? alt : "Background of a beautiful view"}
      blurDataURL={typeof src === "string" ? src : undefined}
      className={cn(
        "transition duration-300 h-[200px]",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      decoding="async"
      height={height}
      loading="lazy"
      src={src}
      width={width}
      onLoad={() => setLoading(false)}
      {...rest}
    />
  );
};
