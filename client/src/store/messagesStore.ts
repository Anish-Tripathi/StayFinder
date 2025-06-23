import { create } from "zustand";

interface MessagesStore {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  decrementUnreadCount: (count: number) => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  incrementUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  decrementUnreadCount: (count) => set((state) => ({ unreadCount: Math.max(0, state.unreadCount - count) })),
}));