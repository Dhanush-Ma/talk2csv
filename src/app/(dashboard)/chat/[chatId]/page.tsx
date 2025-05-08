import { fetchChatMessages } from "@/services/actions/chat.actions";
import ChatThread from "../_components/ChatThread";
import { redirect } from "next/navigation";

const ChatPage = async ({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) => {
  const { chatId } = await params;
  const response = await fetchChatMessages({ chatId });

  if (!response?.data || response?.data?.status === "error") {
    redirect("/chat");
  }

  return (
    <ChatThread chatId={chatId} initialMessages={response.data.data.messages} />
  );
};

export default ChatPage;
