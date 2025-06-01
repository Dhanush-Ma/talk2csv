import React from "react";
import Logo from "../shared/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary/20 text-white pt-20 relative overflow-hidden">
      <div className="container mx-auto pb-96 max-w-[70%] flex justify-between items-start gap-20">
        <div className="flex flex-col text-left gap-4">
          <Logo transparent width={64} height={64} />
          <div className="space-y-2">
            <p>talk2csv.com</p>
            <p className="text-muted-foreground mt-2">
              © {new Date().getFullYear()} talk2csv.com - All rights reserved.
            </p>
          </div>
        </div>
        <div className="flex flex-col text-left gap-4">
          <p className="text-lg">Legal</p>

          <div className="space-y-2">
            <Link
              href="/terms"
              className="block text-muted-foreground hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="block text-muted-foreground hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <h4 className="text-center text-[20vw] absolute bg-transparent -bottom-30 left-1/2 -translate-x-1/2 text-primary/40">
        talk2csv
      </h4>
    </footer>
  );
};

export default Footer;
