import Link from "next/link";

interface MediaLinkProps {
  text: string;
  icon: React.ReactNode;
}

export default function MediaLink({ text, icon }: MediaLinkProps) {
  return (
    <div className="flex gap-0 items-center">
      <div className="flex bg-background-shade-light items-center justify-center rounded-2xl p-2 mr-2 ">
        <Link href={"#"}>{icon}</Link>
      </div>
    </div>
  );
}
