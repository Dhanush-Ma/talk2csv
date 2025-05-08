import { Input } from "@/components/ui/input";
import { Chat } from "@/db/schema/chat";
import { ERROR_MESSAGES } from "@/lib/constants";
import { renameChat } from "@/services/actions/chat.actions";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import React, { useEffect } from "react";
import { toast } from "sonner";

const EditableChatTitle = ({
  chat,
  title,
  setTitle,
  disableEdit,
}: {
  chat: Chat;
  title: string;
  setTitle: (title: string) => void;
  disableEdit: () => void;
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { execute } = useAction(renameChat, {
    onSuccess: ({ data }) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: ["chats"],
        });
      } else {
        toast.error(data?.message || ERROR_MESSAGES.CHAT_RENAME_FAILED);
      }
    },
    onError: () => {
      toast.error(ERROR_MESSAGES.CHAT_RENAME_FAILED);
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleRenameChat = async () => {
    execute({
      chatId: chat.id,
      title: title,
    });
  };

  return (
    <div className="px-3">
      <Input
        ref={inputRef}
        value={title}
        onChange={handleTitleChange}
        className="m w-full"
        onBlur={() => disableEdit()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleRenameChat();
            disableEdit();
          }
        }}
      />
    </div>
  );
};

export default EditableChatTitle;
