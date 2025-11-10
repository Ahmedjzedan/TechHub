"use client"; // This page needs useParams, so it must be a client component

import { useParams } from "next/navigation";
import ItemsList from "@/components/pages/itemsList";

export default function TagPage() {
  const params = useParams();

  // Get the category name from the URL
  const tagName = Array.isArray(params.tag)
    ? params.tag[0]
    : (params.tag as string);

  return (
    <ItemsList
      sectionName={tagName} // Pass the name as the optional title
      searchBy="tag" // Tell the component to search by category
      searchValue={tagName} // Pass the category name as the value to search for
    />
  );
}
