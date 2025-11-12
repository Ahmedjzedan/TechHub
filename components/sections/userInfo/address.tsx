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

export default function Address() {
  return (
    <div className="flex flex-col gap-4 justify-start mt-8">
      <span className="text-md text-text-heading font-semibold">Address</span>
      <div className="flex items-end justify-between sm:justify-start gap-4">
        <Select>
          <SelectTrigger className="border-2 border-border max-w-32">
            <SelectValue placeholder="Addresses" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Addresses</SelectLabel>
              <SelectItem value="Address1">Address 1</SelectItem>
              <SelectItem value="Address2">Address 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-col">
          <Select>
            <SelectTrigger className="border-2 border-border">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>States</SelectLabel>
                <SelectItem value="Wasit">Wasit</SelectItem>
                <SelectItem value="State2">Baghdad</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-end flex-wrap gap-4">
        <LabledInput
          type=""
          name="herro"
          className="flex-2 min-w-64"
          label="Location address"
          placeholder="eg. 123 Main St"
        ></LabledInput>
      </div>
      <div className="flex gap-4 flex-wrap">
        <LabledInput
          type=""
          name="herro"
          className="flex-2 min-w-64"
          label="Nearest Landmark"
          placeholder="the great memorial"
        ></LabledInput>
        <LabledInput
          type=""
          name="herro"
          className="flex-2"
          label="Expiry Date"
          placeholder="eg. 12/30"
        ></LabledInput>
      </div>
    </div>
  );
}
