import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const playerStore = create((set, get) => ({
  player: null,
  isCheckingPlayerAuth: false,
  hasCheckedPlayerAuth: false,

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
    if (get().isCheckingPlayerAuth || get().hasCheckedPlayerAuth) return get().player;

    set({ isCheckingPlayerAuth: true });
    console.time("auth:player-check");
    try {
      const res = await axiosInstance.get("/player/check-auth");
      const player = res.data?.player ?? res.data;
      set({ player: player?._id ? player : null });
      return player?._id ? player : null;
    } catch {
      set({ player: null });
      return null;
    } finally {
      console.timeEnd("auth:player-check");
      set({ isCheckingPlayerAuth: false, hasCheckedPlayerAuth: true });
    }
  },

  signup: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/player/signup", data);
      set({ player: res.data.player ?? res.data });
      set({ hasCheckedPlayerAuth: true });
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
      set({ hasCheckedPlayerAuth: true });
      navigate("/coaches");
      toast.success("Logged in successfully");
    } catch {
      toast.error("Something went wrong");
    }
  },

  logout: async (navigate) => {
    try {
      await axiosInstance.post("/player/logout");
      set({ player: null, hasCheckedPlayerAuth: true });
      navigate("/login");
      toast.success("Logged out successfully");
    } catch {
      toast.error("Something went wrong");
    }
  },
}));

export const coachStore = create((set, get) => ({
  coach: null,
  isCheckingCoachAuth: false,
  hasCheckedCoachAuth: false,

  setCoach: (coachData) => set({ coach: coachData }),

  checkCoachAuth: async () => {
    if (get().isCheckingCoachAuth || get().hasCheckedCoachAuth) return get().coach;

    set({ isCheckingCoachAuth: true });
    console.time("auth:coach-check");
    try {
      const res = await axiosInstance.get("/coach/check-auth");
      const coach = res.data?.coach ?? res.data;
      set({ coach: coach?._id ? coach : null });
      return coach?._id ? coach : null;
    } catch {
      set({ coach: null });
      return null;
    } finally {
      console.timeEnd("auth:coach-check");
      set({ isCheckingCoachAuth: false, hasCheckedCoachAuth: true });
    }
  },

  signup: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/coach/signup", data);
      set({ coach: res.data.coach ?? res.data });
      set({ hasCheckedCoachAuth: true });
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
      set({ hasCheckedCoachAuth: true });
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch {
      toast.error("Something went wrong");
    }
  },

  logout: async (navigate) => {
    try {
      await axiosInstance.post("/coach/logout");
      set({ coach: null, hasCheckedCoachAuth: true });
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

export const checkSessionAuth = async () => {
  const playerState = playerStore.getState();
  const coachState = coachStore.getState();

  if (
    playerState.isCheckingPlayerAuth ||
    coachState.isCheckingCoachAuth ||
    (playerState.hasCheckedPlayerAuth && coachState.hasCheckedCoachAuth)
  ) {
    return { player: playerState.player, coach: coachState.coach };
  }

  playerStore.setState({ isCheckingPlayerAuth: true });
  coachStore.setState({ isCheckingCoachAuth: true });
  console.time("auth:session-check");

  try {
    const res = await axiosInstance.get("/auth/session");
    const player = res.data?.role === "player" ? res.data.player : null;
    const coach = res.data?.role === "coach" ? res.data.coach : null;

    playerStore.setState({ player: player?._id ? player : null });
    coachStore.setState({ coach: coach?._id ? coach : null });
    return { player, coach };
  } catch {
    playerStore.setState({ player: null });
    coachStore.setState({ coach: null });
    return { player: null, coach: null };
  } finally {
    console.timeEnd("auth:session-check");
    playerStore.setState({
      isCheckingPlayerAuth: false,
      hasCheckedPlayerAuth: true,
    });
    coachStore.setState({
      isCheckingCoachAuth: false,
      hasCheckedCoachAuth: true,
    });
  }
};
