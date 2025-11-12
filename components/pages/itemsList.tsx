"use client";

import { useEffect, useState } from "react";
import {
  getItemsByCategory,
  getItemsByTag,
  getItemsByName,
  getItemsById,
  getItems,
} from "@/app/actions/actions";
import VerticalItem from "@/components/ui/items/verticalItem";
import { FullItem } from "@/app/actions/actions";

type DynamicItemsListProps = {
  sectionName?: string;
  searchBy: "category" | "tag" | "name" | "all";
  searchValue: string;
};

export default function ItemsList({
  sectionName,
  searchBy,
  searchValue,
}: DynamicItemsListProps) {
  const [items, setItems] = useState<FullItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 1. Add loading state

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true); // 2. Set loading to true at the start
      if (!searchValue) {
        setItems([]); // Clear items if search is empty
        setIsLoading(false); // Stop loading
        return;
      }

      console.log(`Fetching items by ${searchBy}: ${searchValue}`);
      let data: FullItem[] = [];

      if (searchBy === "category") {
        data = (await getItemsByCategory(searchValue)) as FullItem[];
      } else if (searchBy === "tag") {
        data = (await getItemsByTag(searchValue)) as FullItem[];
      } else if (searchBy === "name") {
        data = (await getItemsByName(searchValue)) as FullItem[];
      } else if (searchBy === "all") {
        data = (await getItems()) as FullItem[];
      }

      setItems(data);
      setIsLoading(false); // 3. Set loading to false after data is fetched
    };

    fetchItems();
  }, [searchBy, searchValue]);

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
          {/* 4. Add loading check */}
          {isLoading ? (
            <p>Loading...</p>
          ) : items.length > 0 ? ( // 5. Check items *after* loading
            items.map((item: FullItem) => (
              <VerticalItem
                id={item.id}
                key={item.id}
                itemDescription={
                  item.description || "No description available."
                }
                itemName={item.name}
                itemPrice={item.price}
                discount={item.discount || undefined}
                images={item.itemImages.map((image: ItemImage) =>
                  image.imageUrl.trimEnd()
                )}
              />
            ))
          ) : (
            // 6. This now only shows after loading is false
            <p>No items found for &quot;{searchValue}&quot;.</p>
          )}
        </ul>
      </div>
    </>
  );
}
