"use client";

import { Chat } from "@/db/schema/chat";
import { Archive, MoreHorizontal, PencilLine } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import EditableChatTitle from "./EditableChatTitle";
import { useAction } from "next-safe-action/hooks";
import { deleteChat } from "@/services/actions/chat.actions";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";

const ChatTitle = ({ chat }: { chat: Chat }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(chat.title);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isChatTitleEditable, setIsChatTitleEditable] = useState(false);
  const { execute } = useAction(deleteChat, {
    onExecute: () => {
      toast.loading("Deleting chat...", {
        id: `delete-chat-${chat.id}`,
      });
    },
    onSuccess: ({ data }) => {
      if (data?.status === "success") {
        toast.success("Chat deleted successfully", {
          id: `delete-chat-${chat.id}`,
        });
      } else {
        toast.error(ERROR_MESSAGES.CHAT_DELETION_FAILED, {
          id: `delete-chat-${chat.id}`,
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
    onError: () => {
      toast.error(ERROR_MESSAGES.CHAT_DELETION_FAILED, {
        id: `delete-chat-${chat.id}`,
      });
    },
  });

  const handleChatMenuToggle = (bool: boolean) => {
    setShowChatMenu(bool);
  };

  const handleDeleteChat = async () => {
    execute({
      chatId: chat.id,
    });
  };

  if (isChatTitleEditable) {
    return (
      <EditableChatTitle
        chat={chat}
        title={title}
        setTitle={setTitle}
        disableEdit={() => {
          setIsChatTitleEditable(false);
        }}
      />
    );
  }

  return (
    <Link
      key={chat.id}
      href={`/chat/${chat.id}`}
      className="flex items-center justify-between px-3 rounded-md group relative"
      onMouseEnter={() => handleChatMenuToggle(true)}
      onMouseLeave={() => handleChatMenuToggle(false)}
      onFocus={() => handleChatMenuToggle(true)}
      onBlur={() => handleChatMenuToggle(false)}
    >
      <span className="truncate text-sm"> {title}</span>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          {showChatMenu && (
            <Button
              variant="ghost"
              className="flex size-4 text-muted-foreground data-[state=op en]:bg-muted hover:!bg-transparent focus:!bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 outline-none"
              size="icon"
            >
              <MoreHorizontal />
              <span className="sr-only">Open chat menu</span>
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right" className="w-32 group">
          <DropdownMenuItem
            onClick={() => {
              setIsChatTitleEditable(true);
              setOpenDropdown(false);
            }}
          >
            <PencilLine className="group-hover:text-primary" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog
            onOpenChange={(open) => {
              if (!open) {
                setOpenDropdown(false);
              }
            }}
          >
            <AlertDialogTrigger asChild>
              <div
                onSelect={(e) => e.preventDefault()}
                className={cn(
                  "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  "bg-destructive/80 text-white hover:!text-white hover:!bg-destructive/90 focus:!bg-destructive/90 focus:!text-white data-[disabled]:bg-destructive/50 data-[disabled]:text-destructive-foreground"
                )}
              >
                <Archive className="text-white" />
                Archive
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure to delete the chat?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <div className="px-6">
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone. Once you delete the chat, there
                  is no going back. Please be certain.
                </p>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteChat}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  );
};

export default ChatTitle;
