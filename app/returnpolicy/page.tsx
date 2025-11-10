import Info from "@/components/ui/items/info";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-center font-bold text-lg">Return policy</div>
      <div className="flex flex-col gap-4 items-center">
        <Info
          text="Overview"
          hiddenText="We want you to be completely happy with your purchase. If something isn't right, you can return it within 1 day of delivery for a refund or exchange, 
as long as it meets the conditions below."
        />
        <Info
          text="Eligibility for Returns"
          hiddenText={
            <ul className="flex flex-col gap-2 list-disc pl-4 leading-none ">
              <li>
                Items must be unused and in the same condition you received
                them.
              </li>
              <li>Items must be in the original packaging.</li>
              <li>Proof of purchase (receipt or order number) is required.</li>
              <li>
                Certain products (like software, digital goods, or
                hygiene-related items) can't be returned.
              </li>
            </ul>
          }
        />
        <Info
          text="Return Process"
          hiddenText="To start a return, contact us at [support email] with your order number and reason for return. Once approved, ship the product to [return address]. You're responsible for return shipping unless the item was damaged or defective."
        />
        <Info
          text="Refunds"
          hiddenText="Once your return is received and inspected, we'll notify you about your refund approval. Refunds are issued to your original payment method within [X business days]."
        />
        <Info
          text="Exchanges"
          hiddenText="Need a different size or color? Let us know. If available, we’ll ship the replacement after receiving your return."
        />
        <Info
          text="Damaged or Defective Items"
          hiddenText="If you got a damaged or faulty item, email us within [X days] of delivery with pictures. We’ll make it right fast."
        />
      </div>
    </div>
  );
}
