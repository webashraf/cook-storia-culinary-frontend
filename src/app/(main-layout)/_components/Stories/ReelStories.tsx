"use client";

import nexiosInstance from "@/src/config/nexios.instance";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Stories from "stories-react";
import "stories-react/dist/index.css";

// Import Swiper React components and styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import AddStory from "./AddStory";
export interface IStoryReels {
  user: "string";
  images: Array<string>;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDelete: boolean;
}

export default function ReelStories() {
  const [storiesData, setStoriesData] = useState<IStoryReels[] | []>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef: any = useRef(null);

  useEffect(() => {
    const fetchStoriesData = async () => {
      try {
        const { data }: any = await nexiosInstance.get("/story");

        if (data.success === true) {
          setStoriesData(data.data);
        }
        console.log(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to get stories");
      }
    };

    fetchStoriesData();
  }, []);

  const stories = [
    {
      type: "image",
      duration: 6000,
      url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
    },
    {
      type: "image",
      duration: 6000,
      url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
    },
    {
      type: "image",
      duration: 6000,
      url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
    },
  ];

  const arr = new Array(10).fill(0);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const randomStrings = ["apple", "sunshine", "mountain", "ocean"];

  const objectsArray = randomStrings.map((url) => ({
    type: "image",
    duration: 6000,
    url: url,
    user: "me",
  }));

  const result = storiesData?.map((item) => {
    return item.images.map((url) => {
      return {
        url: url,
        type: "image",
        duration: 6000,
        user: "me",
      };
    });
  });

  console.log(result);

  return (
    <div>
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
          watchSlidesProgress
          className="mySwiper"
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={10}
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
            <AddStory />
          </SwiperSlide>

          {result.map((story, i) => (
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
                  alt={`story-${i + 1}`}
                  className="rounded-sm"
                  height={350}
                  src="https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300"
                  width={280}
                />
              </Button>

              <Modal
                backdrop="blur"
                isOpen={isOpen}
                placement="top-center"
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
                      <Stories
                        key={i}
                        height="600px"
                        stories={story}
                        width="400px"
                      />
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
