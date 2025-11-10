"use client";

import { useState } from "react";

export default function Description({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-sm text-text-heading font-bold">Description</h1>
      <button
        className="text-start cursor-default mt-2"
        onClick={toggleDescription}
      >
        <span
          className={`text-sm text-text-secondary line-clamp-4 ${
            isExpanded ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          {description}
        </span>
      </button>
    </div>
  );
}
