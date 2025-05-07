import React from "react";
import PreviousChats from "./_components/PreviousChats";
import ChatLayout from "./_components/ChatLayout";

type ChatLayoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <PreviousChats />
      <ChatLayout>{children}</ChatLayout>
    </div>
  );
};

export default layout;
