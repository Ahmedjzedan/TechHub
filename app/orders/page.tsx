"use client";

import Order from "@/components/ui/items/order";
import { useSession } from "@/components/providers/sessionProvider";
import { getOrdersWithItems } from "@/app/actions/actions"; // 👈 Using the new action
import { useState, useEffect } from "react";

// 1. Define the type for the data we're fetching
type OrderData = {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: Date;
  orderItems: {
    item: {
      name: string;
    };
  }[];
};

// 2. This helper function fixes the "Completed" vs "processing" type error
type OrderStatus =
  | "Completed"
  | "Being delivered"
  | "Canceled"
  | "Being processed";

function mapStatus(status: string): OrderStatus {
  switch (status) {
    case "delivered":
      return "Completed";
    case "shipped":
      return "Being delivered";
    case "canceled":
      return "Canceled";
    case "processing":
    default:
      return "Being processed";
  }
}

export default function Orders() {
  const { user } = useSession();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        setIsLoading(true);
        const data = (await getOrdersWithItems(user.id)) as OrderData[];
        setOrders(data);
        setIsLoading(false);
      };
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Please log in to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <span className="text-center text-2xl font-bold mt-4">Orders</span>
      <div className="flex flex-wrap gap-4 m-4">
        {orders.length > 0 ? (
          orders.map((order) => {
            // 3. Transform the nested data into a simple array of strings
            const itemNames = order.orderItems.map(
              (orderItem) => orderItem.item.name
            );

            // 4. Map the status
            const displayStatus = mapStatus(order.status);

            return (
              <Order
                key={order.id}
                orderID={order.id}
                orderStatus={displayStatus}
                itemsNames={itemNames} // 👈 Pass the item names
                // You can still pass other props if your component accepts them
                // totalAmount={order.totalAmount}
                // createdAt={order.createdAt}
              />
            );
          })
        ) : (
          <p>You haven't placed any orders yet.</p>
        )}
      </div>
    </div>
  );
}
