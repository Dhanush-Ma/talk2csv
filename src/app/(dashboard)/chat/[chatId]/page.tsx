"use client";

import { DEFAULT_CHAT_MODEL } from "@/lib/chat.config";
import { useChat } from "@ai-sdk/react";
import React from "react";

const ChatPage = () => {
  const { messages } = useChat({
    id: "123",
    body: {
      model: DEFAULT_CHAT_MODEL.id,
    },
  });

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
