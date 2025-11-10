import VerticalItem from "@/components/ui/items/verticalItem";
import XPSFront from "@/public/images/xpsFront.png";
import XPSAngle from "@/public/images/XPSAngle.png";
import XPSAngleLeft from "@/public/images/XPSAngleLeft.png";
import XPSAngleRight from "@/public/images/XPSAngleRight.png";
import XPSUpToDown from "@/public/images/XPSUpToDown.png";
import HorizontalItem from "@/components/ui/items/horizontalItem";
import { StaticImageData } from "next/image";

type itemsProps = {
  sectionName: string | undefined;
  items: React.ReactNode[];
};

{
  /* Items example
  items = [
{
  name:"laptop",
  description: "etc",
  itemPrice: "xx",
  images:[
    XPSFront,
    XPSAngle,
    XPSAngleLeft,
    XPSAngleRight,
    XPSUpToDown,
    ]
  discount: 0
}
  ]
  */
}
export default function Items({ sectionName, items }: itemsProps) {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4 p-4">
      <div className=" text-lg font-bold ">{sectionName}</div>
      <div className="flex gap-4 flex-wrap">{items}</div>
    </div>
  );
}
