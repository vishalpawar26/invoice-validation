import { create } from "zustand";

const store = (set) => ({
  fileData: [],
  setFileData: (data) => set((store) => (store.fileData = data)),
});

export const useStore = create(store);
