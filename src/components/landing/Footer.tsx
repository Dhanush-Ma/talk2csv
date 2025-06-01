import React from "react";
import Logo from "../shared/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary/20 pt-10 lg:pt-20 relative overflow-hidden">
      <div className="container mx-auto pb-[30vw] max-w-[70%] flex flex-col lg:flex-row justify-between items-start gap-x-20 gap-y-10">
        <div className="flex flex-col text-center lg:text-left gap-4 items-center lg:items-start mx-auto">
          <Logo transparent width={64} height={64} />
          <div className="space-y-2">
            <p>talk2csv.com</p>
            <p className="text-muted-foreground mt-2">
              © {new Date().getFullYear()} talk2csv.com - All rights reserved.
            </p>
          </div>
        </div>
        <div className="flex flex-col text-center lg:text-left gap-4 items-center lg:items-start mx-auto">
          <p className="text-lg">Legal</p>
          <div className="space-y-2">
            <Link
              href="/terms"
              className="block text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="block text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-[3vw] left-1/2 -translate-x-1/2 flex items-center overflow-hidden">
        <h4
          className="text-[20vw] leading-[1] bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 
                bg-clip-text text-transparent select-none pointer-events-none"
        >
          talk2csv
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
