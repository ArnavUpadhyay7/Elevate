import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const playerStore = create((set, get) => ({
  player: null,
  isCheckingPlayerAuth: false,

  setPlayer: (playerData) => set({ player: playerData }),

  // ── Use this after payment to re-sync state with DB ──
  refreshPlayer: async () => {
    try {
      const res = await axiosInstance.get("/player/check-auth");
      // check-auth returns { player: {...} } — handle both shapes defensively
      const fresh = res.data?.player ?? res.data;
      if (fresh?._id) set({ player: fresh });
      return fresh;
    } catch (err) {
      console.error("refreshPlayer failed:", err);
      return null;
    }
  },

  checkPlayerAuth: async () => {
    set({ isCheckingPlayerAuth: true });
    try {
      const res = await axiosInstance.get("/player/check-auth");
      const player = res.data?.player ?? res.data;
      set({ player: player?._id ? player : null });
    } catch {
      set({ player: null });
    } finally {
      set({ isCheckingPlayerAuth: false });
    }
  },

  signup: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/player/signup", data);
      set({ player: res.data.player ?? res.data });
      navigate("/coaches");
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    }
  },

  login: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/player/login", data);
      set({ player: res.data.player ?? res.data });
      navigate("/coaches");
      toast.success("Logged in successfully");
    } catch {
      toast.error("Something went wrong");
    }
  },

  logout: async (navigate) => {
    try {
      await axiosInstance.post("/player/logout");
      set({ player: null });
      navigate("/login");
      toast.success("Logged out successfully");
    } catch {
      toast.error("Something went wrong");
    }
  },
}));

export const coachStore = create((set) => ({
  coach: null,
  isCheckingCoachAuth: false,

  setCoach: (coachData) => set({ coach: coachData }),

  checkCoachAuth: async () => {
    set({ isCheckingCoachAuth: true });
    try {
      const res = await axiosInstance.get("/coach/check-auth");
      const coach = res.data?.coach ?? res.data;
      set({ coach: coach?._id ? coach : null });
    } catch {
      set({ coach: null });
    } finally {
      set({ isCheckingCoachAuth: false });
    }
  },

  signup: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/coach/signup", data);
      set({ coach: res.data.coach ?? res.data });
      navigate("/dashboard");
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    }
  },

  login: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/coach/login", data);
      set({ coach: res.data.coach ?? res.data });
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch {
      toast.error("Something went wrong");
    }
  },

  logout: async (navigate) => {
    try {
      await axiosInstance.post("/coach/logout");
      set({ coach: null });
      navigate("/coach-login");
      toast.success("Logged out successfully");
    } catch {
      toast.error("Something went wrong");
    }
  },

  setGameplayVideos: (videos) =>
    set((state) => ({
      coach: state.coach ? { ...state.coach, gameplayVideos: videos } : null,
    })),
}));