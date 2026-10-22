import { education } from "../../data/portfolio.js";
import { formatLocation } from "../../lib/dates.js";
import { Section } from "../../components/Section/index.jsx";
import { Timeline } from "../../components/Timeline/index.jsx";
import { TagList } from "../../components/TagList/index.jsx";
import styles from "./Education.module.css";

/** "GPA 3.80 / 4.0" as a quiet data line; big figures are kept for results. */
function formatGpa(gpa) {
  if (!gpa || gpa.value == null) return "";
  // Two decimals, but never round away a figure given more precisely (3.966 stays 3.966)
  const value = Number(gpa.value).toFixed(Math.max(2, (String(gpa.value).split(".")[1] || "").length));
  return gpa.scale ? `GPA ${value} / ${Number(gpa.scale).toFixed(1)}` : `GPA ${value}`;
}

export function Education({ number }) {
  const items = education.items || [];
  const entries = items.map((school) => ({
    id: school.id,
    start: school.start,
    end: school.end,
    location: formatLocation(school.location),
    content: (
      <article>
        <h3 className={styles.degree}>
          {[school.degree, school.field].filter(Boolean).join(", ")}
        </h3>
        <p className={styles.institution}>{school.institution}</p>
        {formatGpa(school.gpa) && <p className={styles.gpa}>{formatGpa(school.gpa)}</p>}

        {school.honors?.length > 0 && (
          <ul role="list" className={styles.honors}>
            {school.honors.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        )}

        {school.coursework?.length > 0 && (
          <div className={styles.coursework}>
            <p className={styles.label}>Coursework</p>
            <TagList items={school.coursework} size="sm" label="Coursework" />
          </div>
        )}
      </article>
    ),
  }));

  return (
    <Section
      id="education"
      number={number}
      title={education.title}
      meta={`${items.length} ${items.length === 1 ? "degree" : "degrees"}`}
    >
      <Timeline entries={entries} label="Education history" />
    </Section>
  );
}
