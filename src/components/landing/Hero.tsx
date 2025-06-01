"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { RetroGrid } from "../magicui/retro-grid";
import { Safari } from "../magicui/safari";
import { ShimmerButton } from "../magicui/shimmer-button";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Iphone15Pro from "../magicui/iphone-15-pro";

const mockups = [
  "https://cdn.dribbble.com/userupload/16744137/file/original-ddf6650ad6b5c360f3eb7678178b614c.png?resize=1024x768&vertical=center",
  "https://cdn.dribbble.com/userupload/13312688/file/original-d92951d609a9587a8506d0554c5026e2.png?resize=1024x768&vertical=center",
];

const Hero = () => {
  const [mockupIndex, setMockupIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setMockupIndex((prevIndex) => (prevIndex + 1) % mockups.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, z: 0 }}
      initial={{ opacity: 0, y: 50, z: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="mx-auto flex items-center justify-center flex-col gap-4 text-center pt-3 lg:pt-30">
        <div className="relative mt-20">
          <h1 className="text-4xl md:text-6xl font-semibold">
            Talk to your CSV.
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold text-primary mt-2">
            Get answers from your data instantly.
          </h2>
        </div>

        <p className={cn("text-2xl")}>
          No more endless scrolling through spreadsheets. Just ask your data.
        </p>
        <a href="/signup">
          <ShimmerButton
            className="bg-primary text-xl my-6 z-10 "
            shimmerColor="#FFFFFF"
            background="#6366f1"
          >
            <p className="text-primary-foreground">Try it for free</p>
          </ShimmerButton>
        </a>
        <RetroGrid
          className="z-0"
          cellSize={20}
          darkLineColor="#6366f1"
          lightLineColor="#6366f1"
        />
      </div>
      <div className="relative z-[9999] w-full h-max py-20 px-10 rounded-lg bg-gradient-to-br from-primary/30 to-primary/40 flex flex-col items-center justify-center gap-y-12 mt-20">
        <div className="flex items-center justify-center relative gap-8">
          {Array.from({ length: mockups.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setMockupIndex(index)}
              className={cn(
                "w-4 h-4 rounded-full bg-primary-foreground cursor-pointer",
                {
                  "bg-primary border border-primary-foreground":
                    index === mockupIndex,
                  "bg-primary/50": index !== mockupIndex,
                }
              )}
            />
          ))}
        </div>
        {isMobile ? (
          <Iphone15Pro className="size-full" src={mockups[mockupIndex]} />
        ) : (
          <Safari
            url="talk2csv.com"
            className="w-[90%] h-[90%] rounded-lg overflow-hidden"
            imageSrc={mockups[mockupIndex]}
            mode="default"
          />
        )}
      </div>
    </motion.div>
  );
};

export default Hero;
