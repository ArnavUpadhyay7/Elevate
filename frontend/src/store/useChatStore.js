import { create } from "zustand";

export const useChatStore = create((set, get) => ({
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));