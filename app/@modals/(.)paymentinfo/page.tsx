import CardInfoAndAddress from "@/components/pages/cardInfoAndAddress";
import OrderItemsModal from "@/components/ui/wrappers/orderItemsModal";

export default function PaymentInfoModal() {
  return (
    <OrderItemsModal level={3} back={true}>
      <CardInfoAndAddress />
    </OrderItemsModal>
  );
}
