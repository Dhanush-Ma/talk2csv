import React from "react";
import PreviousChats from "./_components/PreviousChats";
import ChatLayout from "./_components/ChatLayout";

type ChatLayoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex gap-x-2">
      <PreviousChats />
      <ChatLayout>
        <div className="h-dvh w-2xl max-w-2xl mx-auto ">{children}</div>
      </ChatLayout>
      {/* <main className="overflow-y-auto relative w-full max-w-full">
      </main> */}
    </div>
  );
};

export default layout;
