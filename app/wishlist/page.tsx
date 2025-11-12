"use client";

import { useEffect, useState } from "react";
import VerticalItem from "@/components/ui/items/verticalItem";
import { useSession } from "@/components/providers/sessionProvider";
import { GetWishListItems } from "@/app/actions/actions";
import { FullItem } from "@/app/actions/actions"; // 👈 1. Import FullItem

// ⛔️ Delete your old, incomplete 'Item' type definition
// type Item = { ... };

export default function WishlistItems() {
  // 2. Use FullItem for your state
  const [items, setItems] = useState<FullItem[]>([]);
  const { user } = useSession();

  const removeItem = (idToRemove: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== idToRemove)
    );
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        console.log("Fetching wishlist for user:", user.id);
        const data = (await GetWishListItems(user.id)) as FullItem[];
        setItems(data);
      }
    };

    fetchWishlist();
  }, [user]);

  // 4. Define the image type from FullItem
  type ItemImage = FullItem["itemImages"][0];

  return (
    <div className="flex flex-1 m-4">
      <ul className="flex flex-wrap gap-4">
        {items.length > 0 ? (
          items.map(
            (
              item: FullItem // 5. Use the FullItem type here
            ) => (
              <VerticalItem
                id={item.id}
                key={item.id}
                itemDescription={
                  item.description || "No description available."
                }
                itemName={item.name}
                itemPrice={item.price}
                discount={item.discount || undefined}
                removeItem={removeItem}
                images={item.itemImages.map(
                  (
                    image: ItemImage // 6. Use ItemImage here
                  ) => image.imageUrl.trimEnd()
                )}
              />
            )
          )
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </ul>
    </div>
  );
}
