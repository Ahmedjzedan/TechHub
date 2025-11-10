"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type AuthButton = {
  pressed?: boolean;
  text: string;
  href: string;
};

export default function AuthButton({ text, pressed, href }: AuthButton) {
  const router = useRouter();

  const always =
    "p-3 bg-background-shade-light w-25 text-primary rounded-xs text-center";
  const unPressedStyle = "shadow-[0_0_10px_0px_#000000] " + always;
  const PressedStyle = "shadow-[inset_0_0_20px_0px_#000000] " + always;
  return (
    <button
      onClick={() => router.replace(`${href}`)}
      className={pressed ? PressedStyle : unPressedStyle}
    >
      {text}
    </button>
  );
}
