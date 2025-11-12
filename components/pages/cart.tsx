"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getCartItems,
  getItemsById,
  updateCartQuantity, // 1. Import this
} from "@/app/actions/actions";
import HorizontalItem from "@/components/ui/items/horizontalItem";
import { FullItem } from "@/app/actions/actions";
import { useSession } from "@/components/providers/sessionProvider";
import { Button } from "../ui/button";
import Link from "next/link";
import CheckoutSummery from "../ui/items/checkoutSummery"; // Make sure to import

type image = { id: number; itemId: number; imageUrl: string };

type CartItemType = {
  cartId: number | null; // Allow null for local cart
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
  const [shipment, setShipment] = useState(10);

  const removeItem = (idToRemove: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.item.id !== idToRemove)
    );
  };

  // 2. --- THIS IS THE NEW HANDLER ---
  const handleQuantityChange = (
    itemId: number,
    action: "increase" | "decrease"
  ) => {
    // 2a. Optimistically update the UI state
    setItems(
      (currentItems) =>
        currentItems
          .map((item) => {
            if (item.item.id === itemId) {
              const newQuantity =
                action === "increase" ? item.quantity + 1 : item.quantity - 1;
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
          .filter((item) => item.quantity > 0) // 2b. Automatically remove if quantity is 0
    );

    // 2c. Sync with the server in the background
    if (user) {
      updateCartQuantity({ userId: user.id, itemId: itemId, action: action });
    } else {
      // TODO: Add local storage logic here
    }
  };
  // --- END OF NEW HANDLER ---

  useEffect(() => {
    async function fetchItemsDB(userId: number) {
      const data = await getCartItems(userId);
      setItems(data as CartItemType[]); // Cast to ensure type match
      setLoaded(true);
    }

    async function fetchItemsLocal() {
      const itemsJSON: string | null = localStorage.getItem("cartItems");
      if (itemsJSON) {
        const data = await getItemsById(JSON.parse(itemsJSON));
        const cartItems: CartItemType[] = data.map((item: FullItem) => ({
          cartId: null,
          itemId: item.id,
          quantity: 1,
          item: item,
        }));
        setItems(cartItems);
      }
      setLoaded(true);
    }

    if (user) {
      fetchItemsDB(user.id);
    } else {
      fetchItemsLocal();
    }
  }, [user]);

  // This calculation is now always correct
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
                // 3. --- PASS HANDLERS TO CHILD ---
                onIncrease={() =>
                  handleQuantityChange(cartItem.item.id, "increase")
                }
                onDecrease={() =>
                  handleQuantityChange(cartItem.item.id, "decrease")
                }
              />
            );
          })}

          <CheckoutSummery subTotal={subTotal} />

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
