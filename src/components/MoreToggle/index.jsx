import { prefersReducedMotion } from "../../hooks/useMotion.js";
import styles from "./MoreToggle.module.css";

/**
 * "View all 5 ↓" / "Show fewer ↑" under a list managed by useExpandable.
 * On collapse, scrolls back to the section if its top has left the viewport.
 * @param {{
 *   expanded: boolean,
 *   total: number,
 *   noun: string,
 *   controls: string,
 *   sectionId: string,
 *   onToggle: () => void,
 * }} props
 */
export function MoreToggle({ expanded, total, noun, controls, sectionId, onToggle }) {
  const handleClick = () => {
    onToggle();
    if (!expanded) return;
    requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);
      if (section && section.getBoundingClientRect().top < 0) {
        section.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    });
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.button}
        onClick={handleClick}
        aria-expanded={expanded}
        aria-controls={controls}
      >
        {expanded ? "Show fewer" : `View all ${total} ${noun}`}
        <span aria-hidden="true">{expanded ? " ↑" : " ↓"}</span>
      </button>
    </div>
  );
}
