import clsx from "clsx";
import styles from "./Card.module.css";

/**
 * Surface container. `elevated` = cream feature card, `outline` = canvas with hairline,
 * `inverse` = dark product-surface card.
 * @param {{
 *   as?: keyof JSX.IntrinsicElements,
 *   variant?: "elevated" | "outline" | "inverse",
 *   padding?: "md" | "lg" | "none",
 *   className?: string,
 *   children: import('react').ReactNode,
 * } & Record<string, any>} props
 */
export function Card({
  as: Tag = "div",
  variant = "elevated",
  padding = "lg",
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={clsx(styles.card, styles[variant], styles[`pad-${padding}`], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
