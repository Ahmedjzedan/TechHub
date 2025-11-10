import Info from "@/components/ui/items/info";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-center font-bold text-lg">
        Terms And Conditions
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Info
          text="Introduction"
          hiddenText="These Terms and Conditions govern your use of [your shop name] (“we,” “us,” “our”). By accessing or purchasing from our website, you agree to these terms."
        />
        <Info
          text="Use of the Site"
          hiddenText="You agree not to misuse our site, attempt to hack, spam, or exploit it.You must be [age requirement, e.g., 18+] to make purchases."
        />
        <Info
          text="Product Information and Pricing"
          hiddenText="We try to ensure that all product details and prices are accurate, but mistakes happen. We reserve the right to correct errors or cancel orders if a product is incorrectly priced."
        />
        <Info
          text="Payments"
          hiddenText="All payments must be made through accepted methods listed at checkout. We do not store or process your payment information directly; payments are handled securely by [payment processor name]."
        />
        <Info
          text="Shipping"
          hiddenText="Shipping times are estimates and may vary. We're not responsible for delays caused by carriers or customs."
        />
        <Info
          text="Limitation of Liability"
          hiddenText="We're not responsible for indirect, incidental, or consequential damages resulting from use or inability to use our website or products."
        />
        <Info
          text="Changes to Terms"
          hiddenText="We may update these Terms at any time. The latest version will always be available on this page."
        />
      </div>
    </div>
  );
}
