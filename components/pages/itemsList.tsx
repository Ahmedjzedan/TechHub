"use client";

import { useEffect, useState } from "react";
import {
  getItemsByCategory,
  getItemsByTag,
  getItemsByName,
} from "@/app/actions/actions";
import VerticalItem from "@/components/ui/items/verticalItem";

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
};

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
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!searchValue) return;

      console.log(`Fetching items by ${searchBy}: ${searchValue}`);
      let data: Item[] = [];

      // Call the correct action based on the 'searchBy' prop
      if (searchBy === "category") {
        data = (await getItemsByCategory(searchValue)) as Item[];
      } else if (searchBy === "tag") {
        data = (await getItemsByTag(searchValue)) as Item[];
      } else if (searchBy === "name") {
        data = (await getItemsByName(searchValue)) as Item[];
      }

      setItems(data);
    };

    fetchItems();
  }, [searchBy, searchValue]);

  return (
    <>
      {sectionName && (
        <h2 className="w-full text-center mt-4 text-2xl font-bold">
          {sectionName}
        </h2>
      )}
      <div className="flex flex-1 m-4">
        <ul className="flex flex-wrap gap-4">
          {items.length > 0 ? (
            items.map((item: any) => (
              <VerticalItem
                id={item.id}
                key={item.id}
                itemDescription={
                  item.description || "No description available."
                }
                itemName={item.name}
                itemPrice={item.price}
                discount={item.discount || undefined}
                images={item.itemImages.map((image: any) =>
                  image.imageUrl.trimEnd()
                )}
              />
            ))
          ) : (
            <p>No items found for "{searchValue}".</p>
          )}
        </ul>
      </div>
    </>
  );
}
