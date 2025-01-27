import { create } from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios";
import { playerStore, coachStore } from "./authStore";

export const useChatStore = create((set, get) => ({
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));