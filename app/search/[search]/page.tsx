"use client";

import ItemsList from "@/components/pages/itemsList";
import { useParams } from "next/navigation";

export default function Search() {
  const params = useParams();
  const searchParam = params.search;

  const search = Array.isArray(searchParam)
    ? searchParam[0]
    : searchParam || "";

  return (
    <ItemsList sectionName={"Result"} searchBy="name" searchValue={search} />
  );
}
