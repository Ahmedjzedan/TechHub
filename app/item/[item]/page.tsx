"use client"; // 👈 Must be a Client Component to use hooks

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetItemByID, getItemsByCategory } from "@/app/actions/actions";
import PDP from "@/components/pages/pdp";

// This Item type is correct
type Imagetype = {
  id: number;
  itemId: number;
  imageUrl: string;
  displayOrder: number;
};

type Item = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  discount: number | null;
  itemImages: Imagetype[];
  itemAttributes: {
    id: number;
    itemId: number;
    attributeName: string;
    attributeValue: string;
  }[];
  brand: {
    id: number;
    name: string;
    logoUrl: string | null;
  } | null;
  category: {
    id: number;
    name: string;
    description: string | null;
  } | null;
  tags: {
    id: number;
    name: string;
  }[];
};

export default function ItemPDP() {
  const params = useParams();

  // --- FIX 1: The state should be 'Item | null' and start as 'null' ---
  const [itemData, setItemData] = useState<Item | null>(null);

  const item = Array.isArray(params.item) ? params.item[0] : params.item;

  useEffect(() => {
    const fetchItems = async () => {
      if (item) {
        console.log(`Fetching data for item: ${item}`);
        const data = (await GetItemByID(Number(item))) as Item; // GetItemByID returns Item | null
        setItemData(data);
        console.log(data);
      }
    };
    fetchItems();
  }, [item]);

  // --- FIX 2: Add a loading/null check before rendering ---
  if (!itemData) {
    return <div>Loading item...</div>; // Or a loading spinner
  }

  // If we get here, itemData is guaranteed to be an Item
  return (
    <div className="">
      <PDP
        key={itemData.id}
        itemName={itemData.name}
        itemAttributes={itemData.itemAttributes}
        itemDescription={String(itemData.description)}
        itemPrice={itemData.price}
        itemID={String(itemData.id)}
        itemImages={itemData.itemImages}
      />
    </div>
  );
}
