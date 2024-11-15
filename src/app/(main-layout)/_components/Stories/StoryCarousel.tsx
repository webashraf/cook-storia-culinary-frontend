"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { IStoryReels } from "@/src/types";

import AddStory from "./AddStory";
import { Card, Carousel } from "./StoryCarouselGenaretor";

export function StoryCarousel() {
  const [storiesData, setStoriesData] = useState<IStoryReels[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoriesData = async () => {
      setLoading(true);
      try {
        const { data }: any = await nexiosInstance.get("/story");

        if (data.success === true) {
          setStoriesData(data.data);
          setLoading(false);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to get stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStoriesData();
  }, []);

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
      <div className="flex justify-center items-center h-96">
        <div className="loader" />
      </div>
    );
  }

  const cards = storyData.map((card, index) => (
    <Card key={card?._id} card={card} index={index} />
  ));

  return (
    <div className="w-full h-auto pb-5 flex flex-row">
      <div className="">
        <AddStory />
      </div>
      <Carousel items={cards} />
    </div>
  );
}
