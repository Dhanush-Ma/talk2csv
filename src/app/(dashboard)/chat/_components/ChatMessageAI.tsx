import Logo from "@/components/shared/Logo";
import { UIMessage } from "ai";
import { Ellipsis } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessageAI = ({
  message,
  loading = false,
  children,
}: {
  message?: UIMessage;
  loading?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-4 ">
      <div className="h-8 w-8 rounded-full border-2 border-primary overflow-hidden shrink-0">
        <Logo className="h-8 w-8 rounded-full" width={12} height={12} />
      </div>
      {children ?? (
        <>
          {loading ? (
            <div className="bg-muted w-12 h-8 rounded-full flex items-center justify-center">
              <Ellipsis className="animate-pulse text-primary" />
            </div>
          ) : (
            <div className="prose prose-sm max-w-full break-words">
              <Markdown remarkPlugins={[remarkGfm]}>
                {message?.content}
              </Markdown>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatMessageAI;
