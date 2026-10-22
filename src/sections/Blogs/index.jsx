import { ArrowUpRight } from "lucide-react";
import { blogs } from "../../data/portfolio.js";
import { formatMonthYear } from "../../lib/dates.js";
import { useJson } from "../../hooks/useJson.js";
import { Section } from "../../components/Section/index.jsx";
import { Card } from "../../components/Card/index.jsx";
import styles from "./Blogs.module.css";

function stripTags(html = "") {
  const text = new DOMParser().parseFromString(html, "text/html").body.textContent || "";
  return text.replace(/\s+/g, " ").trim();
}

function truncate(text, max = 180) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export function Blogs({ tone, number }) {
  const { data, status } = useJson("blogs.json", blogs.useMedium);

  const mediumItems =
    blogs.useMedium && status === "ready"
      ? (data?.items || []).map((item) => ({
          url: item.link,
          title: item.title,
          description: truncate(stripTags(item.content || item.description)),
          date: item.pubDate?.slice(0, 10),
        }))
      : [];

  // Wait for Medium before falling back, so the list doesn't flash
  if (blogs.useMedium && status === "loading") return null;

  const items = mediumItems.length ? mediumItems : blogs.items || [];
  if (!items.length) return null;

  return (
    <Section id="blogs" tone={tone} number={number} title={blogs.title} lead={blogs.lead}>
      <ul role="list" className={styles.grid}>
        {items.map((post, index) => (
          <Card
            as="li"
            key={post.url}
            variant="outline"
            className={styles.card}
            data-reveal=""
            style={{ "--i": index % 3 }}
          >
            {post.date && (
              <time className={styles.date} dateTime={post.date}>
                {formatMonthYear(post.date)}
              </time>
            )}
            <h3 className={styles.title}>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {post.title}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </h3>
            {post.description && <p className={styles.description}>{post.description}</p>}
          </Card>
        ))}
      </ul>
    </Section>
  );
}
