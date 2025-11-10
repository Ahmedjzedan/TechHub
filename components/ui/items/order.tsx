"use client";
import { Button } from "../button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

type orderProps = {
  orderID: number;
  orderStatus: string;
  itemsNames: string[];
  totalAmount?: number;
  createdAt?: Date;
};

export default function Order({
  orderID,
  orderStatus,
  itemsNames,
  totalAmount,
  createdAt,
}: orderProps) {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className="flex flex-col min-w-70 flex-1 gap-4 p-4 border-2 border-border rounded-md bg-background-shade-light">
      <div className="text-lg text-text-heading font-bold">
        Order #{orderID}
      </div>
      <div className="flex-col">
        <div className="text-text-heading font-semibold">Status</div>
        <div className="ml-4 text-primary text-sm">{orderStatus}</div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="text-text-heading font-semibold">Items</div>
        <ul className="list-disc flex flex-col gap-2 pl-4 line-clamp-1 text-text-body max-h-">
          {itemsNames.map((content, index) => (
            <motion.li
              key={index}
              className="line-clamp-1 before:content-['•'] before:pr-2 before:text-text-body hover:line-clamp-none"
              initial={{ height: "1.5rem" }}
              whileHover={{ height: "auto" }}
              exit={{ height: "1.5rem" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {content}
            </motion.li>
          ))}
        </ul>
      </div>
      <div>
        <Button
          onClick={() => {
            router.push(pathName + `/${orderID}`);
          }}
          className="mt-4"
        >
          See more
        </Button>
      </div>
    </div>
  );
}
