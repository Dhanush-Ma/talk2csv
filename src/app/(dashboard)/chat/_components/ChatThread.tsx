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
import { SelectUserFile } from "@/db/schema/files";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import ChatSuggestions from "./ChatSuggestions";

type ChatThreadProps = {
  chatId: string;
  initialMessages: Message[];
  file: SelectUserFile;
};

const ChatThread = ({ chatId, initialMessages, file }: ChatThreadProps) => {
  const {
    messages: messages,
    input,
    handleInputChange,
    status,
    handleSubmit,
    append,
  } = useChat({
    id: chatId,
    body: {
      model: DEFAULT_CHAT_MODEL.id,
      chatId: chatId,
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
        className={"absolute px-4 inset-0 overflow-y-scroll scrollbar "}
        contentClassName="pt-8 pb-16 chat-size mx-auto flex flex-col gap-4 w-full min-h-[89.5dvh]"
        footer={
          <div className="sticky bottom-0 flex flex-col items-center bg-background">
            <ChatInput
              chatId={chatId}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              disabled={status !== "ready"}
            />
          </div>
        }
      >
        <div className="space-y-8">
          <ChatMessageAI>
            <div>
              <p>
                <span className="flex items-center gap-1">
                  Now exploring data from{" "}
                  <Link
                    href={`/files/f/${file.id}`}
                    className="flex items-center gap-1"
                  >
                    <span className="text-primary underline">{file.name}.</span>
                    <ExternalLink size={16} className="text-primary" />
                  </Link>
                </span>{" "}
                I&apos;m ready to help you explore and answer questions based on
                this data. Ask anything from summaries to deep insights!
              </p>
              {messages.length === 1 && (
                <ChatSuggestions
                  append={append}
                  className="mt-4"
                  chatId={chatId}
                />
              )}
            </div>
          </ChatMessageAI>
          {messages.map((message, idx) =>
            message.role === "user" ? (
              <ChatMessageUser key={message.id} message={message} />
            ) : message.role === "assistant" ? (
              <ChatMessageAI
                key={message.id}
                message={message}
                loading={status === "submitted" && idx === messages.length - 1}
              />
            ) : null
          )}
        </div>
      </StickyToBottomContent>
    </StickToBottom>
  );
};

export default ChatThread;
