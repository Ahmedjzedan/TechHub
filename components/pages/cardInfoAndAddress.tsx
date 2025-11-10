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
import Link from "next/link";
import CreditCard from "../sections/userInfo/creditCard";
import Address from "../sections/userInfo/address";
import { Button } from "../ui/button";
import { useSession } from "../providers/sessionProvider";
import { CheckOutCart } from "@/app/actions/actions";

export default function ({ method }: { method?: "creditcard" | "COD" }) {
  const [paymentMethod, setPaymentMethod] = useState("");

  // --- BUG FIX 2: Default this to 'false' so you see the form first ---
  const [successful, setSuccessful] = useState(false);

  const session = useSession();
  const user = session.user;

  useEffect(() => {
    if (method) {
      setPaymentMethod(method);
    }
  }, [method]);

  // --- BUG FIX 1: Add the 'return' keyword ---
  return (
    <>
      {successful ? (
        <div className="z-10">
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col items-center gap-4 p-8">
              <h2 className="text-xl font-bold text-primary">Order Placed!</h2>
              <p className="text-center text-text-secondary">
                You will get a phone call shortly to confirm your order.
              </p>
              <Link href="/">
                <Button className="w-40">Close</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
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
                  setSuccessful(true);
                }
              }}
              type="submit"
              className="mt-4"
            >
              Confirm Order
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
