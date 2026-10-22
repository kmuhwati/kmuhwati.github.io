import { ArrowUpRight, Presentation } from "lucide-react";
import { talks } from "../../data/portfolio.js";
import { formatMonthYear } from "../../lib/dates.js";
import { Section } from "../../components/Section/index.jsx";
import styles from "./Talks.module.css";

/**
 * talks.items: { title, event, date: "YYYY-MM", slidesUrl?, eventUrl? }[]
 */
export function Talks({ tone, number }) {
  const items = talks.items || [];
  if (!items.length) return null;

  return (
    <Section id="talks" tone={tone} number={number} title={talks.title}>
      <ul role="list" className={styles.list}>
        {items.map((talk, index) => (
          <li key={`${talk.title}-${talk.date}`} className={styles.item} data-reveal="" style={{ "--i": index % 3 }}>
            {talk.date && (
              <time className={styles.date} dateTime={talk.date}>
                {formatMonthYear(talk.date)}
              </time>
            )}
            <div className={styles.main}>
              <h3 className={styles.title}>{talk.title}</h3>
              {talk.event && <p className={styles.event}>{talk.event}</p>}
            </div>
            <div className={styles.links}>
              {talk.slidesUrl && (
                <a href={talk.slidesUrl} target="_blank" rel="noopener noreferrer">
                  <Presentation aria-hidden="true" />
                  Slides<span className="visually-hidden"> for {talk.title}</span>
                </a>
              )}
              {talk.eventUrl && (
                <a href={talk.eventUrl} target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight aria-hidden="true" />
                  Event<span className="visually-hidden"> page for {talk.title}</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
