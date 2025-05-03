import { SelectUserFile } from "@/db/schema/files";
import { create } from "zustand";

type Store = {
  files: SelectUserFile[];
  setFiles: (files: SelectUserFile[]) => void;
  isFilesFetched: boolean;
  setIsFilesFetched: (isFilesFetched: boolean) => void;
  addFile: (file: SelectUserFile) => void;
  removeFile: (fileId: string) => void;
};

export const useFilesStore = create<Store>()((set) => ({
  files: [],
  setFiles: (files) => set({ files }),
  isFilesFetched: false,
  setIsFilesFetched: (isFilesFetched) => set({ isFilesFetched }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (fileId) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== fileId),
    })),
}));
