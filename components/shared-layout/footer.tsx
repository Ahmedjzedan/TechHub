import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <div className="border-b-2 border-border"></div>
      <div className="flex-col px-8 py-8 bg-background-shade-light">
        <div className="flex ml-5 w-full gap-16 mt-8 flex-wrap">
          <div>
            <div className="flex items-center  gap-2">
              <Image className="w-12 h-12" src={logo} alt="Logo" />
              <span className="text-lg">
                <span className="text-primary">Tech</span>
                <span className="text-accent">Hub</span>
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 grow text-text-secondary">
            <h3 className="font-semibold text-primary">Information</h3>
            <Link href="/FAQ">FAQ</Link>
            <Link href="/contactus">Contact us</Link>
          </div>
          <div className="flex flex-1 flex-col gap-1 grow text-text-secondary">
            <h3 className="font-semibold text-primary">Location</h3>
            <Link href="/location/baghdad">Baghdad</Link>
            <Link href="/location/wasit">Wasit</Link>
            <Link href="/location/basara">Basara</Link>
          </div>
          <div className="flex flex-1 flex-col gap-1 grow text-text-secondary">
            <h3 className="font-semibold text-primary">Support</h3>
            <Link href="/shipping">Shipping & Delivery</Link>
            <Link href="/returnpolicy">Return & Exchange</Link>
          </div>
          <div className="flex flex-1 flex-col gap-1 grow text-text-secondary">
            <h3 className="font-semibold text-primary">Legal</h3>
            <Link href="/termsandconditions">Terms And Conditions</Link>
            <Link href="/privacypolicy">Privacy policy</Link>
          </div>
          <div className="flex flex-1 flex-col gap-1 grow text-text-secondary">
            <h3 className="font-semibold text-primary">Contact</h3>
            <span>support@techhub.com</span>
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex flex-1 flex-col gap-1 grow text-text-secondary">
            <h3 className="font-semibold text-primary">Social Media</h3>
            <Link href="/facebook">Facebook</Link>
            <Link href="/twitter">Twitter</Link>
            <Link href="/instagram">Instagram</Link>
          </div>
        </div>

        <div className="mt-8 text-text-subtle text-xs">
          © 2024 TechHub. All rights reserved.
        </div>
      </div>
    </div>
  );
}
