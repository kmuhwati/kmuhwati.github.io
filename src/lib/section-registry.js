import { lazy } from "react";
import { Hero } from "../sections/Hero/index.jsx";
import { Skills } from "../sections/Skills/index.jsx";
import { Experience } from "../sections/Experience/index.jsx";
import { Education } from "../sections/Education/index.jsx";
import { Projects } from "../sections/Projects/index.jsx";
import { Credentials } from "../sections/Credentials/index.jsx";
import { Publications } from "../sections/Publications/index.jsx";
import { Talks } from "../sections/Talks/index.jsx";
import { Podcast } from "../sections/Podcast/index.jsx";
import { Contact } from "../sections/Contact/index.jsx";
import {
  profile,
  skills,
  education,
  experience,
  openSource,
  projects,
  credentials,
  publications,
  blogs,
  talks,
  twitter,
  podcast,
} from "../data/portfolio.js";

// Network-backed sections are split out; their chunk only loads when enabled and rendered.
const OpenSource = lazy(() =>
  import("../sections/OpenSource/index.jsx").then((m) => ({
    default: m.OpenSource,
  })),
);
const Blogs = lazy(() =>
  import("../sections/Blogs/index.jsx").then((m) => ({ default: m.Blogs })),
);
const Twitter = lazy(() =>
  import("../sections/Twitter/index.jsx").then((m) => ({ default: m.Twitter })),
);

/**
 * Section components accept an optional `tone` prop ("canvas" | "soft")
 * that App assigns so consecutive bands never share a surface.
 * @type {{ id: string, navLabel: string | null, enabled: boolean, Component: import('react').ComponentType<{ tone?: string }> }[]}
 */
export const sections = [
  { id: "hero", navLabel: null, enabled: profile.displayHero, Component: Hero },
  {
    id: "skills",
    navLabel: "Skills",
    enabled: skills.display,
    Component: Skills,
  },
  {
    id: "education",
    navLabel: "Education",
    enabled: education.display,
    Component: Education,
  },
  {
    id: "experience",
    navLabel: "Experience",
    enabled: experience.display,
    Component: Experience,
  },
  {
    id: "work",
    navLabel: "Projects",
    enabled: projects.display,
    Component: Projects,
  },
  {
    id: "opensource",
    navLabel: "Open Source",
    enabled: openSource.display,
    Component: OpenSource,
  },
  {
    id: "credentials",
    navLabel: "Credentials",
    enabled: credentials.display,
    Component: Credentials,
  },
  {
    id: "publications",
    navLabel: "Research",
    enabled: publications.display,
    Component: Publications,
  },
  {
    id: "blogs",
    navLabel: "Writing",
    enabled: blogs.display,
    Component: Blogs,
  },
  { id: "talks", navLabel: "Talks", enabled: talks.display, Component: Talks },
  {
    id: "twitter",
    navLabel: null,
    enabled: twitter.display,
    Component: Twitter,
  },
  {
    id: "podcast",
    navLabel: null,
    enabled: podcast.display,
    Component: Podcast,
  },
  { id: "contact", navLabel: "Contact", enabled: true, Component: Contact },
];

/** "01", "02"… for each enabled section after the hero, used by titles and nav. */
export const sectionNumbers = Object.fromEntries(
  sections
    .filter((section) => section.enabled && section.id !== "hero")
    .map((section, index) => [section.id, String(index + 1).padStart(2, "0")]),
);

export const navItems = sections.filter(
  (section) => section.enabled && section.navLabel,
);

/** The anchor the skip link targets: the first enabled section. */
export const firstSectionId =
  sections.find((section) => section.enabled)?.id ?? "contact";
