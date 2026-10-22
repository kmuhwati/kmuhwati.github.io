import clsx from "clsx";
import styles from "./SocialLinks.module.css";

function hrefFor(link) {
  if (link.id === "email" && !link.url.startsWith("mailto:")) {
    return `mailto:${link.url}`;
  }
  return link.url;
}

/**
 * Social links as plain mono text ("GitHub ↗"), no icon buttons.
 * @param {{
 *   links: { id: string, label: string, url: string }[],
 *   tone?: "default" | "onAccent",
 *   className?: string,
 * }} props
 */
export function SocialLinks({ links, tone = "default", className }) {
  const usable = (links || []).filter((link) => link?.url);
  if (!usable.length) return null;

  return (
    <ul role="list" aria-label="Social links" className={clsx(styles.list, styles[tone], className)}>
      {usable.map((link) => {
        const href = hrefFor(link);
        const external = !href.startsWith("mailto:");
        return (
          <li key={link.id}>
            <a
              href={href}
              className={styles.link}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {link.label}
              <span aria-hidden="true">{external ? " ↗" : " →"}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
