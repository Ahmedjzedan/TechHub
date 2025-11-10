"use client";
import Image from "next/image";
import shevron from "@/public/shevron.svg"; // This might not be used now, Shevron component is.
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Shevron } from "@/public/svg";

interface SidebarGroupElementProps {
  children: React.ReactNode[];
  Icon: React.ReactNode;
  name: string;
}

export default function SidebarGroupElement({
  children,
  Icon,
  name,
}: SidebarGroupElementProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mx-2">
      <button
        className="flex justify-between items-center w-full bg-background hover:bg-background-shade-light rounded-lg px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          {Icon}
          <span>{name}</span>
        </div>
        <motion.div
          animate={{
            rotate: isOpen ? 90 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Shevron />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            exit={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className=" flex mx-2 p-2"
          >
            {/* --- THIS IS THE ANIMATED BORDER --- */}
            <motion.div
              initial={{ height: 0 }} // Start with 0 height
              animate={{ height: "auto" }} // Animate to auto height
              exit={{ height: 0 }} // Animate back to 0 height on exit
              transition={{ duration: 0.2, ease: "easeInOut" }} // Match children transition
              className="border-r-2 border-border/30"
            ></motion.div>
            {/* --- END ANIMATED BORDER --- */}

            <div className="py-2 flex flex-col gap-4 [&>*]hover:bg-background-shade-dark w-full">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
