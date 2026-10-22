import { useState } from "react";
import clsx from "clsx";
import { credentials } from "../../data/portfolio.js";
import { formatMonthYear } from "../../lib/dates.js";
import { useExpandable } from "../../hooks/useExpandable.js";
import { Section } from "../../components/Section/index.jsx";
import { PlaceholderImage } from "../../components/PlaceholderImage/index.jsx";
import { MoreToggle } from "../../components/MoreToggle/index.jsx";
import styles from "./Credentials.module.css";

// Kinds stay distinct: a membership is not a certificate
const KINDS = [
  { kind: "certification", label: "Certification", plural: "Certifications", primaryLabel: "Verify" },
  { kind: "competition", label: "Competition", plural: "Competitions", primaryLabel: "Evidence" },
  { kind: "membership", label: "Membership", plural: "Memberships", primaryLabel: "Details" },
  { kind: "award", label: "Recognition", plural: "Awards", primaryLabel: "Details" },
  { kind: "volunteering", label: "Volunteering", plural: "Volunteering", primaryLabel: "Details" },
];
const KIND_BY_ID = Object.fromEntries(KINDS.map((entry) => [entry.kind, entry]));

function ProofLink({ href, children, context }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.proof}>
      {children} ↗{context && <span className="visually-hidden"> — {context}</span>}
    </a>
  );
}

function CredentialRow({ item }) {
  const kind = KIND_BY_ID[item.kind];
  const date = formatMonthYear(item.issued);
  const hasProof = item.credentialUrl || item.links?.length > 0;

  return (
    <li className={styles.row} data-reveal="">
      <PlaceholderImage
        src={item.image}
        alt={item.imageAlt || `${item.name} — ${kind?.label || "credential"}`}
        fallback={item.name}
        shape="thumb"
        className={styles.thumb}
      />

      <div className={styles.main}>
        <p className={styles.kind}>{kind?.label}</p>
        <h3 className={styles.name}>{item.name}</h3>
        {item.kind === "competition" && item.result && <p className={styles.result}>{item.result}</p>}
        {item.summary && <p className={styles.summary}>{item.summary}</p>}
      </div>

      <dl className={styles.facts}>
        {item.issuer && (
          <div>
            <dt>Issuer</dt>
            <dd>{item.issuer}</dd>
          </div>
        )}
        {date && (
          <div>
            <dt>Date</dt>
            <dd>
              <time dateTime={item.issued}>{date}</time>
            </dd>
          </div>
        )}
        {hasProof && (
          <div>
            <dt>Proof</dt>
            <dd className={styles.proofs}>
              {item.credentialUrl && (
                <ProofLink href={item.credentialUrl} context={item.name}>
                  {kind?.primaryLabel || "View"}
                </ProofLink>
              )}
              {item.links?.map((link) => (
                <ProofLink key={link.url} href={link.url} context={item.name}>
                  {link.label}
                </ProofLink>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </li>
  );
}

// A register: thumbnail, credential, then issuer, date and proof in mono
export function Credentials({ number }) {
  const [filter, setFilter] = useState("all");
  const items = credentials.items || [];
  const ordered = KINDS.flatMap(({ kind }) => items.filter((item) => item.kind === kind));
  const kinds = KINDS.filter(({ kind }) => items.some((item) => item.kind === kind));
  const filtered = filter === "all" ? ordered : ordered.filter((item) => item.kind === filter);
  const { visible, expanded, canExpand, total, toggle } = useExpandable(
    filtered,
    credentials.initialCount,
  );

  return (
    <Section
      id="credentials"
      number={number}
      title={credentials.title}
      meta={`${items.length} on record`}
      lead={credentials.lead}
    >
      {kinds.length > 1 && (
        <div className={styles.filters} role="group" aria-label="Filter credentials" data-reveal="">
          {[{ kind: "all", plural: "All" }, ...kinds].map(({ kind, plural }) => {
            const count = kind === "all" ? items.length : items.filter((i) => i.kind === kind).length;
            return (
              <button
                key={kind}
                type="button"
                className={clsx(styles.filter, filter === kind && styles.filterActive)}
                aria-pressed={filter === kind}
                onClick={() => setFilter(kind)}
              >
                {plural}
                <span className={styles.filterCount}>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className={styles.table}>
        <div className={styles.headRow} aria-hidden="true">
          <span />
          <span>Credential</span>
          <span>Issuer · Date · Proof</span>
        </div>
        <ul role="list" id="credentials-list" className={styles.list}>
          {visible.map((item) => (
            <CredentialRow key={item.id} item={item} />
          ))}
        </ul>
      </div>

      {canExpand && (
        <MoreToggle
          expanded={expanded}
          total={total}
          noun={filter === "all" ? "credentials" : KIND_BY_ID[filter].plural.toLowerCase()}
          controls="credentials-list"
          sectionId="credentials"
          onToggle={toggle}
        />
      )}
    </Section>
  );
}
