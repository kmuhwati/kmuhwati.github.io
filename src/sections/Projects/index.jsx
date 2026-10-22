import { useState } from "react";
import clsx from "clsx";
import { projects } from "../../data/portfolio.js";
import { formatDateRange, formatMonthYear, formatYear } from "../../lib/dates.js";
import { useExpandable } from "../../hooks/useExpandable.js";
import { Section } from "../../components/Section/index.jsx";
import { Button } from "../../components/Button/index.jsx";
import { MoreToggle } from "../../components/MoreToggle/index.jsx";
import styles from "./Projects.module.css";

const pad = (value) => String(value).padStart(2, "0");

/** The fold-out rows of a project's spec. */
function specRows(project) {
  return [
    ["Summary", project.summary],
    ["Problem", project.problem],
    ["Approach", project.approach],
    [
      "Results",
      project.results?.length > 0 && (
        <ol className={styles.results}>
          {project.results.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      ),
    ],
    ["Impact", project.impact],
  ].filter(([, value]) => value);
}

// Each project is a small data sheet; its outcome figure leads
export function Projects({ number }) {
  const items = projects.items || [];
  const { visible, expanded, canExpand, total, toggle } = useExpandable(items, projects.initialCount);
  const [openId, setOpenId] = useState(null);

  return (
    <Section
      id="work"
      number={number}
      title={projects.title}
      meta={`${total} ${total === 1 ? "entry" : "entries"}`}
      lead={projects.lead}
    >
      <ol role="list" id="projects-list" className={styles.list}>
        {visible.map((project, index) => {
          const isOpen = openId === project.id;
          const id = `P-${pad(index + 1)}`;
          // A project that starts and ends in the same month shows one date, not "Oct 2026 – Oct 2026"
          const period = !project.start
            ? ""
            : project.end === project.start
              ? formatMonthYear(project.start)
              : formatDateRange(project.start, project.end ?? null);
          const year = formatYear(project.end || project.start);
          const rows = specRows(project);

          return (
            <li key={project.id} className={clsx(styles.block, isOpen && styles.open)} data-reveal="">
              <div className={styles.head}>
                <span className={styles.mark} aria-hidden="true" />
                <h3 className={styles.name} id={`${project.id}-name`}>
                  {project.name}
                </h3>
                <span className={styles.id}>{id}</span>
              </div>

              <div className={styles.grid}>
                <div className={clsx(styles.figure, !project.metric?.value && styles.figureQuiet)}>
                  <p className={styles.value} style={{ "--chars": [...String(project.metric?.value || year)].length }}>
                    {project.metric?.value || year}
                  </p>
                  <p className={styles.caption}>{project.metric?.label || "year"}</p>
                </div>
                <dl className={styles.cells}>
                  {project.outcome && (
                    <div className={styles.cellWide}>
                      <dt>Result</dt>
                      <dd>{project.outcome}</dd>
                    </div>
                  )}
                  {(project.role || period) && (
                    <div>
                      <dt>Role · period</dt>
                      <dd className={styles.mono}>{[project.role, period].filter(Boolean).join(" · ")}</dd>
                    </div>
                  )}
                  {project.skills?.length > 0 && (
                    <div>
                      <dt>Stack</dt>
                      <dd className={styles.mono}>{project.skills.join("  ")}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {rows.length > 0 && (
                <div
                  id={`${project.id}-spec`}
                  role="region"
                  aria-labelledby={`${project.id}-name`}
                  className={styles.panel}
                  {...(!isOpen && { inert: "" })}
                >
                  <div className={styles.panelInner}>
                    <dl className={styles.spec}>
                      {rows.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{typeof value === "string" ? value : value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              <div className={styles.actions}>
                {rows.length > 0 && (
                  <button
                    type="button"
                    className={styles.toggle}
                    aria-expanded={isOpen}
                    aria-controls={`${project.id}-spec`}
                    onClick={() => setOpenId(isOpen ? null : project.id)}
                  >
                    {isOpen ? "Close spec ↑" : "Open spec ↓"}
                    <span className="visually-hidden"> for {project.name}</span>
                  </button>
                )}
                {project.links?.map((link) => (
                  <Button key={link.url} href={link.url} variant="secondary" iconEnd="↗">
                    {link.label}
                    <span className="visually-hidden"> for {project.name}</span>
                  </Button>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      {canExpand && (
        <MoreToggle
          expanded={expanded}
          total={total}
          noun="projects"
          controls="projects-list"
          sectionId="work"
          onToggle={toggle}
        />
      )}
    </Section>
  );
}
