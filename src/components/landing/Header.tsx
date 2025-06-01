"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Logo from "../shared/Logo";
import { Button } from "../ui/button";

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
        "flex items-center justify-between px-10 py-4 mx-auto rounded-full sticky top-2 z-50 overflow-hidden transition-all duration-300 w-[100%]",
        scrolled
          ? "backdrop-blur-md bg-primary/10 border border-primary/40 w-[90%] md:w-[50%] z-[1000]"
          : ""
      )}
    >
      <Logo transparent width={40} height={40} className="shrink-0" />
      <div>
        <ul className="flex items-center gap-8">
          <li className="transition-all hover:underline hover:text-primary cursor-pointer">
            <a href="#features">Features</a>
          </li>
          <li className="transition-all hover:underline hover:text-primary cursor-pointer">
            <a href="#faqs">FAQs</a>
          </li>
        </ul>
      </div>
      <Button className="rounded-full px-8 py-2">Login</Button>
    </div>
  );
};

export default Header;
