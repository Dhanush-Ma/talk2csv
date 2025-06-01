import Faq from "@/components/landing/Faq";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const SatoshiFont = localFont({
  src: "../assets/fonts/Satoshi.ttf",
});

export default function Home() {
  return (
    <div>
      <div
        className={cn("container mx-auto px-6 lg:px-0", SatoshiFont.className)}
      >
        <Header />
        <Hero />
        <Features />
        <Faq />
      </div>
      <Footer />
    </div>
  );
}
