"use client";

import ReelStories from "./ReelStories";
export default function StoriesSection() {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
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

  const storyReelsArray = [
    {
      user: new Object("650c4f4a59fd4c99e439b829"), // Sample ObjectId
      images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      description: "A beautiful day at the beach",
      createdAt: "2024-11-14T08:00:00Z",
      updatedAt: "2024-11-14T08:00:00Z",
      isDelete: false,
    },
    {
      user: new Object("650c4f4a59fd4c99e439b830"), // Sample ObjectId
      images: [
        "https://example.com/image3.jpg",
        "https://example.com/image4.jpg",
      ],
      description: "Hiking through the mountains",
      createdAt: "2024-11-14T09:00:00Z",
      updatedAt: "2024-11-14T09:00:00Z",
      isDelete: false,
    },
    {
      user: new Object("650c4f4a59fd4c99e439b831"), // Sample ObjectId
      images: [
        "https://example.com/image5.jpg",
        "https://example.com/image6.jpg",
      ],
      description: "A cozy coffee break",
      createdAt: "2024-11-14T10:00:00Z",
      updatedAt: "2024-11-14T10:00:00Z",
      isDelete: false,
    },
    {
      user: new Object("650c4f4a59fd4c99e439b832"), // Sample ObjectId
      images: [
        "https://example.com/image7.jpg",
        "https://example.com/image8.jpg",
      ],
      description: "Exploring the city nightlife",
      createdAt: "2024-11-14T11:00:00Z",
      updatedAt: "2024-11-14T11:00:00Z",
      isDelete: false,
    },
  ];

  const result = storyReelsArray.map((item: any) => {
    return [
      {
        type: "image",
        duration: 6000,
        url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
      },
    ];
  });

  return (
    <div className="mb-5">
      <ReelStories />
      {/* <Stories height="600px" stories={stories} width="400px" />
      <Stories height="600px" stories={stories2} width="400px" /> */}
    </div>
  );
}
