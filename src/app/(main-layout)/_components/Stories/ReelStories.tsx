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

import { User } from "@nextui-org/user";
import moment from "moment";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { IUserPopulates } from "@/src/types";

import AddStory from "./AddStory";

export interface IStoryReels {
  _id: string;
  user: IUserPopulates;
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
  const [loading, setLoading] = useState(true);
  const swiperRef: any = useRef(null);

  useEffect(() => {
    const fetchStoriesData = async () => {
      setLoading(true);
      try {
        const { data }: any = await nexiosInstance.get("/story");

        if (data.success === true) {
          setStoriesData(data.data);
        }
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message || "Failed to get stories");
        setLoading(false);
      }
    };

    fetchStoriesData();
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const result = storiesData.map((item) => ({
    ...item,
    images: item.images.map((url) => ({
      url: url,
      type: "image",
      duration: 6000,
    })),
  }));

  console.log(result);

  return (
    <div>
      {loading ? (
        <div className="text-center p-5">
          <p>Loading...</p>
        </div>
      ) : (
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
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            <SwiperSlide
              className="mx-auto rounded-lg overflow-hidden"
              style={{ maxWidth: "350px", minHeight: "300px" }}
            >
              <AddStory />
            </SwiperSlide>

            {result.map((story) => (
              <SwiperSlide
                key={story?._id}
                className="flex flex-col overflow-hidden gap-2 p-0"
                style={{ maxWidth: "350px", minHeight: "300px" }}
              >
                <Button
                  className="max-w-fit min-h-[350px] h-full p-0 rounded-sm "
                  onPress={onOpen}
                >
                  <div className="relative">
                    <div className="bg-black/50 backdrop-blur-sm absolute rounded-md top-2 left-0 z-50  w-full flex p-2">
                      <User
                        avatarProps={{
                          src: story?.user?.profilePicture,
                        }}
                        className=""
                        description={
                          <span className="text-[#acacac]">
                            {moment(story?.createdAt).format("MMM YYYY h:mm a")}
                          </span>
                        }
                        name={
                          <h4 className="flex gap-1">
                            {story?.user?.username.slice(0, 8)}...
                            <span>
                              {story?.user?.isPremium ? (
                                <p className="text-warning-500">(Pro)</p>
                              ) : (
                                ""
                              )}
                            </span>
                          </h4>
                        }
                      />
                    </div>
                    <Image
                      alt={`story-${story?._id + 1}`}
                      className="rounded-sm object-cover"
                      height={350}
                      src={story?.images[0].url}
                      width={280}
                    />
                  </div>
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
                          height="600px"
                          pauseStoryWhenInActiveWindow={true}
                          stories={story.images}
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
      )}
    </div>
  );
}
