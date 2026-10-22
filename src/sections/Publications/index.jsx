import { publications } from "../../data/portfolio.js";
import { formatYear } from "../../lib/dates.js";
import { useExpandable } from "../../hooks/useExpandable.js";
import { MoreToggle } from "../../components/MoreToggle/index.jsx";
import { Section } from "../../components/Section/index.jsx";
import styles from "./Publications.module.css";

// ■ filled = published, □ open = accepted
const STATUS = {
  published: { label: "Published", mark: "■" },
  accepted: { label: "Accepted", mark: "□" },
};

/** "A, B." — without doubling the period when the last author ends with an initial. */
function formatAuthors(authors = []) {
  const joined = authors.join(", ");
  return joined.endsWith(".") ? joined : `${joined}.`;
}

// A research register: year, title and finding, status, source
export function Publications({ number }) {
  const items = publications.items || [];
  const { visible, expanded, canExpand, total, toggle } = useExpandable(
    items,
    publications.initialCount,
  );

  return (
    <Section
      id="publications"
      number={number}
      title={publications.title}
      meta={`${total} ${total === 1 ? "paper" : "papers"}`}
      lead={publications.lead}
    >
      <div className={styles.table}>
        <div className={styles.headRow} aria-hidden="true">
          <span>Year</span>
          <span>Title · authors · finding</span>
          <span>Status</span>
          <span>Source</span>
        </div>
        <ol id="publications-list" role="list" className={styles.list}>
          {visible.map((paper) => {
            const status = STATUS[paper.status];
            return (
              <li key={paper.title} className={styles.row} data-reveal="">
                <time className={styles.year} dateTime={paper.date}>
                  {formatYear(paper.date)}
                </time>

                <div className={styles.main}>
                  <h3 className={styles.title}>
                    <cite>{paper.title}</cite>
                  </h3>
                  <p className={styles.authors}>
                    {formatAuthors(paper.authors)}
                    {paper.venue && <span> {paper.venue}.</span>}
                  </p>
                  {paper.keyFinding && (
                    <p className={styles.finding}>
                      <span className={styles.findingLabel}>Finding</span>
                      {paper.keyFinding}
                    </p>
                  )}
                </div>

                <p className={styles.status}>
                  {status ? (
                    <>
                      <span aria-hidden="true">{status.mark} </span>
                      {status.label}
                    </>
                  ) : (
                    paper.status
                  )}
                </p>

                <p className={styles.sourceCell}>
                  {paper.url && (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className={styles.source}>
                      {paper.sourceLabel || "Source"} ↗
                      <span className="visually-hidden"> for {paper.title}</span>
                    </a>
                  )}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      {canExpand && (
        <MoreToggle
          expanded={expanded}
          total={total}
          noun="publications"
          controls="publications-list"
          sectionId="publications"
          onToggle={toggle}
        />
      )}
    </Section>
  );
}
