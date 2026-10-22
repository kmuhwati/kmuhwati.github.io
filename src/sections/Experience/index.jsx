import { experience } from "../../data/portfolio.js";
import { formatLocation } from "../../lib/dates.js";
import { Section } from "../../components/Section/index.jsx";
import { Timeline } from "../../components/Timeline/index.jsx";
import { TagList } from "../../components/TagList/index.jsx";
import styles from "./Experience.module.css";

const EMPLOYMENT_TYPES = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
  volunteer: "Volunteer",
};

export function Experience({ number }) {
  const items = experience.items || [];
  const entries = items.map((job) => ({
    id: job.id,
    start: job.start,
    end: job.end,
    location: formatLocation(job.location),
    figure: job.metric,
    content: (
      <article>
        <h3 className={styles.role}>{job.role}</h3>
        <p className={styles.org}>
          {job.organizationUrl ? (
            <a href={job.organizationUrl} target="_blank" rel="noopener noreferrer">
              {job.organization} ↗
            </a>
          ) : (
            job.organization
          )}
          {job.employmentType && (
            <span className={styles.type}>
              {EMPLOYMENT_TYPES[job.employmentType] || job.employmentType}
            </span>
          )}
        </p>
        {job.summary && <p className={styles.summary}>{job.summary}</p>}
        {job.impact?.length > 0 && (
          <ol className={styles.impact}>
            {job.impact.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        )}
        <TagList items={job.skills} size="sm" label="Skills used" className={styles.tags} />
      </article>
    ),
  }));

  return (
    <Section
      id="experience"
      number={number}
      title={experience.title}
      meta={`${items.length} ${items.length === 1 ? "role" : "roles"}`}
    >
      <Timeline entries={entries} label="Work history" />
    </Section>
  );
}
