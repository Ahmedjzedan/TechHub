import Image from "next/image";
import {
  DeskTopIcon,
  LaptopIcon,
  MouseIcon,
  KeyboardIcon,
  CableIcon,
  ChairIcon,
} from "@/public/svg";
import CatigoryItem from "@/components/ui/elements/catigoryItem";

export default function Catigories({ className }: { className: string }) {
  return (
    <div
      className={`flex flex-wrap justify-center items-end mt-4 gap-4 text-secondary ${className}`}
    >
      <CatigoryItem
        link="/category/laptops"
        name="Laptop"
        icon={<LaptopIcon />}
      />
      <CatigoryItem
        link="/category/peripherals"
        name="Peripherals"
        icon={
          <div className="flex items-end">
            <MouseIcon className="w-4 h-4 rotate-10" />
            <KeyboardIcon />
          </div>
        }
      />
      <CatigoryItem
        link="/category/accessories"
        name="Accessories"
        icon={<CableIcon className="" />}
      />
      <CatigoryItem
        link="/category/furniture"
        name="Furniture"
        icon={<ChairIcon />}
      />
    </div>
  );
}
