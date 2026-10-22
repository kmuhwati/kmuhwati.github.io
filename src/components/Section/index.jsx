import clsx from "clsx";
import styles from "./Section.module.css";

/**
 * Spec-sheet section header: "04  Projects ··········· 4 entries" over a
 * heavy rule, then the content.
 * @param {{
 *   id: string,
 *   number?: string,
 *   title?: string,
 *   meta?: string,
 *   lead?: string,
 *   className?: string,
 *   children: import('react').ReactNode,
 * }} props
 */
export function Section({ id, number, title, meta, lead, children, className }) {
  const headingId = title ? `${id}-title` : undefined;

  return (
    <section id={id} aria-labelledby={headingId} className={clsx(styles.section, className)}>
      <div className={styles.container}>
        {title && (
          <header className={styles.header} data-reveal="">
            <div className={styles.bar}>
              {number && <span className={styles.index}>{number}</span>}
              <h2 id={headingId} className={styles.title}>
                {title}
              </h2>
              <span className={styles.leader} aria-hidden="true" />
              {meta && <span className={styles.meta}>{meta}</span>}
            </div>
            {lead && <p className={styles.lead}>{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
