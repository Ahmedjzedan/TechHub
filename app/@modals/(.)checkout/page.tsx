import OrderItemsModal from "@/components/ui/wrappers/orderItemsModal";
import PaymentSelection from "@/components/pages/paymentSelection";

export default function Checkout() {
  return (
    <OrderItemsModal level={2} back={true}>
      <PaymentSelection></PaymentSelection>
    </OrderItemsModal>
  );
}
