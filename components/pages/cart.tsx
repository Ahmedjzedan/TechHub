"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getCartItems, getItemsById } from "@/app/actions/actions";
import HorizontalItem from "@/components/ui/items/horizontalItem";
import { FullItem } from "@/app/actions/actions";
import { useSession } from "@/components/providers/sessionProvider";
import { Button } from "../ui/button";
import Link from "next/link";

type image = { id: number; itemId: number; imageUrl: string };

type CartItemType = {
  cartId: number;
  itemId: number;
  quantity: number;
  item: FullItem;
};

export default function Cart() {
  const router = useRouter();
  const session = useSession();
  const user = session.user;

  const [items, setItems] = useState<CartItemType[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [shipment, setShipment] = useState(10); // Keep shipment as state

  const removeItem = (idToRemove: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.item.id !== idToRemove)
    );
  };

  useEffect(() => {
    async function fetchItemsDB(userId: number) {
      const data = await getCartItems(userId);
      setItems(data);
      setLoaded(true); // Move setLoaded inside
    }

    async function fetchItemsLocal() {
      const itemsJSON: string | null = localStorage.getItem("cartItems");

      if (itemsJSON) {
        const data = await getItemsById(JSON.parse(itemsJSON));

        const cartItems: CartItemType[] = data.map((item) => ({
          cartId: 0,
          itemId: item.id,
          quantity: 1,
          item: item,
        }));
        // --- END OF FIX ---

        console.log(cartItems);
        setItems(cartItems); // 3. Now we're setting the correct type
      }
      setLoaded(true);
    }

    if (user) {
      fetchItemsDB(user.id);
    } else {
      fetchItemsLocal();
    }
  }, [user]);

  // Calculate subTotal directly from the items state
  const subTotalRaw = items.reduce((total, cartItem) => {
    const price = cartItem.item.discount
      ? cartItem.item.price -
        cartItem.item.price * (cartItem.item.discount / 100)
      : cartItem.item.price;

    return total + price * cartItem.quantity;
  }, 0);

  const subTotal = Math.round(subTotalRaw * 100) / 100;

  if (!loaded) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 overflow-x-hidden">
      {items.length > 0 ? (
        <>
          {items.map((cartItem) => {
            return (
              <HorizontalItem
                removeItem={removeItem}
                isCartItem={true}
                key={cartItem.itemId}
                id={cartItem.item.id}
                itemName={cartItem.item.name}
                itemDescription={cartItem.item.description || "No description."}
                itemPrice={cartItem.item.price}
                discount={cartItem.item.discount || 0}
                images={cartItem.item.itemImages.map((img: image) =>
                  img.imageUrl.trimEnd()
                )}
                quantity={cartItem.quantity}
              />
            );
          })}

          <div className="flex flex-col w-full items-center my-4 gap-4">
            <div className="border-1 border-foreground w-1/2"></div>
            <div className="text-sm  text-text-body">
              <h2>
                Sub total:{" "}
                <span className="text-primary">${subTotal.toFixed(2)}</span>
              </h2>
              <h2>
                Shipment:{" "}
                <span className="text-primary">${shipment.toFixed(2)}</span>
              </h2>
            </div>
            <div className="font-bold">
              <h1>
                Total:{" "}
                <span className="text-primary">
                  ${(subTotal + shipment).toFixed(2)}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                router.push("/checkout");
              }}
              className="flex justify-center items-center w-40"
            >
              Check Out
            </Button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
