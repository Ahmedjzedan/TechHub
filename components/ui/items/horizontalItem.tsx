"use client";

import Image from "next/image";
import { Button } from "../button";
import { useState } from "react";
import ArrowButtons from "@/components/ui/buttons/arrows";
import { useRouter } from "next/navigation";
import { AddToCart, removeFromCart } from "@/app/actions/actions";
import { useSession } from "@/components/providers/sessionProvider";
import { toast } from "sonner";
import Link from "next/link"; // Make sure Link is imported

type HorizontalItemProps = {
  removeItem?: (id: number) => void;
  images: string[];
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  discount: number | undefined;
  id: number;
  showItem?: boolean;
  isCartItem: boolean;
  quantity: number;
  onIncrease?: () => void; // Add handler prop
  onDecrease?: () => void; // Add handler prop
};

export default function HorizontalItem({
  removeItem,
  images,
  itemName,
  itemDescription,
  quantity,
  discount,
  id,
  itemPrice,
  showItem,
  isCartItem,
  onIncrease, // Get handlers from props
  onDecrease,
}: HorizontalItemProps) {
  const session = useSession();
  const user = session.user;
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [imageNumber, setImageNumber] = useState(images.length - 1);
  const router = useRouter();

  if (discount == 0) {
    discount = undefined;
  }

  // Helper for the remove button
  const handleRemoveClick = () => {
    if (user) {
      removeFromCart(user.id, id);
    } else {
      const localCartJson = localStorage.getItem("cartItems");
      if (localCartJson) {
        const cart: number[] = JSON.parse(localCartJson);
        const newCart = cart.filter((itemId) => itemId !== id);
        localStorage.setItem("cartItems", JSON.stringify(newCart));
      }
    }
    toast.success(`${itemName} is removed from cart`);
    if (removeItem) {
      removeItem(id);
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 gap-4 bg-background-shade-light rounded-md border-2 border-border hover:border-primary transition-all duration-300">
      <div className="flex ">
        <div className="relative group flex items-center p-4">
          <div className="px-2 absolute z-10 inset-0 flex items-center justify-between opacity-0 hover:opacity-100 transition-all duration-300">
            <ArrowButtons
              currentItemIndex={currentItemIndex}
              setCurrentItemIndex={setCurrentItemIndex}
              imageNumber={imageNumber}
            />
          </div>
          <div className="relative pointer-events-none h-full w-auto min-h-10 max-h-40 min-w-30 md:min-w-30 flex items-center justify-center my-2 ">
            <div className="w-full h-full">
              <Image
                src={images[currentItemIndex] || "/images/placeholder.png"} // Added a fallback
                alt={itemName}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mr-4">
          <span className="text-md font-bold mt-4">{itemName}</span>
          <span className="text-xs mt-2 w-auto text-text-secondary line-clamp-1">
            {itemDescription}
          </span>
          <span className="text-lg text-primary my-4 font-bold">
            <div className="flex flex-col flex-1 items-start gap-2 text-primary text-xl font-semibold">
              <div
                className={`${
                  discount ? "line-through text-md text-foreground" : ""
                }`}
              >
                {itemPrice}$
              </div>

              {discount &&
                `${Math.round(
                  Number(itemPrice) - (Number(itemPrice) * discount) / 100
                )}$`}
            </div>
          </span>
        </div>{" "}
      </div>
      <div className="flex-1 hidden md:flex rounded-2xl"></div>

      {/* Show quantity controls only if it's a cart item */}
      {isCartItem ? (
        <div className="flex justify-center items-center rounded-2xl">
          <div className="flex gap-2 ">
            <button
              onClick={onDecrease} // Call parent's function
              className="bg-background border-2 border-border rounded-4xl px-1 
             transition-all duration-200 
             hover:bg-primary hover:border-foreground 
             hover:shadow-md hover:shadow-primary/50"
            >
              -
            </button>

            <div className="bg-primary text-foreground border-foreground rounded-4xl px-2 py-[1px]">
              {quantity}
            </div>

            <button
              onClick={onIncrease} // Call parent's function
              className="bg-background border-2 border-border rounded-4xl px-1 
             transition-all duration-200 
             hover:bg-primary hover:border-foreground 
             hover:shadow-md hover:shadow-primary/50"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex rounded-2xl"></div> // Empty spacer
      )}

      <div
        className={
          showItem
            ? ""
            : "flex flex-col md:flex-row md:justify-start md:items-center gap-2 m-4 md:mr-4 md:my-4"
        }
      >
        {showItem ? (
          ""
        ) : (
          <div className=" flex  gap-4 flex-col">
            {isCartItem ? (
              <Button onClick={handleRemoveClick} className="w-full md:w-30">
                Remove Item
              </Button>
            ) : (
              ""
            )}
            {isCartItem ? (
              ""
            ) : (
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
                className="w-30"
              >
                Add to cart
              </Button>
            )}
            <Link href={`/item/${id}`}>
              <Button className="w-full md:w-30" variant="outline">
                See more
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
