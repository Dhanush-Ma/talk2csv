"use client";

import { StickyToBottomContent } from "@/components/shared/StickyBottomContent";
import { SelectUserFile } from "@/db/schema/files";
import { Message } from "@/db/schema/message";
import { ERROR_MESSAGES } from "@/lib/constants";
import { useChatStore } from "@/store/chat.store";
import { useChat } from "@ai-sdk/react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { StickToBottom } from "use-stick-to-bottom";
import ChatInput from "./ChatInput";
import ChatMessageAI from "./ChatMessageAI";
import ChatMessageUser from "./ChatMessageUser";
import ChatSuggestions from "./ChatSuggestions";
import { saveChatMessage } from "@/services/actions/chat.actions";
import { UIMessage } from "ai";

type ChatThreadProps = {
  chatId: string;
  initialMessages: Message[];
  file: SelectUserFile;
};

const ChatThread = ({ chatId, initialMessages, file }: ChatThreadProps) => {
  const { model } = useChatStore();
  const {
    messages: messages,
    input,
    handleInputChange,
    status,
    handleSubmit,
    append,
    error,
  } = useChat({
    id: chatId,
    body: {
      model: {
        id: model.id,
        provider: model.provider,
      },
      chatId: chatId,
    },
    sendExtraMessageFields: true,
    onFinish(message) {
      if (message.role === "assistant") {
        saveChatMessage({
          chatId,
          content: message.content,
          role: "assistant",
          parts: message.parts,
        });
      }
    },
    onToolCall({ toolCall }) {
      if (toolCall.toolName === "visualAgent") {
        return toolCall.args;
      }
    },
    initialMessages: initialMessages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
      parts: (m.parts as UIMessage["parts"]) ?? undefined,
    })),
  });

  if (error) {
    console.log("Chat error:", error);
  }

  return (
    <>
      <StickToBottom className="relative flex-1 overflow-hidden">
        <StickyToBottomContent
          className={"absolute px-4 inset-0 overflow-y-scroll scrollbar "}
          contentClassName="pt-8 pb-16 chat-size mx-auto flex flex-col gap-4 max-w-full min-h-[89.5dvh]"
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
          <div className="space-y-8 pt-20 md:pt-0">
            <ChatMessageAI>
              <div>
                <p>
                  Now exploring data from{" "}
                  <Link href={`/files/f/${file.id}`} className="inline">
                    <span className="text-primary underline">{file.name}.</span>
                    <ExternalLink size={16} className="text-primary inline" />
                  </Link>
                </p>
                <p>
                  I&apos;m ready to help you explore and answer questions based
                  on this data. Ask anything from summaries to deep insights!
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
                  loading={
                    status === "submitted" && idx === messages.length - 1
                  }
                />
              ) : null
            )}
            {error && (
              <ChatMessageAI>
                <div className="px-3 py-2 border border-destructive bg-destructive/30 text-destructive w-max rounded-md">
                  <p>{ERROR_MESSAGES.GENERAL_ERROR}</p>
                </div>
              </ChatMessageAI>
            )}
          </div>
        </StickyToBottomContent>
      </StickToBottom>
    </>
  );
};

export default ChatThread;
