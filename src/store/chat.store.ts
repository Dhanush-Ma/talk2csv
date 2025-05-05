import { DEFAULT_CHAT_MODEL } from "@/lib/chat.config";
import { create } from "zustand";

type Store = {
  input: string;
  model: string;
  fileId: string | null;

  setInput: (input: string) => void;
  setModel: (model: string) => void;
  setFileId: (fileId: string | null) => void;
};

export const useChatStore = create<Store>()((set) => ({
  input: "",
  model: DEFAULT_CHAT_MODEL.id,
  fileId: null,

  setInput: (input) => set({ input }),
  setModel: (model) => set({ model }),
  setFileId: (fileId) => set({ fileId }),
}));
