import { MouseIcon } from "@/public/svg";

type reviewElementProps = {
  className: string;
  name: string;
  review: string;
  rating: string;
};

export default function ReviewElement({
  className,
  name,
  review,
  rating,
}: reviewElementProps) {
  return (
    <div className={`${className} flex items-center gap-4 p-4 rounded-4xl`}>
      <div className="bg-white rounded-4xl p-4"></div>

      <div className="flex items-center gap-8 flex-1 min-w-0 ">
        <div className="font-bold text-text-heading flex-shrink-0">{name}</div>
        <span className="text-text-body text-sm break-words line-clamp-none">
          {review}
        </span>
      </div>
    </div>
  );
}
