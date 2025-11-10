import { ArrowIcon } from "@/public/svg"; // adjust the path if needed

type ArrowsProps = {
  currentItemIndex: number;
  imageNumber: number;
  setCurrentItemIndex: (index: number) => void;
  className?: string;
  itemInBetween?: React.ReactNode;
};

export default function ArrowButtons({
  currentItemIndex,
  imageNumber,
  setCurrentItemIndex,
  className,
  itemInBetween,
}: ArrowsProps) {
  return (
    <div className="flex items-center justify-between w-full relative ">
      <button
        className={`pointer-events-auto ${className}`}
        disabled={currentItemIndex === 0}
        onClick={() => setCurrentItemIndex(currentItemIndex - 1)}
      >
        <ArrowIcon
          disabled={currentItemIndex === 0}
          className={`rotate-180 h-6 w-6 sm:h-8 sm:w-8 ${
            currentItemIndex === 0 ? "cursor-default" : ""
          }`}
        />
      </button>
      <div className="relative w-full flex justify-center">{itemInBetween}</div>
      <button
        className="pointer-events-auto"
        disabled={currentItemIndex === imageNumber}
        onClick={() => setCurrentItemIndex(currentItemIndex + 1)}
      >
        <ArrowIcon
          disabled={currentItemIndex === imageNumber}
          className={`h-6 w-6 sm:h-8 sm:w-8 ${
            currentItemIndex === imageNumber ? "cursor-default" : ""
          }`}
        />
      </button>
    </div>
  );
}
