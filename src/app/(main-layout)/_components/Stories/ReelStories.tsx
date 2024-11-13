"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useRef, useState } from "react";
import Stories from "stories-react";
import "stories-react/dist/index.css";

// Import Swiper React components and styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ReelStories() {
  const stories = [
    {
      type: "image",
      duration: 6000,
      url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
    },
    // Add other story objects here...
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef: any = useRef(null); // Ref to manage Swiper instance
  const arr = new Array(10).fill(0);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="relative flex flex-nowrap gap-10">
      {!isBeginning && (
        <button
          className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          &#10094;
        </button>
      )}
      {!isEnd && (
        <button
          className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
          onClick={handleNext}
        >
          &#10095;
        </button>
      )}

      <Swiper
        className="mySwiper"
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress={true}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Set swiper instance
      >
        <SwiperSlide
          className="mx-auto rounded-lg overflow-hidden"
          style={{ maxWidth: "350px", minHeight: "300px" }}
        >
          <div className="md:flex h-full">
            <div className="w-full h-full">
              <div className="relative h-full max-w-[250px] rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <div className="absolute flex flex-col items-center">
                  <Image
                    alt="File Icon"
                    className="mb-3"
                    src="https://img.icons8.com/dusk/64/000000/file.png"
                  />
                  <span className="block text-gray-500 font-semibold">
                    Drag &amp; drop your files here
                  </span>
                  <span className="block text-gray-400 font-normal mt-1">
                    or click to upload
                  </span>
                </div>
                <input
                  className="h-full w-full opacity-0 cursor-pointer"
                  type="file"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {arr.map((_, i) => (
          <SwiperSlide
            key={i}
            className="flex flex-col overflow-hidden gap-2 p-0"
            style={{ maxWidth: "350px", minHeight: "300px" }}
          >
            <Button
              className="max-w-fit min-h-[350px] h-full p-0 rounded-sm"
              onPress={onOpen}
            >
              <Image
                alt="story-1"
                className="rounded-sm"
                height={350}
                src="https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300"
                width={280}
              />
            </Button>

            <Modal
              backdrop="blur"
              isOpen={isOpen}
              placement={"top-center"}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      marginBottom: "16px",
                    }}
                  >
                    <Stories height="600px" stories={stories} width="400px" />
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
