"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
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
  console.log("route intrcepted");
  return (
    <div className="fixed flex inset-0 items-center justify-center rounded-xl z-10">
      <motion.button
        onClick={() => {
          router.push("/foo");
          router.push("/");
        }}
        className="fixed inset-0 bg-black/50 z-10 backdrop-blur-[8px] "
      ></motion.button>
      <div className=" z-20 bg-background border-2 border-border rounded-lg relative">
        {children}
      </div>
    </div>
  );
}
