import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LabledInput } from "@/components/ui/labeledInput";

export default function CreditCard() {
  return (
    <div className="flex flex-col gap-4 justify-center mt-4">
      <span className="text-md text-text-heading font-semibold">
        Card Details
      </span>
      <div className="">
        <Select>
          <SelectTrigger className="border-2 border-border">
            <SelectValue placeholder="Cards" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cards</SelectLabel>
              <SelectItem value="Card1">Card 1</SelectItem>
              <SelectItem value="Card2">Card 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4 flex-wrap">
        <LabledInput
          name="chongching"
          type=""
          className="flex-1 min-w-64"
          label=" Card Holdername"
          placeholder="As printed on the card"
        ></LabledInput>
        <LabledInput
          name="chongching"
          type=""
          className="flex-2 min-w-64"
          label="Card Number"
          placeholder="eg. 4242-4242-4242-4242"
        ></LabledInput>
      </div>
      <div className="flex gap-4">
        <LabledInput
          name="chongching"
          type=""
          className="flex-2"
          label="CVC"
          placeholder="eg. 123"
        ></LabledInput>
        <LabledInput
          name="chongching"
          type=""
          className="flex-2"
          label="Expiry Date"
          placeholder="eg. 12/30"
        ></LabledInput>
      </div>
    </div>
  );
}
