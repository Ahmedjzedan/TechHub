"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Shevron } from "@/public/svg";

export default function Info({
  hiddenText,
  text,
}: {
  hiddenText: React.ReactNode;
  text: string;
}) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="flex flex-col max-w-150 w-full border-2 bg-background-shade-light rounded-2xl border-foreground hover:border-primary transition-all duration-300">
      {/* 1. The Clickable Header */}
      <button
        className="flex w-full items-center justify-between text-left p-4"
        onClick={() => setIsClicked(!isClicked)}
      >
        <h1 className="font-bold">{text}</h1>
        <Shevron
          className={`w-4 h-4 sm:w-5 sm:h-5 ml-3 transition-all duration-300 ${
            isClicked ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-text-body">{hiddenText}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
