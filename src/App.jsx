import { Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { IntroContext } from "./context/IntroContext.jsx";
import { Header } from "./components/Header/index.jsx";
import { Rail } from "./components/Rail/index.jsx";
import { Footer } from "./components/Footer/index.jsx";
import { ScrollToTop } from "./components/ScrollToTop/index.jsx";
import { Splash } from "./sections/Splash/index.jsx";
import { sections, firstSectionId, sectionNumbers } from "./lib/section-registry.js";
import { useReveal } from "./hooks/useReveal.js";
import { splashScreen, profile } from "./data/portfolio.js";
import styles from "./App.module.css";

function Shell() {
  // introDone flips when the loader starts lifting, so the hero animates in underneath it
  const [introDone, setIntroDone] = useState(!splashScreen.enabled);
  const [showSplash, setShowSplash] = useState(splashScreen.enabled);

  useReveal();

  // The loader should always lift onto the hero, not a restored scroll position
  useEffect(() => {
    if (!splashScreen.enabled || window.location.hash) return;
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Same pattern as the static <title> in index.html, so crawlers and the tab agree
    document.title = [profile.displayName, profile.role].filter(Boolean).join(" - ");
  }, []);

  return (
    <IntroContext.Provider value={introDone}>
      <a className="skip-link" href={`#${firstSectionId}`}>
        Skip to content
      </a>
      {/* Desktop: sticky rail + reading column. Below 1100px: top bar + column. */}
      <div className={styles.layout}>
        <Rail />
        <div className={styles.column}>
          <Header />
          <main>
            <Suspense fallback={null}>
              {sections
                .filter((section) => section.enabled)
                .map(({ id, Component }) => (
                  <Component key={id} number={sectionNumbers[id]} />
                ))}
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
      <ScrollToTop />
      {showSplash && (
        <Splash onReveal={() => setIntroDone(true)} onFinish={() => setShowSplash(false)} />
      )}
    </IntroContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}
