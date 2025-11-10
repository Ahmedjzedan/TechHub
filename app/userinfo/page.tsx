import {
  TruckIcon,
  LocationIcon,
  PersonIcon,
  CreditCardIcon,
  WishListIcon,
  HeadSetIcon,
  ShieldIcon,
} from "@/public/svg";

export default function UserInfo() {
  return (
    <div className="flex flex-wrap justify-center ">
      <Card
        name="Security & Devices"
        description="Review your login history, manage connected devices, enable two-factor authentication, or sign out from all sessions for extra safety."
        Icon={<ShieldIcon />}
      />
      <Card
        name="Manage Payment Methods"
        description="Chose a payment method, edit your saved payment information or add new ones "
        Icon={<CreditCardIcon />}
      />
      <Card
        name="Profile & Settings"
        description="Manage your personal information, profile picture, and account details. Update your name, email, or password anytime."
        Icon={<PersonIcon />}
      />
      <Card
        name="Orders & Tracking"
        description="View your past orders, check current delivery statuses, and request returns or exchanges when needed."
        Icon={<TruckIcon />}
      />
      <Card
        name="Wishlist"
        description="Keep track of products you love. Save items for later or move them directly to your cart when you're ready to buy."
        Icon={<WishListIcon color="stroke-foreground" />}
      />
      <Card
        name="Support & Tickets"
        description="Get help with your orders, submit refund or issue requests, and contact customer support when things go wrong."
        Icon={<HeadSetIcon />}
      />
    </div>
  );
}

function Card({
  Icon,
  name,
  description,
}: {
  Icon: React.ReactNode;
  name: string;
  description: string;
}) {
  return (
    <div className="flex flex-col bg-background-shade-light flex-1 m-4 p-4 gap-4 min-w-70 sm:min-w-100 border-2 border-border hover:border-primary rounded-2xl transition-all duration-300">
      <div className="flex justify-between items-center w-full">
        <span className="font-bold">{name}</span>
        <div>{Icon}</div>
      </div>
      <span className="text-text-body">{description}</span>
    </div>
  );
}
