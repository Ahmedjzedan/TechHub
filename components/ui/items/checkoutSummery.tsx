import { Button } from "../button";
import { Input } from "../input";

type checkoutSummeryProps = {
  subTotal: number;
};

export default function CheckoutSummery({ subTotal }: checkoutSummeryProps) {
  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <div className="border-t-2 border-text-heading w-1/2 mt-8"></div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-text-heading text-md">Sub Total:</span>
          <span className="text-primary"> {subTotal}$</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-heading text-md">Shipping:</span>
          <span className="text-primary"> {"free"}$</span>
        </div>
      </div>
      {/* <div className="">
        <Input
          placeholder="Discount Code "
          className="mt-4 border-2 border-border"
        />
      </div> */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <span className="text-text-heading text-lg font-bold">Total: </span>
        <span className="text-primary font-bold text-lg">
          {" "}
          {subTotal + 10}$
        </span>
      </div>
    </div>
  );
}
