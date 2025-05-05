"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";

const pc = [
  {
    id: 1,
    name: "Chat 1",
    lastMessage: "Hello",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Chat 2",
    lastMessage: "Hi HiHiHiHiHiHiHiHiHiHiHiHiHiHiHiHiHiHi",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Chat 3",
    lastMessage: "Hey",
    createdAt: new Date(),
  },
];

const PreviousChats = () => {
  return (
    <div className="w-(--sidebar-width) border-r overflow-y-auto">
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
      <div className="flex flex-col gap-y-2 p-4">
        {pc.map((chat) => (
          <div
            key={chat.id}
            className="group flex items-center justify-between gap-y-1 p-2 rounded-lg hover:bg-muted"
          >
            <Link
              href={`/chat/${chat.id}`}
              className="flex-1 text-sm text-muted-foreground truncate"
            >
              {chat.lastMessage}
            </Link>

            <Button
              size="icon"
              variant="ghost"
              className="z-10 hover:bg-primary size-4 hidden group-hover:flex rounded-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("More options clicked");
              }}
            >
              <MoreHorizontal className="text-muted-foreground" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousChats;
