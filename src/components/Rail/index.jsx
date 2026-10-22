import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { profile, socials } from "../../data/portfolio.js";
import { navItems, sectionNumbers, firstSectionId } from "../../lib/section-registry.js";
import { useLocalTime } from "../../hooks/useLocalTime.js";
import { ThemeToggle } from "../ThemeToggle/index.jsx";
import { SocialLinks } from "../SocialLinks/index.jsx";
import styles from "./Rail.module.css";

const AVAILABILITY = {
  open: "Open to opportunities",
  selective: "Open to selected roles",
};

// Where in the viewport a section counts as "being read"
const READ_LINE = 0.3;

/**
 * Per-section reading progress: writes --p (0–1) and a 000–100 readout on
 * each index row, and returns the id of the section under the read line.
 */
function useSectionProgress(ids, rowRefs) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * READ_LINE;
      let current = null;
      ids.forEach((id) => {
        const node = document.getElementById(id);
        const row = rowRefs.current[id];
        if (!node || !row) return;
        const rect = node.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
        row.style.setProperty("--p", progress.toFixed(3));
        const readout = row.querySelector("[data-readout]");
        if (readout) readout.textContent = String(Math.round(progress * 100)).padStart(3, "0");
        if (rect.top <= line && rect.bottom > line) current = id;
      });
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids.join("|")]);

  return active;
}

/** Sticky sidebar (≥1100px) set like a data sheet's title block. */
export function Rail() {
  const rowRefs = useRef({});
  const active = useSectionProgress(
    navItems.map((item) => item.id),
    rowRefs,
  );
  const time = useLocalTime(profile.timeZone);
  const availability = AVAILABILITY[profile.availability];
  const year = new Date().getFullYear();

  return (
    <aside className={styles.rail} aria-label="Profile and sections">
      <div className={styles.identity}>
        <p className={styles.docId}>Portfolio · {year}</p>
        <a href={`#${firstSectionId}`} className={styles.name}>
          {profile.displayName}
        </a>
        {profile.role && <p className={styles.role}>{profile.role}</p>}
        {availability && (
          <p className={styles.status}>
            <span className={styles.mark} aria-hidden="true" />
            {availability}
          </p>
        )}
      </div>

      <nav aria-label="Sections" className={styles.nav}>
        <p className={styles.navHead}>
          <span>Section</span>
          <span>Read</span>
        </p>
        <ol role="list" className={styles.list}>
          {navItems.map(({ id, navLabel }) => (
            <li
              key={id}
              ref={(node) => {
                rowRefs.current[id] = node;
              }}
            >
              <a
                href={`#${id}`}
                className={clsx(styles.link, active === id && styles.active)}
                aria-current={active === id ? "true" : undefined}
              >
                <span className={styles.num}>{sectionNumbers[id]}</span>
                <span className={styles.label}>{navLabel}</span>
                <span className={styles.readout} data-readout="" aria-hidden="true">
                  000
                </span>
                <span className={styles.bar} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <dl className={styles.foot}>
        {profile.resumeUrl && (
          <div>
            <dt>Resume</dt>
            <dd>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                Open ↗
              </a>
            </dd>
          </div>
        )}
        {time && (
          <div>
            <dt>Local time</dt>
            <dd>{time}</dd>
          </div>
        )}
        <div>
          <dt>Theme</dt>
          <dd>
            <ThemeToggle />
          </dd>
        </div>
        {socials.display && (
          <div className={styles.socials}>
            <dt className="visually-hidden">Links</dt>
            <dd>
              <SocialLinks links={socials.links} />
            </dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
