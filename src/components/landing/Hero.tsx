"use client";

import { Safari } from "../magicui/safari";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "../magicui/shimmer-button";
import { Geist } from "next/font/google";
import { RetroGrid } from "../magicui/retro-grid";
import { motion } from "motion/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0, z: 0 }}
      initial={{ opacity: 0, y: 50, z: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="mx-auto flex items-center justify-center flex-col gap-4 text-center pt-30">
        <div className="relative mt-20">
          <h1 className="text-6xl font-semibold">Talk to your CSV. </h1>
          <h2 className="text-5xl font-semibold text-primary mt-2">
            Get answers from your data instantly.
          </h2>
        </div>

        <p className={cn(geistSans.className, "text-2xl")}>
          No more endless scrolling through spreadsheets. Just ask your data.
        </p>
        <ShimmerButton
          className="bg-primary text-xl my-6 z-10 "
          shimmerColor="#FFFFFF"
          background="#6366f1"
        >
          <p className="text-primary-foreground">Try it for free</p>
        </ShimmerButton>
        <RetroGrid
          className="z-0"
          cellSize={20}
          darkLineColor="#6366f1"
          lightLineColor="#6366f1"
        />
      </div>
      <div className="w-full h-[640px] rounded-lg bg-linear-45 from-primary/30 to-primary/40 mt-20 z-[10000] flex justify-center items-center relative mb-60">
        <Safari
          url="talk2csv.com"
          className="w-[80%] z-50 absolute top-20"
          imageSrc="https://cdn.dribbble.com/userupload/16744137/file/original-ddf6650ad6b5c360f3eb7678178b614c.png?resize=1024x768&vertical=center"
          mode="simple"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
