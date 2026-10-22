import { site, profile } from "../../data/portfolio.js";
import styles from "./Footer.module.css";

// A document footer: name · role · year, and a way back up
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.line}>
          <span className={styles.name}>{profile.displayName}</span>
          {profile.role && <span> · {profile.role}</span>}
        </p>
        <p className={styles.line}>
          © {year} {site.footerText}
        </p>
        <a href="#top" className={styles.top}>
          Top ↑
        </a>
      </div>
    </footer>
  );
}
