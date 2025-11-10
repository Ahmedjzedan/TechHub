import Info from "@/components/ui/items/info";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-center font-bold text-lg">Shipping</div>
      <div className="flex flex-col gap-4 items-center">
        <Info
          text="Overview"
          hiddenText="We aim to deliver your order quickly and safely. This page explains our shipping methods, estimated delivery times, costs, and related details."
        />
        <Info
          text="Processing Time"
          hiddenText="All orders are processed within [X business days] after payment confirmation.Orders placed on weekends or holidays are processed the next business day.You'll receive an email with tracking information once your order ships."
        />
        <Info
          text="Shipping Options & Delivery Times"
          hiddenText={
            <ul className="flex flex-col gap-2 list-disc  leading-none ">
              <span>We offer the following shipping methods:</span>
              <li className="ml-4">
                Standard Shipping: Estimated delivery in [X–X days].
              </li>
              <li className="ml-4">
                Express Shipping: Estimated delivery in [X–X days].
              </li>
              <span>
                Delivery times are estimates and may vary due to factors beyond
                our control (weather, carrier delays, etc.).
              </span>
            </ul>
          }
        />

        <Info
          text="Shipping Costs"
          hiddenText="Shipping costs are calculated at checkout based on weight, size, and destination. Occasionally, we offer free shipping promotions—these will be clearly stated on the site."
        />
        <Info
          text="International Shipping"
          hiddenText="We ship worldwide to most countries.International customers are responsible for any customs fees, import duties, or local taxes charged by their country.We are not responsible for delays caused by customs or local delivery services."
        />
        <Info
          text="Order Tracking"
          hiddenText="Once your order ships, you'll receive a tracking number via email.You can track your shipment using the provided link or through the carrier's website."
        />
        <Info
          text="Lost or Delayed Shipments"
          hiddenText="If your package hasn't arrived within the expected timeframe, please contact [support email].We'll help locate your package and work with the carrier to resolve the issue."
        />
        <Info
          text="Address Accuracy"
          hiddenText="Make sure your shipping address is complete and correct before submitting your order.We're not responsible for lost packages due to incorrect or incomplete addresses provided by the customer."
        />
        <Info
          text="Contact Us"
          hiddenText="For any shipping-related questions, reach out at [support email]. We'll respond as soon as possible."
        />
        {/* <Info
          text="Eligibility for Returns"
          hiddenText={
            <ul className="list-disc m-0 leading-none ">
              <li>
                Items must be unused and in the same condition you received
                them.
              </li>
              <br />
              <li>Items must be in the original packaging.</li>
              <br />
              <li>Proof of purchase (receipt or order number) is required.</li>
              <br />
              <li>
                Certain products (like software, digital goods, or
                hygiene-related items) can't be returned.
              </li>
            </ul>
          }
        /> */}
      </div>
    </div>
  );
}
