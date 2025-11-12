import DetailsListItem from "./detailsListItem";

type ItemAttribute = {
  id: number;
  itemId: number;
  attributeName: string;
  attributeValue: string;
};

export default function DetailsList({
  itemAttributes,
}: {
  itemAttributes: ItemAttribute[];
}) {
  const items = itemAttributes.map((attr) => ({
    name: attr.attributeName,
    value: attr.attributeValue,
  }));

  return (
    <div className="flex w-full flex-col flex-1 border-2 border-border rounded-xl">
      {items.map((item, index) => (
        <DetailsListItem
          key={index}
          name={item.name}
          value={item.value}
          className={`
        ${
          index % 2 === 0
            ? "bg-background-shade-light/50"
            : "bg-background-shade-dark"
        } 
        first:rounded-t-xl 
        last:rounded-b-xl
      `}
        />
      ))}
    </div>
  );
}
