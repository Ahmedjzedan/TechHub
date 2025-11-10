import { Button } from "@/components/ui/button";
import NotificationComp from "@/components/ui/items/notification";
import { MouseIcon } from "@/public/svg";

export default function SecurityAndDevices() {
  return (
    <div className="flex flex-col relative">
      <div className="flex justify-center mt-4 font-bold text-lg">
        Security And Devices
      </div>
      <NotificationComp />
      <span className="ml-4 mt-4 font-bold">Login history</span>
      <div className="flex flex-col gap-4 m-4 overflow-y-auto h-50">
        <History data="A login from A32 Iraq Waist 2025/10/12 10:12PM" />
        <History data="A login from A32 Iraq Waist 2025/10/12 10:12PM" />
        <History data="A login from A32 Iraq Waist 2025/10/12 10:12PM" />
        <History data="A login from A32 Iraq Waist 2025/10/12 10:12PM" />
      </div>

      <span className="ml-4 mt-4 font-bold">Logged Devices</span>
      <div className="flex flex-wrap gap-4 m-4 h-100 overflow-y-auto">
        <Device name="Ahmed" lastTimeSeen="2025/10/12 10:12PM" />
        <Device name="Ali" lastTimeSeen="2025/10/12 12:12PM" />
        <Device name="Hassan" lastTimeSeen="2025/10/12 1:12PM" />
        <Device name="Hussein" lastTimeSeen="2025/10/12 4:12PM" />
        <Device name="Ahmed" lastTimeSeen="2025/10/12 10:12PM" />
        <Device name="Ali" lastTimeSeen="2025/10/12 12:12PM" />
        <Device name="Hassan" lastTimeSeen="2025/10/12 1:12PM" />
        <Device name="Hussein" lastTimeSeen="2025/10/12 4:12PM" />
        <Device name="Ahmed" lastTimeSeen="2025/10/12 10:12PM" />
        <Device name="Ali" lastTimeSeen="2025/10/12 12:12PM" />
        <Device name="Hassan" lastTimeSeen="2025/10/12 1:12PM" />
        <Device name="Hussein" lastTimeSeen="2025/10/12 4:12PM" />
        <Device name="Ahmed" lastTimeSeen="2025/10/12 10:12PM" />
        <Device name="Ali" lastTimeSeen="2025/10/12 12:12PM" />
        <Device name="Hassan" lastTimeSeen="2025/10/12 1:12PM" />
        <Device name="Hussein" lastTimeSeen="2025/10/12 4:12PM" />
        <Device name="Ahmed" lastTimeSeen="2025/10/12 10:12PM" />
        <Device name="Ali" lastTimeSeen="2025/10/12 12:12PM" />
        <Device name="Hassan" lastTimeSeen="2025/10/12 1:12PM" />
        <Device name="Hussein" lastTimeSeen="2025/10/12 4:12PM" />
      </div>
      <div className="flex m-4 gap-4">
        <Button variant={"outline"}>Log All Devices Out</Button>
        <Button>Activate 2FA</Button>
      </div>
    </div>
  );
}

function History({ data }: { data: string }) {
  return (
    <div className="flex items-center border-2 border-border hover:border-primary p-3 rounded-lg bg-background-shade-light">
      {data}
    </div>
  );
}

function Device({
  name,
  lastTimeSeen,
}: {
  name: string;
  lastTimeSeen: string;
}) {
  return (
    <div className="flex flex-col min-w-60 flex-1 gap-4 p-4 max-w-100 bg-background-shade-light border-2 border-border hover:border-primary transition-all duration-300 rounded-2xl ">
      <div className="flex min-h-20 justify-center items-center">
        <MouseIcon />
      </div>
      <div className="flex flex-1 flex-col">
        <span className="font-bold">{name}</span>
        <span className="text-text-body">last logged in {lastTimeSeen}</span>
      </div>
      <div>
        <Button>Log out</Button>
      </div>
    </div>
  );
}
