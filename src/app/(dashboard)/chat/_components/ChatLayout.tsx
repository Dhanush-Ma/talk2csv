"use client";

import { StickyToBottomContent } from "@/components/shared/StickyBottomContent";
import { cn } from "@/lib/utils";
import { StickToBottom } from "use-stick-to-bottom";
import ChatInput from "./ChatInput";

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
        footer={
          <div className="sticky bottom-0 flex flex-col items-center bg-background">
            <ChatInput />
          </div>
        }
      />
    </StickToBottom>
  );
};

export default ChatLayout;
