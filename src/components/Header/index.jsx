import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { navItems, firstSectionId, sectionNumbers } from "../../lib/section-registry.js";
import { profile } from "../../data/portfolio.js";
import { ThemeToggle } from "../ThemeToggle/index.jsx";
import styles from "./Header.module.css";

/** Track which nav section is currently on screen (scroll-spy). */
function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids.join("|")]);

  return active;
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const active = useActiveSection(navItems.map((item) => item.id));
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => event.key === "Escape" && setIsOpen(false);
    // Close once the sidebar layout takes over (same breakpoint as Header/Rail CSS)
    const onResize = () => window.matchMedia("(min-width: 1100px)").matches && setIsOpen(false);
    const root = document.documentElement;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const links = (className) =>
    navItems.map(({ id, navLabel }) => (
      <li key={id}>
        <a
          href={`#${id}`}
          className={clsx(className, active === id && styles.active)}
          aria-current={active === id ? "true" : undefined}
          onClick={close}
        >
          <span className={styles.num} aria-hidden="true">
            {sectionNumbers[id]}
          </span>
          {navLabel}
        </a>
      </li>
    ));

  return (
    <header className={clsx(styles.header, (isScrolled || isOpen) && styles.scrolled)}>
      <div className={styles.inner}>
        <a href={`#${firstSectionId}`} className={styles.brand} onClick={close}>
          <span className={styles.mark} aria-hidden="true" />
          {profile.displayName}
        </a>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul role="list" className={styles.list}>
            {links(styles.link)}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <span ref={progressRef} className={styles.progress} aria-hidden="true" />

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={clsx(styles.mobileNav, isOpen && styles.open)}
        hidden={!isOpen}
      >
        <ul role="list" className={styles.mobileList}>
          {links(styles.mobileLink)}
        </ul>
      </nav>
    </header>
  );
}
