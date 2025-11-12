"use client";

import ArrowButtons from "@/components/ui/buttons/arrows";
import Image from "next/image";
import PreviewImages from "@/components/ui/items/previewImages";
import { useEffect, useState } from "react";

export default function ItemDisplay({ images }: { images: string[] }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [imageNumber, setImageNumber] = useState(images.length - 1);

  return (
    <div className="flex flex-grow border-2 border-border p-4 relative rounded-xl h-auto max-h-120 min-h-50 md:min-h-100">
      <div className="px-2 group absolute w-full z-1 inset-0 flex items-center justify-between sm:opacity-0 hover:opacity-100 transition-all duration-300">
        <ArrowButtons
          className=""
          currentItemIndex={currentItemIndex}
          setCurrentItemIndex={setCurrentItemIndex}
          imageNumber={imageNumber}
        />
        <PreviewImages
          className="hidden sm:flex h-20 absolute left-1/2 -translate-x-1/2 bottom-4"
          images={images}
          setActiveImage={setCurrentItemIndex}
        />
      </div>

      <div className="">
        <Image
          src={images[currentItemIndex]}
          alt="xps laptop"
          fill
          className="object-contain p-4"
        />
      </div>
    </div>
  );
}
