import clsx from "clsx";
import { isExternal } from "../../lib/assetUrl.js";
import styles from "./Button.module.css";

/**
 * Link-or-button with the design system's button variants.
 * @param {{
 *   href?: string,
 *   variant?: "primary" | "secondary" | "onAccent" | "text",
 *   iconStart?: import('react').ReactNode,
 *   iconEnd?: import('react').ReactNode,
 *   newTab?: boolean,
 *   className?: string,
 *   children: import('react').ReactNode,
 * } & Record<string, any>} props
 */
export function Button({
  href,
  variant = "primary",
  iconStart,
  iconEnd,
  newTab,
  className,
  children,
  ...rest
}) {
  const classes = clsx(styles.button, styles[variant], className);
  const content = (
    <>
      {iconStart && <span className={styles.icon} aria-hidden="true">{iconStart}</span>}
      <span>{children}</span>
      {iconEnd && <span className={styles.icon} aria-hidden="true">{iconEnd}</span>}
    </>
  );

  if (href) {
    const openInNewTab = newTab ?? isExternal(href);
    return (
      <a
        href={href}
        className={classes}
        {...(openInNewTab && { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
