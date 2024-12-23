"use client";
import { Image } from "@nextui-org/image";

export default function SocietyHeader() {
  return (
    <div className="relative w-full h-64 bg-gray-700 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          alt="Society cover"
          className="object-cover w-full h-full"
          src="https://res.cloudinary.com/dyalzfwd4/image/upload/v1734884282/digital-art-style-pottery-illustration_1_ei4tal.jpg"
        />
      </div>
    </div>
  );
}
