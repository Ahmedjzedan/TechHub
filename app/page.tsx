"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  return <div className="">hello hello</div>;
}
