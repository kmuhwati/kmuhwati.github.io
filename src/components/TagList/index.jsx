import clsx from "clsx";
import styles from "./TagList.module.css";

/**
 * @typedef {{ name: string, note?: string, title?: string }} TagItem
 * @param {{
 *   items: (string | TagItem)[],
 *   label?: string,
 *   size?: "sm" | "md",
 *   className?: string,
 * }} props
 */
export function TagList({ items, label, size = "md", className }) {
  if (!items?.length) return null;

  return (
    <ul role="list" aria-label={label} className={clsx(styles.list, className)}>
      {items.map((item) => {
        const tag = typeof item === "string" ? { name: item } : item;
        return (
          <li
            key={tag.name}
            className={clsx(styles.tag, styles[size])}
            title={tag.title}
          >
            <span>{tag.name}</span>
            {tag.note && (
              <span className={styles.note}>
                <span className="visually-hidden">, </span>
                {tag.note}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
