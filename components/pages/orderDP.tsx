"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { GetOrderItems } from "@/app/actions/actions";
import HorizontalItem from "@/components/ui/items/horizontalItem";
import CheckoutSummery from "@/components/ui/items/checkoutSummery";
import { FullItem } from "@/app/actions/actions";

type OrderDetails = {
  id: number;
  status: string;
  totalAmount: number;
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

  const orderId = Number(params.id);

  useEffect(() => {
    console.log(orderId);
    if (orderId) {
      const fetchOrder = async () => {
        console.log("herro");
        const data = await GetOrderItems(orderId);
        console.log(data);
        setOrder(data);
        setIsLoading(false);
      };
      fetchOrder();
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Loading your order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Order not found.</p>
      </div>
    );
  }

  const prices = order.orderItems.map(
    (orderItem) => orderItem.priceAtPurchase * orderItem.quantity
  );

  const subTotalRaw = prices.reduce((total, price) => total + price, 0);
  const subTotal = Math.round(subTotalRaw * 100) / 100;

  return (
    <div className="flex flex-col gap-4 p-4 overflow-x-hidden">
      {order.orderItems.map((orderItem) => (
        <HorizontalItem
          key={orderItem.itemId}
          id={orderItem.item.id}
          images={orderItem.item.itemImages.map((img) =>
            img.imageUrl.trimEnd()
          )}
          itemName={orderItem.item.name}
          itemDescription={orderItem.item.description || "No description"}
          itemPrice={orderItem.priceAtPurchase}
          quantity={orderItem.quantity}
          discount={orderItem.item.discount || 0}
          isCartItem={false}
          showItem={true}
        />
      ))}
      <CheckoutSummery subTotal={subTotal} />
    </div>
  );
}
