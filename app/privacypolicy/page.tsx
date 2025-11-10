import Info from "@/components/ui/items/info";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-center font-bold text-lg">
        Privacy Policy
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Info
          text="Introduction"
          hiddenText="Your privacy matters to us. This policy explains how [your shop name] collects, uses, and protects your information."
        />
        <Info
          text="Information We Collect"
          hiddenText={
            <ul className="flex flex-col gap-2 list-disc pl-4 leading-none ">
              <li>
                Personal information: name, email, shipping address, payment
                details.
              </li>
              <li>
                Non-personal info: browser type, device, and site usage data
                (via cookies).
              </li>
            </ul>
          }
        />
        <Info
          text="How We Use Your Information"
          hiddenText={
            <ul className="flex flex-col gap-2 list-disc pl-4 leading-none ">
              <li>To process and deliver your orders.</li>
              <li>
                To send updates, order confirmations, or promotions (you can
                unsubscribe anytime).
              </li>
              <li>To improve our website and customer experience.</li>
            </ul>
          }
        />

        <Info
          text="Sharing of Information"
          hiddenText=" We don't sell your data.We only share your information with trusted partners (like payment processors and shipping carriers) necessary to complete your order."
        />
        <Info
          text="Cookies"
          hiddenText="Our site uses cookies to improve your browsing experience. You can disable cookies in your browser, but some features may not work properly."
        />
        <Info
          text="Data Retention"
          hiddenText="We retain your data as long as necessary to fulfill your orders or comply with legal obligations."
        />
        <Info
          text="Security"
          hiddenText="We use SSL encryption and other reasonable measures to protect your data, but no system is 100% secure."
        />
        <Info
          text="Your Rights"
          hiddenText="Depending on your region, you may have the right to access, correct, or delete your personal data. To exercise your rights, 
                      contact us at [support email]."
        />
        <Info
          text="Changes to Terms"
          hiddenText="We may update these Terms at any time. The latest version will always be available on this page."
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
