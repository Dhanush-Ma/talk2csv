import { DEFAULT_CHAT_MODEL } from "@/lib/chat.config";
import { create } from "zustand";

type Store = {
  model: string;

  setModel: (model: string) => void;
};

export const useChatStore = create<Store>()((set) => ({
  model: DEFAULT_CHAT_MODEL.id,

  setModel: (model) => set({ model }),
}));
