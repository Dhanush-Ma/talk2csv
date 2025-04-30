"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { InteractiveGridPattern } from "../magicui/interactive-grid-pattern";
import Copyright from "./Copyright";

type AuthUiWrapperProps = {
  children: React.ReactNode;
};

const AuthUiWrapper = ({ children }: AuthUiWrapperProps) => {
  return (
    <div className="relative h-dvh w-dvw overflow-hidden flex flex-col items-center justify-center">
      <InteractiveGridPattern
        squares={[48, 48]}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "h-full w-full skew-y-12"
        )}
      />
      <div className="z-100 bg-background rounded-lg w-max h-max border shadow-md">
        {children}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center w-full">
        <Copyright />
      </div>
    </div>
  );
};

export default AuthUiWrapper;
