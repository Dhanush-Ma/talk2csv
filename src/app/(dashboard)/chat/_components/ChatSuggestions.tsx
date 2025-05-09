import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { saveChatMessage } from "@/services/actions/chat.actions";
import { ChatRequestOptions, CreateMessage, Message } from "ai";
import React from "react";

type ChatSuggestionsProps = {
  className?: string;
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
};

const SUGGESTIONS = [
  "What fields does this dataset include?",
  "How many rows does this file contain?",
  "Show me a summary of this dataset.",
];

const ChatSuggestions = ({
  className,
  chatId,
  append,
}: ChatSuggestionsProps) => {
  return (
    <div className={cn(className, "flex flex-wrap")}>
      {SUGGESTIONS.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          className="m-1 text-primary border-primary bg-primary/20 hover:bg-primary/30"
          onClick={() => {
            append({ role: "user", content: suggestion });
            saveChatMessage({
              chatId,
              content: suggestion,
              role: "user",
            });
          }}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};

export default ChatSuggestions;
