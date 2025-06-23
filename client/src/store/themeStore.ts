import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system", // Default theme
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage", // Key for localStorage
    }
  )
);