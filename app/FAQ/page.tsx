import Info from "@/components/ui/items/info";

export default function FAQ() {
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-center font-bold text-lg">
        Frequintly Asked Questions
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Info
          text="What products do you sell?"
          hiddenText="We offer laptops, desktops, accessories, and components from trusted brands, plus repair and upgrade services for most devices."
        />
        <Info text="Can I return or exchange a product?" hiddenText="Yes" />
      </div>
    </div>
  );
}
