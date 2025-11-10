"use client";

import Arrow from "@/components/ui/buttons/arrows";
import Image from "next/image";
import { useState, useEffect } from "react";
import VerticalItem from "@/components/ui/items/verticalItem";
import XPSFront from "@/public/images/xpsFront.png";
import XPSAngle from "@/public/images/XPSAngle.png";
import XPSAngleLeft from "@/public/images/XPSAngleLeft.png";
import XPSAngleRight from "@/public/images/XPSAngleRight.png";
import XPSUpToDown from "@/public/images/XPSUpToDown.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
  {
    image: XPSFront,
    name: "Dell XPS",
    description:
      "Dell's XPS 15 blends stunning 4K visuals with high-end performance, all in a sleek, aluminum chassis perfect for work and play.",
  },
  {
    image: XPSAngle,
    name: "ASUS F15",
    description:
      "The ASUS F15 offers a balance of power and portability, featuring a crisp display and durable build for everyday productivity and gaming.",
  },
  {
    image: XPSAngleLeft,
    name: "HP Inspirion",
    description:
      "HP Inspirion combines reliability and style with strong performance, a sharp display, and long-lasting battery for home and office use.",
  },
  {
    image: XPSAngleRight,
    name: "MSI KATATNA",
    description:
      "MSI KATATNA is a gaming-focused powerhouse with cutting-edge graphics, fast processors, and a bold design that stands out.",
  },
  {
    image: XPSUpToDown,
    name: "Lenovo Thinkpad",
    description:
      "Lenovo Thinkpad offers legendary keyboard comfort, robust build, and business-class performance for professionals on the go.",
  },
];

export default function HeroSection() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [imageNumber, setImageNumber] = useState(products.length - 1);

  return (
    <div
      className="flex flex-col-reverse mt-4 md:grid md:grid-cols-[1fr_2fr] md:flex-row relative bg-background-shade-light
     justify-center w-full items-center px-16 py-4 group border-y-2 border-border hover:border-y-2 hover:border-primary transition-all duration-300"
    >
      <div className="pointer-events-none  flex opacity-0 group-hover:opacity-100 absolute inset-0 justify-between w-full px-4 transition-all duration-300">
        <Arrow
          currentItemIndex={currentItemIndex}
          imageNumber={imageNumber}
          setCurrentItemIndex={setCurrentItemIndex}
        />
      </div>

      <div className="col-start-1 pl-4 md:flex flex flex-col justify-center mt-4">
        <h1 className="text-lg font-bold mb-2">
          {products[currentItemIndex]["name"]}
        </h1>
        <span className="text-sm text-text-secondary hidden md:block">
          {products[currentItemIndex]["description"]}
        </span>
        <Link href={"/item/" + 1}>
          <Button
            className="p-4 py-5 mt-4 border-2 border-foreground text-foreground hover:border-primary hover:cursor-pointer text-lg max-w-40"
            variant={"outline"}
          >
            See more
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center h-65 flex-1 col-start-2">
        <Image
          src={products[currentItemIndex]["image"]}
          alt={"frontal shot of the XPS"}
          className="object-contain max-h-65"
        />
      </div>
    </div>
  );
}
