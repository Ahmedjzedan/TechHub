"use client";
import OrderDP from "@/components/pages/orderDP";
import { useParams } from "next/navigation";
import OrderItemsModal from "@/components/ui/wrappers/orderItemsModal";

export default function OrderDetailedPage() {
  const params = useParams();
  const id = params.id;

  return (
    <OrderItemsModal>
      <OrderDP />
    </OrderItemsModal>
  );
}
