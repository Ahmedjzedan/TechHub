"use client";

import logo from "@/public/logo.svg";
import menu from "@/public/menu.svg";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import Sidebar from "@/components/shared-layout/sidebar";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartIcon, PersonIcon } from "@/public/svg";
import { useSession } from "../providers/sessionProvider";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [search, setSearch] = useState("");
  const session = useSession();

  useEffect(() => {
    setMounted(true);
    if (sidebarActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [sidebarActive]);
  const router = useRouter();
  return (
    <div>
      <AnimatePresence>
        {sidebarActive && mounted && <Sidebar setIsActive={setSidebarActive} />}
      </AnimatePresence>
      <div className="flex justify-between p-4 bg-background-shade-light">
        <div className="flex items-center gap-4 md:gap-8 flex-grow">
          <button
            className="cursor-pointer"
            onClick={() => setSidebarActive(true)}
          >
            <Image className="w-8 h-8" src={menu} alt="Menu" />
          </button>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image className="w-8 h-8" src={logo} alt="Logo" />
            <span className="text-lg">
              <span className="text-primary">Tech</span>
              <span className="text-accent">Hub</span>
            </span>
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // 1. Stop the page reload
            router.push("/search/" + search); // 2. 'search' must be a state variable
          }}
          className="flex-grow hidden sm:flex"
        >
          <Input
            name="search"
            placeholder="Search..."
            value={search} // 3. Add value
            onChange={(e) => setSearch(e.target.value)} // 4. Add onChange
            className="border-border focus:border-primary rounded-2xl border-2 w-full text-xs h-8 md:text-xs
    dark:bg-background-shade-dark bg-background-shade-dark"
          />
        </form>
        <div className="flex-grow sm:hidden flex"></div>
        <div className="flex justify-end items-center gap-4 flex-grow">
          {!!session.user ? (
            <Link href={"/userinfo"}>
              <PersonIcon color="fill-primary" className="h-8 w-8" />
            </Link>
          ) : (
            <>
              <Button
                onClick={() => router.push("/signin")}
                className="text-sm h-8 w-16"
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  router.replace("/");
                  router.push("/signup");
                }}
                variant={"outline"}
                className="text-sm hidden sm:inline-flex h-8 w-16"
              >
                Sign Up
              </Button>
            </>
          )}
          <button
            onClick={() => {
              router.replace("/");
              router.push("/cart");
            }}
            className="text-sm h-8 w-8"
          >
            <CartIcon color="fill-primary" />
          </button>
        </div>
      </div>
      <div className="border-b-2 border-border"></div>
    </div>
  );
}
