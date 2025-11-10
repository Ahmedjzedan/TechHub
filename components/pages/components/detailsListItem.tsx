type DetailsListItemProps = {
  name: string;
  value: string;
  className?: string;
};

export default function DetailsListItem({
  name,
  value,
  className,
}: DetailsListItemProps) {
  return (
    <div
      className={`grid grid-cols-[1fr_3fr] justify-between items-center gap-4 p-3 ${className}`}
    >
      <span className="text-primary  font-bold">{name}</span>
      <span className="">{value}</span>
    </div>
  );
}
