import { useEffect } from "react";
import { prefersReducedMotion } from "./useMotion.js";

/**
 * Page-wide scroll reveal. Any element with `data-reveal` fades up when it
 * enters the viewport (styles in global.css). Set `--i` on siblings to stagger.
 * A MutationObserver picks up sections that render later (lazy / fetched).
 */
export function useReveal() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const seen = new WeakSet();

    const observer = reduce
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.dataset.revealed = "true";
              observer.unobserve(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((node) => {
        if (seen.has(node)) return;
        seen.add(node);
        if (observer) observer.observe(node);
        else node.dataset.revealed = "true";
      });
    };

    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
    };
  }, []);
}
