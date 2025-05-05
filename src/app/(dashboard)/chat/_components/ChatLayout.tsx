"use client";

import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import ChatInput from "./ChatInput";

type ChatLayoutProps = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="relative w-full flex flex-col overflow-hidden">
      <StickToBottom
        className="mx-auto relative"
        resize="smooth"
        initial="smooth"
      >
        <StickToBottom.Content className="flex flex-col gap-4">
          {children}
        </StickToBottom.Content>

        <ScrollToBottom />

        <ChatInput />
      </StickToBottom>
    </div>
  );
};

export default ChatLayout;

function ScrollToBottom() {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  return (
    !isAtBottom && (
      <button
        className="absolute i-ph-arrow-circle-down-fill text-4xl rounded-lg left-[50%] translate-x-[-50%] bottom-0"
        onClick={() => scrollToBottom()}
      />
    )
  );
}
