import Link from "next/link";

type CategoryItemProps = {
  icon: React.ReactNode;
  name: string;
  link: string;
};

export default function CatigoryItem({ icon, name, link }: CategoryItemProps) {
  return (
    <Link href={link}>
      <button className="flex flex-col text-sm justify-center items-center hover:text-primary transition-all duration-300">
        {icon}
        <span className="text-xs">{name}</span>
      </button>
    </Link>
  );
}
