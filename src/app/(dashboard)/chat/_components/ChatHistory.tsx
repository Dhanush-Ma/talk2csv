"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { fetchUserChats } from "@/services/actions/chat.actions";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import ChatTitle from "./ChatTitle";
import { useParams } from "next/navigation";

const ChatHistory = () => {
  const { chatId: currentChatId } = useParams<{ chatId: string }>();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await fetchUserChats();
      return response?.data?.data;
    },
  });

  return (
    <div className="w-[20rem] border-r overflow-y-auto">
      <div className="border-b-2 py-4 px-4">
        <div>
          <div className="w-full font-semibold text-xl mb-2">Chat History</div>
          <Link href="/chat">
            <Button className="w-full">
              <PlusCircle className="mr-1" />
              New Chat
            </Button>
          </Link>
        </div>
      </div>
      <div className="py-4">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader className="fill-primary" />
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center gap-y-2">
            <p className="text-destructive">Error loading chats</p>
            <Button variant="destructive" onClick={() => refetch()}>
              Try Again
            </Button>
          </div>
        )}

        {data ? (
          data.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-muted-foreground">No chats found</p>
            </div>
          ) : (
            <div className="mx-2 flex flex-col gap-y-2">
              {data?.map((chat) => (
                <ChatTitle
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                />
              ))}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default ChatHistory;
