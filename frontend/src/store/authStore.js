import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const playerStore = create((set) => ({
  player: null,
  setPlayer: (playerData) => set({ player: playerData }),

  checkPlayerAuth: async () => {
    try {
      const res = await axiosInstance.get("/player/auth-check");
      set({ player: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ player: null });
    }
  },

  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/player/signup", data);
      toast.success("Account created successfully");
      set({ player: res.data });
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
      set({ player: res.data });
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

  checkCoachAuth: async () => {
    try {
      const res = await axiosInstance.get("/coach/auth-check");
      set({ coach: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ coach: null });
    }
  },

  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/coach/signup", data);
      toast.success("Account created successfully");
      set({ coach: res.data });
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
      set({ coach: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error in login: ", error);
      toast.error("Something went wrong");
    }
  },
}));
