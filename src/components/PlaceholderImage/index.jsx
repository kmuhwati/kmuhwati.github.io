import { useEffect, useState } from "react";
import clsx from "clsx";
import { assetUrl } from "../../lib/assetUrl.js";
import styles from "./PlaceholderImage.module.css";

/**
 * Image with a letter fallback when `src` is empty or fails to load.
 * @param {{
 *   src?: string,
 *   alt: string,
 *   fallback?: string,
 *   shape?: "square" | "circle" | "thumb" | "cover" | "wide",
 *   className?: string,
 * }} props
 */
export function PlaceholderImage({ src, alt, fallback, shape = "square", className }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  const letter = (fallback || alt || "?").trim().charAt(0).toUpperCase();

  return (
    <div className={clsx(styles.frame, styles[shape], className)}>
      {failed ? (
        <span className={styles.fallback} role="img" aria-label={alt}>
          {letter}
        </span>
      ) : (
        <img
          className={styles.image}
          src={assetUrl(src)}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
