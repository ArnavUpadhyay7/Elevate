import { create } from "zustand";

export const useAudioStore = create((set) => ({
  isPlaying: false,
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (playing) => set({ isPlaying: playing }),
}));
