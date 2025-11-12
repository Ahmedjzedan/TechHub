"use client";

import { useEffect, useState } from "react";
import {
  getItemsByCategory,
  getItemsByTag,
  getItemsByName,
} from "@/app/actions/actions";
import VerticalItem from "@/components/ui/items/verticalItem";
import { FullItem } from "@/app/actions/actions";

type DynamicItemsListProps = {
  sectionName?: string;
  searchBy: "category" | "tag" | "name";
  searchValue: string;
};

export default function ItemsList({
  sectionName,
  searchBy,
  searchValue,
}: DynamicItemsListProps) {
  // 2. Use FullItem for your state
  const [items, setItems] = useState<FullItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!searchValue) return;

      console.log(`Fetching items by ${searchBy}: ${searchValue}`);
      let data: FullItem[] = []; // 3. Use FullItem here

      // Call the correct action based on the 'searchBy' prop
      if (searchBy === "category") {
        data = (await getItemsByCategory(searchValue)) as FullItem[]; // 4. Cast to FullItem[]
      } else if (searchBy === "tag") {
        data = (await getItemsByTag(searchValue)) as FullItem[];
      } else if (searchBy === "name") {
        data = (await getItemsByName(searchValue)) as FullItem[];
      }

      setItems(data);
    };

    fetchItems();
  }, [searchBy, searchValue]);

  // 5. Define the image type from FullItem
  type ItemImage = FullItem["itemImages"][0];

  return (
    <>
      {sectionName && (
        <h2 className="w-full text-center mt-4 text-2xl font-bold">
          {sectionName}
        </h2>
      )}
      <div className="flex justify-center flex-1 m-4">
        <ul className="flex flex-wrap gap-4">
          {items.length > 0 ? (
            items.map(
              (
                item: FullItem // 6. Use FullItem type
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
                  images={item.itemImages.map(
                    (
                      image: ItemImage // 7. Use ItemImage type
                    ) => image.imageUrl.trimEnd()
                  )}
                />
              )
            )
          ) : (
            <p>No items found for &quot;{searchValue}&quot;.</p>
          )}
        </ul>
      </div>
    </>
  );
}
