"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import StorySkeleton from "@/src/components/Shared/Loader/StorySkeleton";
import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";
import { IStoryReels } from "@/src/types";

import AddStory from "./AddStory";
import { Card, Carousel } from "./StoryCarouselGenaretor";

export function StoryCarousel() {
  const [storiesData, setStoriesData] = useState<IStoryReels[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [refacing, setRefacing] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setRefacing(false);
    const fetchStoriesData = async () => {
      setLoading(true);
      try {
        const { data }: any = await nexiosInstance.get("/story");

        if (data?.success) {
          setStoriesData(data.data);
          setLoading(false);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to get stories");
      }
    };

    fetchStoriesData();
  }, [refacing]);

  const storyData = storiesData.map((item) => ({
    ...item,
    src: item.images[0],
    images: item.images.map((url) => ({
      url: url,
      type: "image",
      duration: 6000,
    })),
  }));

  if (loading) {
    return (
      <div className="">
        <StorySkeleton />
      </div>
    );
  }

  const cards = storyData.map((card, index) => (
    <Card key={card?._id + index} card={card} index={index} />
  ));

  return (
    <div className="w-full overflow-hidden h-auto pb-5 flex flex-row relative">
      <div className="absolute z-20 bottom-5 left-5">
        <AddStory setRefacing={setRefacing} />
      </div>

      <div className="w-full">
        <Carousel items={cards} />
      </div>
    </div>
  );
}
