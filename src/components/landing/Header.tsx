"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Logo from "../shared/Logo";
import { buttonVariants } from "../ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center justify-between py-4 mx-auto sticky top-2 overflow-hidden transition-all duration-300 w-[100%] z-[1000]",
        {
          "backdrop-blur-md bg-primary/10 border border-primary/40 w-full lg:w-[50%] px-10 rounded-full":
            scrolled,
        }
      )}
    >
      <Logo transparent width={40} height={40} className="shrink-0" />
      <div className="hidden md:flex">
        <ul className="flex items-center gap-8">
          <li className="transition-all hover:underline hover:text-primary cursor-pointer">
            <a href="#features">Features</a>
          </li>
          <li className="transition-all hover:underline hover:text-primary cursor-pointer">
            <a href="#faqs">FAQs</a>
          </li>
        </ul>
      </div>
      <a
        href="/signup"
        className={cn(buttonVariants(), "rounded-full px- py-2")}
      >
        Upload my CSV
      </a>
    </div>
  );
};

export default Header;
