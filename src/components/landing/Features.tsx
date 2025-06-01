import React from "react";
import { BellIcon, Share2Icon, CalendarIcon, FileTextIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { AnimatedList, AnimatedListItem } from "../magicui/animated-list";
import { AnimatedBeamMultipleOutputDemo } from "./Beam";
import { ShimmerButton } from "../magicui/shimmer-button";

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Chat with your data",
    description:
      "Ask questions in plain English and get answers from your CSV files instantly.",
    href: "/signup",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Automatic Insights",
    description:
      "Talk2CSV surfaces patterns, trends, and summaries without manual formulas.",
    href: "/signup",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedList className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90">
        <AnimatedListItem>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white ">
                New file uploaded
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-xs">
            You have a new file uploaded to your account.
          </blockquote>
        </AnimatedListItem>
        <AnimatedListItem>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white ">
                New file uploaded
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-xs">
            You have a new file uploaded to your account.
          </blockquote>
        </AnimatedListItem>
        <AnimatedListItem>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white ">
                New file uploaded
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-xs">
            You have a new file uploaded to your account.
          </blockquote>
        </AnimatedListItem>
        <AnimatedListItem>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white ">
                New file uploaded
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-xs">
            You have a new file uploaded to your account.
          </blockquote>
        </AnimatedListItem>
        <AnimatedListItem>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white ">
                New file uploaded
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-xs">
            You have a new file uploaded to your account.
          </blockquote>
        </AnimatedListItem>
        <AnimatedListItem>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white ">
                New file uploaded
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-xs">
            You have a new file uploaded to your account.
          </blockquote>
        </AnimatedListItem>
        <AnimatedListItem>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white ">
                New file uploaded
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-xs">
            You have a new file uploaded to your account.
          </blockquote>
        </AnimatedListItem>
      </AnimatedList>
    ),
  },
  {
    Icon: Share2Icon,
    name: "No-code integrations",
    description:
      "Export results, connect to Notion, Sheets, Zapier, and more with zero code.",
    href: "/signup",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Time-based filtering",
    description:
      "Analyze your data over time. Just ask: 'Show revenue by month'.",
    className: "col-span-3 lg:col-span-1",
    href: "/signup",
    cta: "Learn more",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
];

const Features = () => {
  return (
    <div id="features" className="max-w-3xl mx-auto mt-80">
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
        <div
          className={cn(
            "group relative col-span-3 flex h-max justify-between items-center overflow-hidden rounded-4xl p-6",
            "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
          )}
        >
          <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 ">
            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
              Let’s get you talking to your data
            </h3>
            <p className="max-w-lg text-neutral-400">
              Turn spreadsheets into conversations.
            </p>
          </div>
          <a href="/signup">
            <ShimmerButton shimmerColor="#FFFFFF" background="#6366f1">
              <p className="text-primary-foreground">Get started</p>
            </ShimmerButton>
          </a>
          <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
        </div>
      </BentoGrid>
    </div>
  );
};

export default Features;
