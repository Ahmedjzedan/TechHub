import ItemDisplay from "./components/itemDisplay";
import DetailsList from "./components/detailsList";
import Reviews from "./components/reviews";
import Description from "./components/description";
import { Button } from "@/components/ui/button";

type Imagetype = {
  id: number;
  itemId: number;
  imageUrl: string;
  displayOrder: number;
};

type ItemAttributes = {
  id: number;
  itemId: number;
  attributeName: string;
  attributeValue: string;
};

type PDPprops = {
  itemName: string;
  itemAttributes: ItemAttributes[];
  itemDescription: string;
  itemImages: Imagetype[];
  itemPrice: number;
  itemID: string;
};

export default function PDP({
  itemDescription,
  itemAttributes,
  itemImages,
  itemID,
  itemPrice,
  itemName,
}: PDPprops) {
  console.log(itemAttributes);
  return (
    <>
      <h2 className="sm:hidden text-primary text-2xl font-bold text-center mt-4">
        {itemName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 m-4">
        <div className="col-start-1 col-span-2 flex w-full h-full max-h-100">
          <ItemDisplay
            images={itemImages.map((element) => {
              return element.imageUrl;
            })}
          />
        </div>
        <div className="sm:block sm:col-span-2 hidden m-4">
          <h2 className="text-2xl font-bold text-primary">{itemName}</h2>
          <Description description={itemDescription} />
        </div>
        <div className="sm:row-start-1 sm:col-start-3 w-full">
          <DetailsList itemAttributes={itemAttributes} />
        </div>
        <div className="row-start-4 sm:hidden">
          <Description description={itemDescription} />
        </div>

        <div className="row-start-5 sm:row-auto sm:col-start-1 ml-4">
          <Button>Add To Cart</Button>
        </div>
        {/* <div className="sm:col-span-3 sm:col-start-1">
          <Reviews />
        </div> */}
      </div>
    </>
  );
}
