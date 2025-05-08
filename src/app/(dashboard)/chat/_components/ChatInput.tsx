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
import ScrollToBottom from "@/components/shared/ScrollToBottom";
import { ChatRequestOptions } from "ai";

type ChatInputProps = {
  chatId: string;
  input: string;
  disabled?: boolean;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
};

const ChatInput = ({
  input,
  handleInputChange,
  handleSubmit,
  disabled = false,
}: ChatInputProps) => {
  const { setModel, model } = useChatStore();

  return (
    <div>
      <ScrollToBottom />

      <div className="bg-muted rounded-lg border overflow-hidden  chat-size mx-auto mb-2">
        <textarea
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) {
              handleSubmit();
              e.preventDefault();
            }
          }}
          onChange={handleInputChange}
          className="w-full pt-4 resize-none max-h-44 h-max focus:outline-none align-top field-sizing-content shadow-none ring-0 outline-none focus:ring-0 scrollbar px-4"
          placeholder="Type your message here..."
        />
        <div className="pb-4 pt-2 flex justify-between items-center px-4">
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
          {input ? (
            <Button
              onClick={handleSubmit}
              className=""
              size="icon"
              disabled={disabled || !input}
            >
              <Send />
            </Button>
          ) : (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Button className="" size="icon" disabled={!input}>
                    <Send />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {!input ? "Requires a text input" : null}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
