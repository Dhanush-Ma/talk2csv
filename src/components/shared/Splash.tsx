"use client";
import React from "react";
import Logo from "./Logo";

const Splash = () => {
  return (
    <div className="flex flex-col h-dvh w-dvw items-center justify-center gap-y-8">
      <Logo />
      <div className="h-1.5 min-w-sm max-w-lg bg-primary/20 overflow-hidden rounded-md">
        <div className="progress w-full h-full bg-primary left-right"></div>
      </div>
    </div>
  );
};

export default Splash;
