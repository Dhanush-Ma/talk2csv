"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHAT_MODELS } from "@/lib/chat.config";
import Image from "next/image";
import { useChatStore } from "@/store/chat.store";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChat } from "@ai-sdk/react";

const ChatInput = () => {
  const { fileId, setModel, model } = useChatStore();
  const { input, handleInputChange, handleSubmit } = useChat({
    id: "123",
    body: {
      model: model,
    },
  });

  return (
    <div className="absolute bottom-0 bg-muted rounded-tl-xl rounded-tr-xl overflow-hidden px-4 shadow-t-md w-2xl max-w-2xl -translate-x-1/2 left-1/2">
      <textarea
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
            e.preventDefault();
          }
        }}
        onChange={handleInputChange}
        className="w-full pt-4 resize-none max-h-44 h-max focus:outline-none align-top field-sizing-content shadow-none ring-0 outline-none focus:ring-0"
        placeholder="Type your message here..."
      />
      <div className="pb-4 pt-2 flex justify-between items-center">
        <div>
          <Select
            value={model}
            onValueChange={(value) => {
              setModel(value);
            }}
          >
            <SelectTrigger className="max-w-[200px]">
              <SelectValue placeholder="Select a foundation model" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Models</SelectLabel>
                {CHAT_MODELS.map((model) => {
                  return (
                    <SelectItem
                      key={model.id}
                      value={model.id}
                      disabled={model.disabled}
                    >
                      <Image
                        src={model.icon}
                        alt={model.name}
                        width={20}
                        height={20}
                      />
                      {model.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {input && fileId ? (
          <Button
            onClick={handleSubmit}
            className=""
            size="icon"
            disabled={!input || !fileId}
          >
            <Send />
          </Button>
        ) : (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Button className="" size="icon" disabled={!input || !fileId}>
                  <Send />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {!input
                  ? "Requires a text input"
                  : !fileId
                  ? "Please select a file before initiating a chat"
                  : null}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
