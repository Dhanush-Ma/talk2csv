import Logo from "@/components/shared/Logo";
import { UIMessage } from "ai";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessageAI = ({ message }: { message: UIMessage }) => {
  return (
    <div className="flex items-start gap-4 ">
      <div className="h-8 w-8 rounded-full border border-primary overflow-hidden shrink-0">
        <Logo className="h-8 w-8 rounded-full" />
      </div>
      <div className="prose prose-sm max-w-full break-words">
        <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
      </div>
    </div>
  );
};

export default ChatMessageAI;
