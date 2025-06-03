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
    <div className="fixed h-16 top-0 left-0 w-full z-10 md:hidden bg-background">
      <div className="content-padding-x content-padding-y border-b w-full flex items-center justify-between">
        <SidebarTrigger className="" size={"lg"}>
          <Menu size={32} />
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
    </div>
  );
};

export default ChatMobileHeader;

{
  /* <div className="content-padding-x content-padding-y border-b w-full flex items-center justify-between">
  <div className="flex items-center">
    <SidebarTriggerMobile className="mr-2" />
    <h2 className="font-bold text-xl leading-0 mr-2">File Library</h2>
    <InfoTooltip
      text="Your uploaded CSV files, ready to explore or chat with."
      side="right"
    />
  </div>
  <AddNewFile />
</div>; */
}
