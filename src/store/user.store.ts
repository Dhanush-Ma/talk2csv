import { SelectUser } from "@/db/schema/user";
import { create } from "zustand";

type Store = {
  user: SelectUser | null;
  setUser: (user: SelectUser | null) => void;
};

export const useUserStore = create<Store>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
