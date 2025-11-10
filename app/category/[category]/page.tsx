"use client"; // This page needs useParams, so it must be a client component

import { useParams } from "next/navigation";
import ItemsList from "@/components/pages/itemsList";

export default function CategoryPage() {
  const params = useParams();

  // Get the category name from the URL
  const categoryName = Array.isArray(params.category)
    ? params.category[0]
    : (params.category as string);

  return (
    <ItemsList
      sectionName={categoryName} // Pass the name as the optional title
      searchBy="category" // Tell the component to search by category
      searchValue={categoryName} // Pass the category name as the value to search for
    />
  );
}
