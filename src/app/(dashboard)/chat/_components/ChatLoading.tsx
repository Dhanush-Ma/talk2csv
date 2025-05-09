import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatLoading = () => {
  return (
    <div className="chat-size mx-auto pt-10">
      <div className="space-y-8">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div className="flex items-start gap-4 w-full" key={idx}>
            <Skeleton className="h-8 w-8 rounded-full bg-primary/60 overflow-hidden shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-[70%] rounded-full bg-primary/60 flex items-center justify-center" />
              <Skeleton className="h-4 w-[50%] rounded-full bg-primary/60 flex items-center justify-center" />
              <Skeleton className="h-4 w-[30%]  rounded-full bg-primary/60 flex items-center justify-center" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLoading;
