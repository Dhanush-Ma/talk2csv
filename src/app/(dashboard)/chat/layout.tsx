import React from "react";
import ChatHistory from "./_components/ChatHistory";

type ChatLayoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <ChatHistory />
      {children}
    </div>
  );
};

export default layout;
