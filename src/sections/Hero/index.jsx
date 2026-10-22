import { useEffect, useState } from "react";
import clsx from "clsx";
import { profile, socials, projects } from "../../data/portfolio.js";
import { formatLocation } from "../../lib/dates.js";
import { applyJsonLd } from "../../lib/jsonLd.js";
import { assetUrl } from "../../lib/assetUrl.js";
import { useIntroDone } from "../../context/IntroContext.jsx";
import { useLocalTime } from "../../hooks/useLocalTime.js";
import { Button } from "../../components/Button/index.jsx";
import { SocialLinks } from "../../components/SocialLinks/index.jsx";
import styles from "./Hero.module.css";

const AVAILABILITY = {
  open: "Open to opportunities",
  selective: "Open to selected roles",
};

/** Only offer /resume.pdf when a real (non-empty) PDF is deployed. */
function useLocalResume() {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const href = assetUrl("resume.pdf");
    fetch(href, { method: "HEAD" })
      .then((response) => {
        const type = response.headers.get("content-type") || "";
        const length = response.headers.get("content-length");
        if (response.ok && type.includes("pdf") && length !== "0") setUrl(href);
      })
      .catch(() => {});
  }, []);

  return url;
}

export function Hero() {
  const ready = useIntroDone();
  const localResume = useLocalResume();
  const time = useLocalTime(profile.timeZone);
  const location = formatLocation(profile.location);
  const availability = AVAILABILITY[profile.availability];

  useEffect(() => {
    applyJsonLd();
  }, []);

  const step = (index) => ({ "--d": `${120 + index * 100}ms` });

  const facts = [
    ["Role", profile.role],
    ["Based in", location],
    ["Status", availability, true],
    ["Local time", time],
  ].filter(([, value]) => value);

  return (
    <section id="hero" className={clsx(styles.hero, ready && styles.ready)} aria-labelledby="hero-title">
      <div className={styles.container}>
        <h1 id="hero-title" className={clsx(styles.name, styles.enter)} style={step(0)}>
          {profile.displayName}
        </h1>

        {facts.length > 0 && (
          <dl className={clsx(styles.facts, styles.enter)} style={step(1)}>
            {facts.map(([label, value, marked]) => (
              <div key={label} className={styles.fact}>
                <dt>{label}</dt>
                <dd>
                  {marked && <span className={styles.mark} aria-hidden="true" />}
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className={clsx(styles.intro, styles.enter)} style={step(2)}>
          {profile.headline && <p className={styles.headline}>{profile.headline}</p>}
          {profile.summary && <p className={styles.summary}>{profile.summary}</p>}
          <div className={styles.actions}>
            {projects.display && (
              <Button href="#work" iconEnd="↓">
                View projects
              </Button>
            )}
            {profile.resumeUrl && (
              <Button href={profile.resumeUrl} variant="secondary" newTab iconEnd="↗">
                Resume
              </Button>
            )}
            {localResume && !profile.resumeUrl && (
              <Button href={localResume} variant="text" newTab>
                PDF
              </Button>
            )}
            {socials.display && <SocialLinks links={socials.links} className={styles.socials} />}
          </div>
        </div>
      </div>
    </section>
  );
}
