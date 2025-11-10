import OrderItemsModal from "@/components/ui/wrappers/orderItemsModal";
import PaymentSelection from "@/components/pages/paymentSelection";

export default function Checkout() {
  return (
    <OrderItemsModal back={true}>
      <PaymentSelection></PaymentSelection>
    </OrderItemsModal>
  );
}
