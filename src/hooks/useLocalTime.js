import { useEffect, useState } from "react";

function formatTime(timeZone) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(new Date());
    const get = (type) => parts.find((part) => part.type === type)?.value || "";
    return `${get("hour")}:${get("minute")} ${get("timeZoneName")}`.trim();
  } catch {
    return ""; // unknown zone: hide the clock rather than show a wrong time
  }
}

/**
 * Live "14:32 GMT+2" for an IANA time zone, refreshed every 15 seconds.
 * @param {string | undefined} timeZone
 */
export function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    setTime(formatTime(timeZone));
    const id = setInterval(() => setTime(formatTime(timeZone)), 15000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}
