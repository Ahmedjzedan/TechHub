"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSidebar } from "@/components/ui/sidebarConent"; // Adjust the path if needed
import { useSession } from "@/components/providers/sessionProvider";
import { toast } from "sonner";

interface SidebarButtonLinkProps {
  href: string;
  children: React.ReactNode;
  auth?: boolean;
}

export default function SidebarButtonLink({
  href,
  children,
  auth = false,
}: SidebarButtonLinkProps) {
  const router = useRouter();
  const { setIsActive } = useSidebar();
  const session = useSession();
  const user = session.user;

  const handleClick = () => {
    router.push(href);
    setIsActive(false);
    if (auth) {
      if (!user) {
        toast.error("You must sign in to visit this page!", {
          position: "bottom-right",
        });
        return;
      }
    }
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
