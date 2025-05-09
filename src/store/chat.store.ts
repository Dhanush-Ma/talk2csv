import { DEFAULT_CHAT_MODEL } from "@/lib/chat.config";
import { ChatModel } from "@/types/common/utils.type";
import { create } from "zustand";

type Store = {
  model: ChatModel;
  setModel: (model: ChatModel) => void;
};

export const useChatStore = create<Store>()((set) => ({
  model: DEFAULT_CHAT_MODEL,

  setModel: (model) => set({ model }),
}));
