"use client";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Stories from "stories-react";

import nexiosInstance from "@/src/config/nexios.instance";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./AnimatedModal";
import { IStoryReels } from "./ReelStories";

export function AnimatedModalDemo() {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
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

  return (
    <div className="py-40 flex items-center justify-center">
      {result.map((item) => (
        <Modal key={item._id}>
          <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
              Book your flight
            </span>
            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
              ✈️
            </div>
          </ModalTrigger>
          <ModalBody>
            <ModalContent>
              <Stories
                // key={story?._id}
                height="600px"
                pauseStoryWhenInActiveWindow={true}
                stories={item.images}
                // width="400px"
              />
            </ModalContent>
            <ModalFooter className="gap-4">
              <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                Cancel
              </button>
              <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                Book Now
              </button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      ))}
    </div>
  );
}
