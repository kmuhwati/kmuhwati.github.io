import { skills } from "../../data/portfolio.js";
import { Section } from "../../components/Section/index.jsx";
import styles from "./Skills.module.css";

const LEVEL_SHORT = {
  expert: "exp",
  advanced: "adv",
  working: "wkg",
};

const LEVEL_LABELS = {
  expert: "Expert",
  advanced: "Advanced",
  working: "Working knowledge",
};

/** Items may be plain strings or { name, level }. */
const normalize = (item) => (typeof item === "string" ? { name: item } : item);

// A grid of category cards: numbered header, then the skills as compact tags
export function Skills({ number }) {
  const categories = (skills.categories || []).filter((category) => category.items?.length);
  const total = categories.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <Section
      id="skills"
      number={number}
      title={skills.title}
      meta={`${total} listed`}
      lead={skills.lead}
    >
      <ul role="list" className={styles.grid}>
        {categories.map((category, index) => (
          <li key={category.name} className={styles.card} data-reveal="" style={{ "--i": index % 3 }}>
            <h3 className={styles.header}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.category}>{category.name}</span>
              <span className={styles.count}>
                {String(category.items.length).padStart(2, "0")}
                <span className="visually-hidden"> skills</span>
              </span>
            </h3>
            <ul role="list" className={styles.items}>
              {category.items.map(normalize).map((item) => (
                <li key={item.name} className={styles.item}>
                  {item.name}
                  {item.level && (
                    <abbr className={styles.level} title={LEVEL_LABELS[item.level]}>
                      {LEVEL_SHORT[item.level]}
                    </abbr>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
