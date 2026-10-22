import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { twitter } from "../../data/portfolio.js";
import { Section } from "../../components/Section/index.jsx";
import { Button } from "../../components/Button/index.jsx";
import styles from "./Twitter.module.css";

export function Twitter({ tone, number }) {
  const [failed, setFailed] = useState(false);
  const userName = twitter.userName?.replace(/^@/, "");
  if (!userName) return null;

  const profileUrl = `https://x.com/${userName}`;

  return (
    <Section id="twitter" tone={tone} number={number} title="Recent posts">
      {!failed && (
        <iframe
          className={styles.frame}
          src={`https://syndication.twitter.com/srv/timeline-profile/screen-name/${encodeURIComponent(userName)}`}
          title={`Posts by @${userName}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      {/* Embeds are often blocked by privacy settings; the link always works */}
      <p className={styles.fallback}>
        <Button href={profileUrl} variant="secondary" iconEnd={<ArrowUpRight />}>
          Open @{userName}
        </Button>
      </p>
    </Section>
  );
}
