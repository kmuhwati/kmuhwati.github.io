import { useState } from "react";

/**
 * Show the first `limit` items with a toggle for the rest.
 * @template T
 * @param {T[]} items
 * @param {number | undefined} limit  falsy = show everything
 */
export function useExpandable(items, limit) {
  const [expanded, setExpanded] = useState(false);
  const canExpand = Boolean(limit) && items.length > limit;
  const visible = canExpand && !expanded ? items.slice(0, limit) : items;

  return {
    visible,
    expanded,
    canExpand,
    total: items.length,
    toggle: () => setExpanded((value) => !value),
  };
}
