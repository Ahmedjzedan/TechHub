"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { GetOrderItems } from "@/app/actions/actions"; // Import the action
import HorizontalItem from "@/components/ui/items/horizontalItem"; // Your item component
import CheckoutSummery from "@/components/ui/items/checkoutSummery"; // Your summary component
import { FullItem } from "@/app/actions/actions"; // Import your type

// 1. Define the type for the order data we'll fetch
type OrderDetails = {
  id: number;
  status: string;
  totalAmount: number; // This is the total from the DB
  createdAt: Date;
  orderItems: {
    itemId: number;
    quantity: number;
    priceAtPurchase: number;
    item: FullItem;
  }[];
};

export default function OrderDetailsPage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get the order ID from the URL, e.g., /orders/3
  const orderId = Number(params.id);

  useEffect(() => {
    // 2. Fetch the order details when the component loads
    console.log(orderId);
    if (orderId) {
      const fetchOrder = async () => {
        console.log("herro");
        const data = await GetOrderItems(orderId);
        console.log(data);
        setOrder(data);
        setIsLoading(false); // 👈 Move this inside the async function
      };
      fetchOrder();
      // setIsLoading(false); // 👈 Don't set this here, it's too early
    }
  }, [orderId]); // Re-run if the orderId changes

  // 3. Add a loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Loading your order...</p>
      </div>
    );
  }

  // 4. Handle order not found
  if (!order) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Order not found.</p>
      </div>
    );
  }

  // 5. Prepare the prices for the summary component
  const prices = order.orderItems.map(
    (orderItem) => orderItem.priceAtPurchase * orderItem.quantity
  );

  // --- THIS IS THE FIX ---
  // 6. Calculate subTotal from the prices array
  const subTotalRaw = prices.reduce((total, price) => total + price, 0);
  const subTotal = Math.round(subTotalRaw * 100) / 100;
  // --- END OF FIX ---

  return (
    <div className="flex flex-col gap-4 p-4 overflow-x-hidden">
      {/* 6. Map over the order items and render them */}
      {order.orderItems.map((orderItem) => (
        <HorizontalItem
          key={orderItem.itemId}
          id={orderItem.item.id}
          images={orderItem.item.itemImages.map((img) =>
            img.imageUrl.trimEnd()
          )}
          itemName={orderItem.item.name}
          itemDescription={orderItem.item.description || "No description"}
          itemPrice={orderItem.priceAtPurchase} // Use the price from the order
          quantity={orderItem.quantity}
          discount={orderItem.item.discount || 0}
          isCartItem={false} // It's not a cart item
          showItem={true}
        />
      ))}
      {/* 7. Pass the calculated subTotal to the component */}
      <CheckoutSummery subTotal={subTotal} />
    </div>
  );
}
