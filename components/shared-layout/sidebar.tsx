"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import SidebarContent from "@/components/ui/sidebarConent";
import { useEffect } from "react";

interface SidebarProps {
  setIsActive: (isActive: boolean) => void;
}

export default function Sidebar({ setIsActive }: SidebarProps) {
  return (
    <>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        exit={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed left-0 top-0 h-full w-64 bg-background border-r-2 border-border z-20 overflow-y-auto"
      >
        <SidebarContent setIsActive={setIsActive} />
      </motion.div>
      <motion.button
        onClick={() => setIsActive(false)}
        className="fixed inset-0 bg-black/50 z-10 backdrop-blur-[var(--blur)] "
        style={{ "--blur": "0px" } as React.CSSProperties}
        initial={{ opacity: 0, "--blur": "0px" }}
        animate={{ opacity: 1, "--blur": "8px" }}
        exit={{ opacity: 0, "--blur": "0px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </>
  );
}
