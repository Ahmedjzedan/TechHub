"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { LabledInput } from "@/components/ui/labeledInput";
import CreditCard from "../sections/userInfo/creditCard";
import Address from "../sections/userInfo/address";
import { Button } from "../ui/button";
import { useSession } from "../providers/sessionProvider";
import { CheckOutCart } from "@/app/actions/actions";

export default function ({ method }: { method?: "creditcard" | "COD" }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const session = useSession();
  const user = session.user;

  useEffect(() => {
    if (method) {
      setPaymentMethod(method);
    }
  }, [method]);

  return (
    <div className="m-4">
      <div className="flex flex-col gap-4 justify-center items-center">
        <span className="text-lg font-bold">Payment Info</span>
        <div className="flex flex-col mt-4 w-full justify-start">
          <span className="text-sm text-text-secondary self-start">
            Payment method
          </span>
          <Select
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value)}
          >
            <SelectTrigger className="border-2 border-border">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment Methods</SelectLabel>
                <SelectItem value="COD">Cash On Delivery</SelectItem>
                <SelectItem value="creditcard">Credit Card</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[80vw] ">
          {paymentMethod === "creditcard" && <CreditCard />}
          <Address />
        </div>
        <Button
          onClick={() => {
            if (user) {
              CheckOutCart(user.id);
            }
          }}
          type="submit"
          className="mt-4"
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
