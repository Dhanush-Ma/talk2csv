import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/store/user.store";
import { UIMessage } from "ai";
import React from "react";

const ChatMessageUser = ({ message }: { message: UIMessage }) => {
  const { user } = useUserStore();
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      {message.content}
    </div>
  );
};

export default ChatMessageUser;
