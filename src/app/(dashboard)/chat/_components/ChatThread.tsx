"use client";

import { DEFAULT_CHAT_MODEL } from "@/lib/chat.config";
import React from "react";
import { useChat } from "@ai-sdk/react";
import { Message } from "@/db/schema/message";
import { StickToBottom } from "use-stick-to-bottom";
import { StickyToBottomContent } from "@/components/shared/StickyBottomContent";
import ChatInput from "./ChatInput";
import ChatMessageUser from "./ChatMessageUser";
import ChatMessageAI from "./ChatMessageAI";

type ChatThreadProps = {
  chatId: string;
  initialMessages: Message[];
};

const ChatThread = ({ chatId, initialMessages }: ChatThreadProps) => {
  const {
    messages: messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat({
    id: chatId,
    body: {
      model: DEFAULT_CHAT_MODEL.id,
    },
    sendExtraMessageFields: true,

    initialMessages: initialMessages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
    })),
  });

  return (
    <StickToBottom className="relative flex-1 overflow-hidden">
      <StickyToBottomContent
        className={"absolute px-4 inset-0 overflow-y-scroll scrollbar"}
        contentClassName="pt-8 pb-16 chat-size mx-auto flex flex-col gap-4 w-full  h-[90vh]"
        footer={
          <div className="sticky bottom-0 flex flex-col items-center bg-background">
            <ChatInput
              chatId={chatId}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        }
      >
        {messages.map((message) =>
          message.role === "user" ? (
            <ChatMessageUser key={message.id} message={message} />
          ) : message.role === "assistant" ? (
            <ChatMessageAI key={message.id} message={message} />
          ) : null
        )}
      </StickyToBottomContent>
    </StickToBottom>
  );
};

export default ChatThread;
