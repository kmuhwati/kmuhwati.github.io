import { profile, socials } from "../../data/portfolio.js";
import { formatLocation } from "../../lib/dates.js";
import { Section } from "../../components/Section/index.jsx";
import { Button } from "../../components/Button/index.jsx";
import { SocialLinks } from "../../components/SocialLinks/index.jsx";
import styles from "./Contact.module.css";

const AVAILABILITY = {
  open: "Open to opportunities",
  selective: "Open to selected roles",
};

// A heavy title over a ruled key/value table
export function Contact({ number }) {
  const given = profile.givenName || profile.displayName;
  const location = formatLocation(profile.location);
  const availability = AVAILABILITY[profile.availability];
  const others = (socials.links || []).filter((link) => link.id !== "email");

  const rows = [
    profile.email && ["Email", <a href={`mailto:${profile.email}`}>{profile.email} →</a>],
    profile.phone && ["Phone", <a href={`tel:${profile.phone}`}>{profile.phoneDisplay || profile.phone}</a>],
    location && ["Based in", location],
    availability && [
      "Status",
      <span className={styles.status}>
        <span className={styles.mark} aria-hidden="true" />
        {availability}
      </span>,
    ],
    profile.resumeUrl && [
      "Resume",
      <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
        Open ↗
      </a>,
    ],
    socials.display && others.length > 0 && ["Links", <SocialLinks links={others} />],
  ].filter(Boolean);

  return (
    <Section id="contact" number={number} title="Contact">
      <div className={styles.sheet} data-reveal="">
        <div className={styles.copy}>
          <h3 className={styles.title}>Write to <span className={styles.given}>{given}</span></h3>
          {profile.contactLead && <p className={styles.lead}>{profile.contactLead}</p>}
          {profile.email && (
            <Button href={`mailto:${profile.email}`} variant="primary" iconEnd="→">
              Email {given}
            </Button>
          )}
        </div>

        {rows.length > 0 && (
          <dl className={styles.details}>
            {rows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Section>
  );
}
