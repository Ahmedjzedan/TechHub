"use client";

import Image from "next/image";
import { Button } from "../button";
import { useState } from "react";
import ArrowButtons from "@/components/ui/buttons/arrows";
import { useRouter } from "next/navigation";
import { AddToCart, removeFromCart } from "@/app/actions/actions";
import { useSession } from "@/components/providers/sessionProvider";
import { toast } from "sonner";

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
}: HorizontalItemProps) {
  const session = useSession();
  const user = session.user;
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [imageNumber, setImageNumber] = useState(images.length - 1);
  const router = useRouter();

  if (discount == 0) {
    discount = undefined;
  }
  return (
    <div className="flex flex-1 gap-4 bg-background-shade-light rounded-md border-2 border-border hover:border-primary transition-all duration-300">
      <div className="relative group flex items-center p-4">
        {/* <PreviewImages
          className=""
          images={images}
          setActiveImage={setCurrentItemIndex}
        /> */}
        <div className="px-2 absolute z-10 inset-0 flex items-center justify-between opacity-0 hover:opacity-100 transition-all duration-300">
          <ArrowButtons
            currentItemIndex={currentItemIndex}
            setCurrentItemIndex={setCurrentItemIndex}
            imageNumber={imageNumber}
          />
        </div>
        <div className="relative pointer-events-none h-full w-auto min-h-10 max-h-40 min-w-20 sm:min-w-30 flex items-center justify-center my-2 ">
          <div className="w-full h-full">
            <Image
              src={images[currentItemIndex]}
              alt="xps laptop"
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
        </span>
        <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-2 mr-4 my-4">
          {showItem ? (
            ""
          ) : (
            <>
              {isCartItem ? (
                <Button
                  onClick={() => {
                    if (user) {
                      removeFromCart(user.id, id);
                    } else {
                      const localCartJson = localStorage.getItem("cartItems");

                      // 2. If it exists, parse it; otherwise, do nothing.
                      if (localCartJson) {
                        let cart: number[] = JSON.parse(localCartJson);

                        // 3. Create a new array *without* the item we're removing
                        const newCart = cart.filter((itemId) => itemId !== id);

                        // 4. Save the new array back to local storage
                        localStorage.setItem(
                          "cartItems",
                          JSON.stringify(newCart)
                        );
                      }
                    }
                    toast.success(`${itemName} is removed from cart`);
                    if (removeItem) {
                      removeItem(id);
                    }
                  }}
                  className="w-30"
                >
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
                      let cart: number[] = localCartJson
                        ? JSON.parse(localCartJson)
                        : [];
                      if (!cart.includes(id)) {
                        cart.push(id);
                      }
                      localStorage.setItem("cartItems", JSON.stringify(cart));
                    }
                  }}
                  className="w-30"
                >
                  Add to cart
                </Button>
              )}
              <Button
                onClick={() => {
                  router.push("/foo");
                  router.push(`/item/${id}`);
                }}
                className="w-30"
                variant="outline"
              >
                See more
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
