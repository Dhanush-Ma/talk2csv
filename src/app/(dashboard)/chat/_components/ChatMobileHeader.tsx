"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SIDEBAR_WIDTH_MOBILE, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import React from "react";
import ChatHistory from "./ChatHistory";

const ChatMobileHeader = () => {
  return (
    <div className="fixed h-16 top-0 left-0 border-b px-10 w-full flex items-center justify-between bg-muted z-10 md:hidden">
      <SidebarTrigger className="" size={"lg"}>
        <Menu className="size-7" />
      </SidebarTrigger>
      <Sheet>
        <SheetTrigger asChild>
          <Button>View Chat History</Button>
        </SheetTrigger>
        <SheetContent
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={"left"}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Chat History</SheetTitle>
            <SheetDescription>Displays the chat history.</SheetDescription>
          </SheetHeader>
          <ChatHistory className="block w-full" />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatMobileHeader;
