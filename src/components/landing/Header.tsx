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
        "flex items-center justify-between  py-4 mx-auto rounded-full sticky top-2 z-50 overflow-hidden transition-all duration-300 w-[100%]",
        {
          "backdrop-blur-md bg-primary/10 border border-primary/40 w-[90%] md:w-[50%] z-[1000] px-10":
            scrolled,
        }
      )}
    >
      <Logo transparent width={40} height={40} className="shrink-0" />
      <div className="">
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
