import ItemDisplay from "./components/itemDisplay";
import DetailsList from "./components/detailsList";
import Reviews from "./components/reviews";
import Description from "./components/description";
import { Button } from "@/components/ui/button";
import { useSession } from "../providers/sessionProvider";
import { AddToCart } from "@/app/actions/actions";

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
  const session = useSession();
  const user = session.user;
  return (
    <>
      <h2 className="md:hidden text-primary text-2xl font-bold text-center mt-4">
        {itemName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-y-8 m-4">
        <div className="col-start-1 col-span-2 flex w-full h-full max-h-100">
          <ItemDisplay
            images={itemImages.map((element) => {
              return element.imageUrl;
            })}
          />
        </div>
        <div className="md:block md:col-span-2 hidden m-4">
          <h2 className="text-2xl font-bold text-primary">{itemName}</h2>
          <Description description={itemDescription} />
        </div>
        <div className="md:row-start-1 md:col-start-3 w-full">
          <DetailsList itemAttributes={itemAttributes} />
        </div>
        <div className="row-start-4 md:hidden">
          <Description description={itemDescription} />
        </div>
        <div className="row-start-5 md:row-start-3 md:ml-4 text-primary font-bold text-2xl my-4">
          ${itemPrice}
        </div>
        <div className="row-start-6 md:row-auto md:col-start-1 md:ml-4 md:mb-8">
          <Button
            onClick={() => {
              if (user) {
                AddToCart(user.id, Number(itemID));
              } else {
                const localCartJson = localStorage.getItem("cartItems");
                const cart: number[] = localCartJson
                  ? JSON.parse(localCartJson)
                  : [];
                if (!cart.includes(Number(itemID))) {
                  cart.push(Number(itemID));
                }
                localStorage.setItem("cartItems", JSON.stringify(cart));
              }
            }}
            className="w-30"
          >
            Add to cart
          </Button>
        </div>
        {/* <div className="sm:col-span-3 sm:col-start-1">
          <Reviews />
        </div> */}
      </div>
    </>
  );
}
