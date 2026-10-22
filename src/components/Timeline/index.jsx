import clsx from "clsx";
import { formatDateRange, formatYear } from "../../lib/dates.js";
import styles from "./Timeline.module.css";

/**
 * Evidence ledger: each entry leads with a figure cell (a job's metric, or
 * the start year when there is none), then dates, location and content.
 * @typedef {{
 *   id: string,
 *   start: string,
 *   end: string | null,
 *   location?: string,
 *   figure?: { value: string, label: string },
 *   content: import('react').ReactNode,
 * }} LedgerEntry
 * @param {{ entries: LedgerEntry[], label?: string, className?: string }} props
 */
export function Timeline({ entries, label, className }) {
  if (!entries?.length) return null;

  return (
    <ol role="list" aria-label={label} className={clsx(styles.ledger, className)}>
      {entries.map((entry) => {
        const figure = entry.figure?.value
          ? entry.figure
          : entry.start
            ? { value: formatYear(entry.start), label: entry.end === null ? "to present" : `to ${formatYear(entry.end)}` }
            : { value: entry.end ? formatYear(entry.end) : "Now", label: entry.end ? "completed" : "in progress" };
        return (
          <li key={entry.id} className={styles.row} data-reveal="">
            <div className={clsx(styles.figure, !entry.figure?.value && styles.figureQuiet)}>
              <p className={styles.value} style={{ "--chars": [...String(figure.value)].length }}>
                {figure.value}
              </p>
              <p className={styles.caption}>{figure.label}</p>
            </div>
            <div className={styles.body}>
              <p className={styles.meta}>
                {entry.end === null && <span className={styles.mark} aria-hidden="true" />}
                <time dateTime={entry.start}>{formatDateRange(entry.start, entry.end)}</time>
                {entry.location && <span>{entry.location}</span>}
              </p>
              <div className={styles.content}>{entry.content}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
