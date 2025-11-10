"use client";
import CardInfoAndAddress from "@/components/pages/cardInfoAndAddress";
import OrderItemsModal from "@/components/ui/wrappers/orderItemsModal";
import { useParams } from "next/navigation";

export default function PaymentInfoModal() {
  const { method } = useParams();
  if (method !== "creditcard" && method !== "COD") {
    throw new Error("Invalid payment method");
  }
  return (
    <OrderItemsModal>
      <CardInfoAndAddress method={method} />
    </OrderItemsModal>
  );
}
