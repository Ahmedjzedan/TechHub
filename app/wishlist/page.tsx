"use client";

import { useEffect, useState } from "react";
import VerticalItem from "@/components/ui/items/verticalItem";
import { useSession } from "@/components/providers/sessionProvider"; // Make sure this path is correct
import { GetWishListItems } from "@/app/actions/actions"; // Your server action

// Define the Item type
type Item = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  discount: number | null;
  itemImages: {
    id: number;
    imageUrl: string;
    displayOrder: number | null;
  }[];
  // ... other item properties
};

export default function WishlistItems() {
  const [items, setItems] = useState<Item[]>([]);
  const { user } = useSession(); // Get the user from your provider

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        console.log("Fetching wishlist for user:", user.id);
        const data = (await GetWishListItems(user.id)) as Item[];
        setItems(data);
      }
    };

    fetchWishlist();
  }, [user]); // Re-run this when the user logs in

  // --- 1. HERE IS YOUR removeItem FUNCTION ---
  // This function takes an ID and updates the state, removing the item.
  const removeItem = (idToRemove: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== idToRemove)
    );
  };
  // --- END OF FUNCTION ---

  return (
    <div className="flex flex-1 m-4">
      <ul className="flex flex-wrap gap-4">
        {items.length > 0 ? (
          items.map(
            (
              item: any // Using 'any' to avoid type conflicts for now
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
                images={item.itemImages.map((image: any) =>
                  image.imageUrl.trimEnd()
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
