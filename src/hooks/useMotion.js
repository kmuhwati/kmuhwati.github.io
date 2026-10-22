import { useEffect, useState } from "react";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fine pointer (mouse/trackpad) and motion allowed: gate for cursor-driven effects. */
export function canUsePointerEffects() {
  return window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion();
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
