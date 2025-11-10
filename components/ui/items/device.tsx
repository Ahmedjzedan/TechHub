import { Button } from "../button";

type DeviceProps = {
  heading: string;
  lastLoggedIn: string;
};

export default function Device({ heading, lastLoggedIn }: DeviceProps) {
  return (
    <div className="flex flex-col p-4 border-border border-2 bg-background-shade-light rounded-lg max-w-50 hover:border-primary transition-all duration-200">
      <div className="justify-self-center items-center max-w-40 max-h-60"></div>
      <div className="text-md font-bold">{heading}</div>
      <div className="text-sm text-text-secondary">
        Last time logged in was in {lastLoggedIn}
      </div>
      <div className="mt-4">
        <Button variant={"outline"}>Logout</Button>
      </div>
    </div>
  );
}
