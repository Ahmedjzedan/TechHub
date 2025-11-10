import Cart from "@/components/pages/cart";
import OrderItemsModal from "@/components/ui/wrappers/orderItemsModal";

export default function CartPage() {
  return (
    <OrderItemsModal>
      <Cart />
    </OrderItemsModal>
  );
}
