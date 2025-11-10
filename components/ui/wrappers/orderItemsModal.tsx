"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function OrderItemsModal({
  children,
  back = false,
  level = 1, // 1. Add the 'level' prop
}: {
  children: React.ReactNode;
  back?: boolean;
  level?: number; // 2. Define its type
}) {
  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scroll when modal closes
      document.body.style.overflow = "";
    };
  }, []);

  const router = useRouter();

  // 3. This handler calls router.back() 'level' times
  const handleClose = () => {
    for (let i = 0; i < level; i++) {
      router.back();
    }
  };

  return (
    <div className="fixed flex inset-0 items-center justify-center rounded-xl m-4 z-10 ">
      <motion.button
        onClick={handleClose} // 4. Use the new handler
        className="fixed inset-0 bg-black/50 backdrop-blur-[8px] "
      ></motion.button>
      <div className="z-20 bg-background border-2 border-border rounded-lg">
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-end pb-4">
            <Button
              onClick={handleClose} // 5. Use the same handler
              className=""
            >
              {back ? "Back" : "Close"}
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
