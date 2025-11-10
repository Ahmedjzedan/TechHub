"use client";

import { useRouter } from "next/navigation";
import React from "react";
// --- 1. Import the custom hook ---
import { useSidebar } from "@/components/ui/sidebarConent"; // Adjust the path if needed

interface SidebarButtonLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function SidebarButtonLink({
  href,
  children,
}: SidebarButtonLinkProps) {
  const router = useRouter();
  const { setIsActive } = useSidebar();

  const handleClick = () => {
    router.push(href);
    setIsActive(false);
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-start hover:bg-background-shade-light hover:text-primary ml-1 pl-3 py-1 rounded-lg w-full text-left"
    >
      {children}
    </button>
  );
}
