import React from "react";
import ChatHistory from "./_components/ChatHistory";
import ChatMobileHeader from "./_components/ChatMobileHeader";

type ChatLayoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <ChatMobileHeader />

      <ChatHistory />
      {children}
    </div>
  );
};

export default layout;
