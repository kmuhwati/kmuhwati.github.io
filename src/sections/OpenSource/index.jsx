import { useEffect } from "react";
import { GitFork, HardDrive, Star } from "lucide-react";
import { socials } from "../../data/portfolio.js";
import { useJson } from "../../hooks/useJson.js";
import { Section } from "../../components/Section/index.jsx";
import { Card } from "../../components/Card/index.jsx";
import { Button } from "../../components/Button/index.jsx";
import styles from "./OpenSource.module.css";

function formatSize(kb) {
  if (kb == null) return "";
  return kb < 1024 ? `${kb} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

export function OpenSource({ tone, number }) {
  const { data, status } = useJson("profile.json");
  const repos = data?.data?.user?.pinnedItems?.edges ?? data?.user?.pinnedItems?.edges ?? [];
  const github = socials.links?.find((link) => link.id === "github");

  useEffect(() => {
    if (status === "ready" && !repos.length) {
      console.warn("profile.json loaded but has no pinned repositories.");
    }
  }, [status, repos.length]);

  if (status !== "ready" || !repos.length) return null;

  return (
    <Section id="opensource" tone={tone} number={number} title="Open source">
      <ul role="list" className={styles.grid}>
        {repos.map(({ node: repo }, index) => (
          <Card
            as="li"
            key={repo.id}
            variant="outline"
            className={styles.card}
            data-reveal=""
            style={{ "--i": index % 3 }}
          >
            <a href={repo.url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              <h3 className={styles.name}>{repo.name}</h3>
            </a>
            {repo.description && <p className={styles.description}>{repo.description}</p>}
            <ul role="list" className={styles.stats}>
              {repo.primaryLanguage && (
                <li>
                  {/* Language colour comes from GitHub data, not the palette */}
                  <span
                    className={styles.lang}
                    style={{ background: repo.primaryLanguage.color || undefined }}
                    aria-hidden="true"
                  />
                  {repo.primaryLanguage.name}
                </li>
              )}
              <li>
                <Star aria-hidden="true" />
                <span className="visually-hidden">Stars: </span>
                {repo.stargazers?.totalCount ?? 0}
              </li>
              <li>
                <GitFork aria-hidden="true" />
                <span className="visually-hidden">Forks: </span>
                {repo.forkCount ?? 0}
              </li>
              {repo.diskUsage != null && (
                <li>
                  <HardDrive aria-hidden="true" />
                  <span className="visually-hidden">Size: </span>
                  {formatSize(repo.diskUsage)}
                </li>
              )}
            </ul>
          </Card>
        ))}
      </ul>
      {github && (
        <div className={styles.more}>
          <Button href={github.url} variant="secondary">
            More on GitHub
          </Button>
        </div>
      )}
    </Section>
  );
}
