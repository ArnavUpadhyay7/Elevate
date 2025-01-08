import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const playerStore = create((set) => ({
  player: null,
  setPlayer: (playerData) => set({ player: playerData }),
  isCheckingPlayerAuth: false,

  checkPlayerAuth: async () => {
    set({ isCheckingPlayerAuth: true });
    try {
      const res = await axiosInstance.get("/player/check-auth");
      set({ player: res.data.player });
    } catch (error) {
      console.log("Error in checkPlayerAuth: ", error);
      set({ player: null });
    } finally {
      set({isCheckingPlayerAuth: false})
    }
  },

  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/player/signup", data);
      set({ player: res.data.player });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Error in signup: ", error);
      toast.error(error.response.data.message);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/player/logout");
      set({ player: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in logout: ", error);
      toast.error("Something went wrong");
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/player/login", data);
      set({ player: res.data.player });
      toast.success("Logged in successfully");
      
    } catch (error) {
      console.error("Error in login: ", error);
      toast.error("Something went wrong");
    }
  },
}));

export const coachStore = create((set) => ({
  coach: null,
  setCoach: (coachData) => set({ coach: coachData }),
  isCheckingCoachAuth: false,

  checkCoachAuth: async () => {
    set({ isCheckingCoachAuth: true });
    try {
      const res = await axiosInstance.get("/coach/check-auth");
      set({ coach: res.data.coach });
    } catch (error) {
      console.log("Error in checkCoachAuth: ", error);
      set({ coach: null });
    } finally {
      set({ isCheckingCoachAuth: false });
    }
  },

  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/coach/signup", data);
      toast.success("Account created successfully");
      set({ coach: res.data.coach });
    } catch (error) {
      console.error("Error in signup: ", error);
      toast.error(error.response.data.message);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/coach/logout");
      set({ coach: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in logout: ", error);
      toast.error("Something went wrong");
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/coach/login", data);
      set({ coach: res.data.coach });
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error in login: ", error);
      toast.error("Something went wrong");
    }
  },
}));
