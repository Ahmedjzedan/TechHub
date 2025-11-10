"use client";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Button } from "./button";
import SidebarGroupElement from "./sidebarGroupElement";
// import Link from "next/link"; // We still don't need this
import { useTheme } from "next-themes";
import {
  SupportIcon,
  HomeIcon,
  CartIcon,
  TermsIcon,
  AccountIcon,
  CategoryIcon,
  Shevron,
  PhoneIcon,
  TelegramIcon,
  InstgramIcon,
  FacebookIcon,
} from "@/public/svg";
import { ShoppingCartIcon } from "lucide-react";
import MediaLink from "./mediaLink";
import SidebarButtonLink from "@/components/ui/buttons/sidebarButtonLink";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "../providers/sessionProvider";
import { logoutAction } from "@/app/auth/actions";
import { getCategories } from "@/app/actions/actions";
import { InferSelectModel } from "drizzle-orm";
import { categories } from "@/db/schema";

interface ISidebarContext {
  setIsActive: (isActive: boolean) => void;
}
type Category = InferSelectModel<typeof categories>;

const SidebarContext = createContext<ISidebarContext | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarContent provider");
  }
  return context;
};

interface SidebarProps {
  setIsActive: (isActive: boolean) => void;
}

export default function SidebarContent({ setIsActive }: SidebarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const session = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const data = await getCategories();
      console.log(data);
      setCategories(data);
      setIsLoading(false);
    }
    fetchItems();
  }, []);

  return (
    <SidebarContext.Provider value={{ setIsActive }}>
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-between items-center px-4 pt-4">
          <div className="flex items-center gap-2">
            <Image className="w-8 h-8" src={logo} alt="Logo" />
            <span className="text-lg">
              <span className="text-primary">Tech</span>
              <span className="text-accent">Hub</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsActive(false)}
              className="text-2xl text-text-subtle hover:bg-background-shade-light px-2 rounded-2xl"
            >
              x
            </button>
          </div>
        </div>
        {/* All the children inside the provider can now access the context */}
        <div className="flex flex-col gap-2 mt-8 flex-grow">
          <SidebarGroupElement
            name="Categories"
            Icon={<CategoryIcon className="w-5 h-5" />}
          >
            {categories.map((element) => (
              <SidebarButtonLink
                key={element.id}
                href={"/category/" + element.name}
              >
                {element.name}
              </SidebarButtonLink>
            ))}
          </SidebarGroupElement>
          <SidebarGroupElement
            name="Shop"
            Icon={<ShoppingCartIcon className="w-5 h-5" />}
          >
            <SidebarButtonLink href="/cart"> Cart </SidebarButtonLink>
            <SidebarButtonLink auth={true} href="/wishlist">
              {" "}
              Wishlist{" "}
            </SidebarButtonLink>
            <SidebarButtonLink href="/orders"> Orders </SidebarButtonLink>
          </SidebarGroupElement>
          <SidebarGroupElement
            name="Account"
            Icon={<AccountIcon className="w-5 h-5" />}
          >
            <SidebarButtonLink href="/signin">
              Login / Sign In
            </SidebarButtonLink>
            <SidebarButtonLink href="/userinfo">
              User Info & Settings
            </SidebarButtonLink>
          </SidebarGroupElement>

          <SidebarGroupElement
            name="Support"
            Icon={<SupportIcon className="w-5 h-5" />}
          >
            <SidebarButtonLink href="FAQ"> FAQ </SidebarButtonLink>
            <SidebarButtonLink href="contactus"> Contact Us </SidebarButtonLink>
          </SidebarGroupElement>
          <SidebarGroupElement
            name="Policies"
            Icon={<TermsIcon className="w-5 h-5" />}
          >
            <SidebarButtonLink href="termsandconditions">
              Terms & Conditions
            </SidebarButtonLink>
            <SidebarButtonLink href="privacypolicy">
              Privacy Policy
            </SidebarButtonLink>
            <SidebarButtonLink href="returnpolicy">
              Return Policy
            </SidebarButtonLink>
            <SidebarButtonLink href="shipping"> Shipping </SidebarButtonLink>
          </SidebarGroupElement>
        </div>
        <div className="mx-auto mt-4">
          <Button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            Switch theme
          </Button>
        </div>
        <div className="flex justify-between items-center mx-4 mt-4 ">
          {!!session.user ? (
            <form action={logoutAction}>
              <Button type="submit">Log out</Button>
            </form>
          ) : (
            <Button
              onClick={() => {
                setIsActive(false);
                router.push("/signin");
              }}
            >
              Sign In
            </Button>
          )}
          <span>1.0V</span>
        </div>
        <div className="my-8 flex gap-2 justify-center">
          <MediaLink
            text={"07824770076"}
            icon={<PhoneIcon className="h-4 w-4" />}
          />
          <MediaLink
            text={"Telegram"}
            icon={<TelegramIcon className="h-4 w-4" />}
          />
          <MediaLink
            text={"Instgram"}
            icon={<InstgramIcon className="h-4 w-4" />}
          />
          <MediaLink
            text={"Facebook"}
            icon={<FacebookIcon className="h-4 w-4" />}
          />
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
