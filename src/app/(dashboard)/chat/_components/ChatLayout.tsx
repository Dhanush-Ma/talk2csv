"use client";

import { StickyToBottomContent } from "@/components/shared/StickyBottomContent";
import { cn } from "@/lib/utils";
import { StickToBottom } from "use-stick-to-bottom";

type ChatLayoutProps = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <StickToBottom className="relative flex-1 overflow-hidden">
      <StickyToBottomContent
        className={cn("absolute px-4 inset-0 overflow-y-scroll scrollbar")}
        contentClassName="pt-8 pb-16 chat-size mx-auto flex flex-col gap-4 w-full"
        content={children}
      />
    </StickToBottom>
  );
};

export default ChatLayout;
