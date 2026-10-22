import { useEffect, useState } from "react";
import { assetUrl } from "../lib/assetUrl.js";

/**
 * Fetch an optional JSON file from /public. Never throws: a missing or
 * malformed file resolves to `data: null` with a console warning.
 * @param {string} fileName e.g. "profile.json"
 * @param {boolean} [enabled=true]
 * @returns {{ data: any, status: "idle" | "loading" | "ready" | "error" }}
 */
export function useJson(fileName, enabled = true) {
  const [state, setState] = useState({
    data: null,
    status: enabled ? "loading" : "idle",
  });

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;

    fetch(assetUrl(fileName))
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setState({ data, status: "ready" });
      })
      .catch((error) => {
        console.warn(`${fileName} unavailable:`, error.message);
        if (!cancelled) setState({ data: null, status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [fileName, enabled]);

  return state;
}
