import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const ThemeContext = createContext(null);

// Dark is the default; a visitor's own choice from the theme toggle is remembered and wins
const DEFAULT_DARK = true;

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorage("theme-dark", DEFAULT_DARK);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = isDark ? "dark" : "light";

    // Keep the browser chrome in step with the canvas token
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const bg = getComputedStyle(root).getPropertyValue("--color-bg").trim();
      if (bg) meta.setAttribute("content", bg);
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((value) => !value);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
