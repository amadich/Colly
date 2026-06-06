// audio.store.ts
import { create } from "zustand";

type AudioState = {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  init: () => void;
  play: (src: string) => void;
  stop: () => void;
  toggle: (src: string) => void;
};

export const useAudioStore = create<AudioState>((set, get) => ({
  audio: null,
  isPlaying: false,

  init: () => {
    if (typeof window === "undefined") return;

    if (!get().audio) {
      const audio = new Audio();
      audio.loop = false;
      audio.volume = 0.5;

      set({ audio });
    }
  },

  play: (src: string) => {
    const audio = get().audio;
    if (!audio) return;

    audio.src = src;
    audio.play().catch(() => {});

    set({ isPlaying: true });
  },

  stop: () => {
    const audio = get().audio;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    set({ isPlaying: false });
  },

  toggle: (src: string) => {
    const audio = get().audio;
    if (!audio) return;

    const isPlaying = get().isPlaying;

    if (isPlaying) {
      audio.pause();
      set({ isPlaying: false });
    } else {
      audio.src = src;
      audio.play().catch(() => {});
      set({ isPlaying: true });
    }
  },
}));