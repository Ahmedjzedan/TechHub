"use client";

import { WishListIcon } from "@/public/svg";
import { useSession } from "@/components/providers/sessionProvider";
import { addToWishList, removeFromWishList } from "@/app/actions/actions";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// 1. Define the props correctly
type WishlistButtonProps = {
  itemId: number;
  removeItem?: (itemId: number) => void; // 👈 Make it optional
};

export default function WishlistButton({
  itemId,
  removeItem,
}: WishlistButtonProps) {
  const session = useSession();
  const user = session.user;
  const pathname = usePathname();
  const isWishlistPage = pathname === "/wishlist";

  const handleClick = () => {
    if (!user) {
      toast.error("You must sign in to add items to your wishlist!", {
        position: "bottom-right",
      });
      return;
    }

    if (isWishlistPage) {
      removeFromWishList({ userId: user.id, itemId });
      toast.success("Removed from wishlist", { position: "bottom-right" });
      if (removeItem) {
        removeItem(itemId);
      }
    } else {
      addToWishList({ userId: user.id, itemId: itemId });
      toast.success("Added to wishlist!", { position: "bottom-right" });
    }
  };

  return (
    <button onClick={handleClick}>
      <WishListIcon
        color="stroke-primary"
        className={isWishlistPage ? "" : ""}
        active={isWishlistPage}
      />
    </button>
  );
}
