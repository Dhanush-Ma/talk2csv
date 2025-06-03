import { AppConfig } from "@/lib/config";
import Link from "next/link";
import React from "react";

const Copyright = () => {
  return (
    <div>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} {AppConfig.name}. All rights reserved.
      </p>
      <Link href="/privacy" className="text-sm text-primary">
        Privacy Policy
      </Link>
      <span className="mx-2 font-extralight">|</span>
      <Link href="/terms" className="text-sm text-primary">
        Terms of Service
      </Link>
    </div>
  );
};

export default Copyright;
