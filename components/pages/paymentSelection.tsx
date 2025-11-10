"use client";
import { Button } from "@/components/ui/button";
import { CODIcon, CreditCardIcon } from "@/public/svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentSelection() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center gap-8 p-4 w-full sm:w-[50vw]">
      <div className="text-lg font-semibold">Choose your payment method:</div>
      <div className="flex flex-col sm:flex-row sm:justify-center gap-4 w-full">
        <button
          onClick={() => router.push("/paymentinfo/COD")}
          className="bg-background-shade-light border-border border-2 p-4 group transition-all duration-300 text-foreground 
          hover:border-primary text-md rounded-xl flex justify-between gap-2 items-center hover:text-background hover:bg-primary"
        >
          Cash on delivery
          <CODIcon
            className="h-8 w-10"
            color={
              "fill-foreground group-hover:fill-background transition-all duration-300"
            }
          />
        </button>
        <button
          onClick={() => {
            router.push("/paymentinfo/creditcard");
          }}
          className="bg-background-shade-light border-border border-2 p-4 group transition-all duration-300 text-foreground
           hover:border-primary text-md rounded-xl flex justify-between gap-2 items-center hover:text-background hover:bg-primary"
        >
          Pay with Credit Card
          <CreditCardIcon
            className="h-8 w-8"
            color={
              "stroke-foreground group-hover:stroke-background transition-all duration-300"
            }
          />
        </button>
      </div>
      <div className="text-sm text-text-secondary w-full sm:w-">
        Your info will be saved to make other transactions easier to change the
        payment method or info after completing click{" "}
        <Link href={"#"} className="text-secondary underline">
          here
        </Link>{" "}
        or to the payment through the side menu
      </div>
    </div>
  );
}
