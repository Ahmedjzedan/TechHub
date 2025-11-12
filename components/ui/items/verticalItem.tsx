"use client";

import Image, { StaticImageData } from "next/image";
import xpsFront from "@/public/images/xpsFront.png";
import { Button } from "../button";
import { ArrowIcon, WishListIcon } from "@/public/svg";
import { useState } from "react";
import PreviewImages from "./previewImages";
import ArrowButtons from "@/components/ui/buttons/arrows";
import { Description } from "@radix-ui/react-dialog";
import WishlistButton from "../buttons/wishlistButton";
import Link from "next/link";
import { useSession } from "@/components/providers/sessionProvider";
import { AddToCart } from "@/app/actions/actions";
import { toast } from "sonner";

type VerticalItemProps = {
  images: string[];
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  discount?: number;
  id: number;
  removeItem?: (itemid: number) => void;
};

export default function VerticalItem({
  images,
  itemName,
  itemDescription,
  itemPrice,
  discount,
  id,
  removeItem,
}: VerticalItemProps) {
  const session = useSession();
  const user = session.user;
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [imageNumber, setImageNumber] = useState(images.length - 1);
  if (discount == 0) {
    discount = undefined;
  }
  return (
    <div className="flex flex-col flex-1 bg-background-shade-light rounded-md border-2 border-border hover:border-primary transition-all duration-300">
      <div className="relative group">
        <div className="px-2 absolute inset-0 flex items-center justify-between opacity-100 sm:opacity-0 hover:opacity-100 transition-all duration-300">
          <ArrowButtons
            className=""
            currentItemIndex={currentItemIndex}
            setCurrentItemIndex={setCurrentItemIndex}
            imageNumber={imageNumber}
          />
        </div>
        {/* <div className="absolute bottom-10 inset-x-0 justify-self-center w-100 ">
          <PreviewImages
            className=""
            images={images}
            setActiveImage={setCurrentItemIndex}
          />
        </div> */}

        <div className="w-full pointer-events-none h-40 flex items-center justify-center relative">
          {discount && (
            <div className="absolute left-0 top-0 bg-primary text-sm rounded-2xl m-2 py-2 px-3 text-black">
              %{discount}
            </div>
          )}
          <Image
            className="object-contain"
            src={images[currentItemIndex]}
            alt="xps laptop"
            width={160}
            height={160}
          />
        </div>
      </div>
      <div className="border-b-2 border-border"></div>
      <span className="mt-4 mx-4 font-bold text-sm ">{itemName}</span>
      <span className="mt-2 mx-4 flex-1 text-text-body text-xs line-clamp-2">
        {itemDescription}
      </span>
      <div className="flex flex-1 items-center gap-2 mt-4 mx-4 text-primary text-xl font-semibold">
        <div
          className={`${
            discount ? "line-through text-sm text-foreground" : ""
          }`}
        >
          {itemPrice}$
        </div>

        {discount &&
          `${Math.round(
            Number(itemPrice) - (Number(itemPrice) * discount) / 100
          )}$`}
      </div>
      <div className="m-4 flex justify-between gap-">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (user) {
                AddToCart(user.id, id);
              } else {
                const localCartJson = localStorage.getItem("cartItems");
                const cart: number[] = localCartJson
                  ? JSON.parse(localCartJson)
                  : [];
                if (!cart.includes(id)) {
                  cart.push(id);
                }
                localStorage.setItem("cartItems", JSON.stringify(cart));
              }
              toast.success(`${itemName} added to cart`);
            }}
            className="h-8 p-4"
          >
            Add to cart
          </Button>
          <Link href={"/item/" + id}>
            <Button variant={"outline"} className="h-8 p-2 ">
              See more
            </Button>
          </Link>
        </div>

        <WishlistButton removeItem={removeItem} itemId={id} />
      </div>
    </div>
  );
}
