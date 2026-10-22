import { useTheme } from "../../context/ThemeContext.jsx";
import styles from "./ThemeToggle.module.css";

/** Text toggle: "[ Dark ]" / "[ Light ]" names the theme you'll switch to. */
export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label="Toggle color theme"
    >
      <span aria-hidden="true">[ {isDark ? "Light" : "Dark"} ]</span>
    </button>
  );
}
