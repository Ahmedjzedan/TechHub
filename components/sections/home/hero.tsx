"use client";

import Arrow from "@/components/ui/buttons/arrows";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// 1. Import your server action and the FullItem type
import { getItemsById, FullItem } from "@/app/actions/actions";

// 2. Define the list of item IDs you want to feature
const heroProductIDs = [1, 2, 3, 4, 5];

export default function HeroSection() {
  // 3. Set up state to hold the dynamic data and loading status
  const [products, setProducts] = useState<FullItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // 4. Fetch the data when the component mounts
  useEffect(() => {
    const fetchHeroItems = async () => {
      // We cast the result to FullItem[] so TypeScript is happy
      const data = (await getItemsById(heroProductIDs)) as FullItem[];
      setProducts(data);
      setIsLoading(false);
    };

    fetchHeroItems();
  }, []); // The empty array [] means this runs only once

  // 5. Derive the image number from the loaded products
  const imageNumber = products.length - 1;

  // 6. Handle the Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[272px] bg-background-shade-light">
        <p>Loading...</p>
      </div>
    );
  }

  // 7. Handle the No Products state
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center w-full min-h-[272px] bg-background-shade-light">
        <p>No products found.</p>
      </div>
    );
  }

  // 8. Get the current product to display
  const currentProduct = products[currentItemIndex];
  // Get the first image URL, or a placeholder if it has no images
  const currentImage =
    currentProduct.itemImages[0]?.imageUrl.trimEnd() ??
    "/images/placeholder.png";

  return (
    <div
      className="flex flex-col-reverse mt-4 md:grid md:grid-cols-[1fr_2fr] md:flex-row relative bg-background-shade-light
     justify-center w-full items-center px-16 py-4 group border-y-2 border-border hover:border-y-2 hover:border-primary transition-all duration-300"
    >
      <div className="pointer-events-none  flex opacity-0 group-hover:opacity-100 absolute inset-0 justify-between w-full px-4 transition-all duration-300">
        <Arrow
          currentItemIndex={currentItemIndex}
          imageNumber={imageNumber} // This is now dynamic (e.g., 4)
          setCurrentItemIndex={setCurrentItemIndex}
        />
      </div>

      <div className="col-start-1 pl-4 md:flex flex flex-col justify-center mt-4">
        <h1 className="text-lg font-bold mb-2">
          {currentProduct.name} {/* 👈 Dynamic Name */}
        </h1>
        <span className="text-sm text-text-secondary hidden md:block">
          {currentProduct.description || "No description available."}{" "}
          {/* 👈 Dynamic Desc */}
        </span>
        <Link href={"/item/" + currentProduct.id}>
          {" "}
          {/* 👈 Dynamic Link */}
          <Button
            className="p-4 py-5 mt-4 border-2 border-foreground text-foreground hover:border-primary hover:cursor-pointer text-lg max-w-40"
            variant={"outline"}
          >
            See more
          </Button>
        </Link>
      </div>
      <div
        className="flex flex-col items-center flex-1 col-start-2 relative pointer-events-none h-full
       w-auto min-h-60 max-h-60 min-w-20 sm:min-w-30 justify-center my-2"
      >
        <Image
          src={currentImage}
          alt={currentProduct.name}
          width={260}
          height={260}
          className="object-contain"
        />
      </div>
    </div>
  );
}
