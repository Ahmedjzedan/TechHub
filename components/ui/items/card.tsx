import Image from "next/image";

type cardProps = {
  heading: string;
  description: string;
};

export default function Card({ heading, description }: cardProps) {
  return (
    <div className="flex flex-col border-2 border-foreground rounded-lg p-4 max-w-80">
      <div className="flex">
        <Image src={""} alt="account" />
        <span className="text-md font-bold">{heading}</span>
      </div>
      <span className="text-sm text-text-secondary">{description}</span>
    </div>
  );
}
