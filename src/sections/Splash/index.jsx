import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { profile, splashScreen } from "../../data/portfolio.js";
import { prefersReducedMotion } from "../../hooks/useMotion.js";
import styles from "./Splash.module.css";

const EXIT_MS = 600;
const CELLS = 20;

/**
 * The loader as a spec line: name, role, and a row of 20 square cells
 * that fill one by one, with a 000–100 readout. Then it lifts away.
 * @param {{ onReveal: () => void, onFinish: () => void }} props
 */
export function Splash({ onReveal, onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const callbacks = useRef({ onReveal, onFinish });
  callbacks.current = { onReveal, onFinish };

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const reduce = prefersReducedMotion();
    const duration = reduce ? 300 : splashScreen.duration;
    const exitMs = reduce ? 150 : EXIT_MS;
    const start = performance.now();
    let frame;
    let exitTimer;

    const tick = (now) => {
      const value = Math.min(1, (now - start) / duration);
      setProgress(1 - Math.pow(1 - value, 2));
      if (value < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setIsExiting(true);
      root.style.overflow = "";
      callbacks.current.onReveal();
      exitTimer = setTimeout(() => callbacks.current.onFinish(), exitMs);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      root.style.overflow = "";
    };
  }, []);

  const filled = Math.round(progress * CELLS);

  return (
    <div
      className={clsx(styles.splash, isExiting && styles.exit)}
      role="status"
      aria-label={`Loading ${profile.displayName}`}
    >
      <div className={styles.inner} aria-hidden="true">
        <div className={styles.head}>
          <p className={styles.name}>{profile.displayName}</p>
          {profile.role && <p className={styles.role}>{profile.role}</p>}
        </div>
        <div className={styles.meter}>
          <span className={styles.cells}>
            {Array.from({ length: CELLS }, (_, index) => (
              <span key={index} className={clsx(styles.cell, index < filled && styles.on)} />
            ))}
          </span>
          <span className={styles.readout}>{String(Math.round(progress * 100)).padStart(3, "0")}</span>
        </div>
      </div>
    </div>
  );
}
