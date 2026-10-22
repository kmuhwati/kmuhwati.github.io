import { podcast } from "../../data/portfolio.js";
import { Section } from "../../components/Section/index.jsx";
import styles from "./Podcast.module.css";

/**
 * podcast.items: embed URLs (string) or { url, title } objects.
 */
export function Podcast({ tone, number }) {
  const items = (podcast.items || []).map((item, index) =>
    typeof item === "string" ? { url: item, title: `Podcast episode ${index + 1}` } : item,
  );
  if (!items.length) return null;

  return (
    <Section id="podcast" tone={tone} number={number} title={podcast.title}>
      <ul role="list" className={styles.list}>
        {items.map((item) => (
          <li key={item.url}>
            <iframe
              className={styles.frame}
              src={item.url}
              title={item.title}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
