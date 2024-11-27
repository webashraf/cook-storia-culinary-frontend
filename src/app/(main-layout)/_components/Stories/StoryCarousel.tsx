"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
      <div className="flex justify-center items-center h-96">
        <div className="loader" />
      </div>
    );
  }

  const cards = storyData.map((card, index) => (
    <Card key={card?._id} card={card} index={index} />
  ));

  return (
    <div className="w-full overflow-hidden h-auto pb-5 flex flex-row">
      {user && (
        <div className="">
          <AddStory setRefacing={setRefacing} />
        </div>
      )}
      <div className={`${user ? "lg:w-[80%] w-full" : "w-full"}`}>
        <Carousel items={cards} />
      </div>
    </div>
  );
}
