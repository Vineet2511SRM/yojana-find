import React, { useState } from "react";
import { KNOWN_URLS } from "../data/schemes";
import SchemeDetailModal from "./SchemeDetailModal";
import styles from "./SchemeCard.module.css";

function resolveUrl(aiUrl, schemeName) {
  const name = (schemeName || "").toLowerCase();

  // 1. Check known keywords for direct verified portal URLs
  for (const [keyword, url] of Object.entries(KNOWN_URLS)) {
    if (name.includes(keyword.toLowerCase())) return url;
  }

  // 2. Validate aiUrl: only trust if it's a valid URL with verified official domain suffix (.gov.in, .nic.in)
  if (aiUrl && typeof aiUrl === "string" && aiUrl.startsWith("https://")) {
    try {
      const parsed = new URL(aiUrl);
      const host = parsed.hostname.toLowerCase();
      if ((host.endsWith(".gov.in") || host.endsWith(".nic.in")) &&
          !aiUrl.includes("example.com") &&
          !aiUrl.includes("undefined")) {
        return aiUrl;
      }
    } catch {
      // Invalid URL format
    }
  }

  // 3. Smart fallback: search official myScheme portal for this exact scheme name
  // Ensures every scheme button works 100% of the time and lands on official govt search results!
  const cleanName = (schemeName || "").trim();
  return cleanName
    ? `https://www.myscheme.gov.in/search?search=${encodeURIComponent(cleanName)}`
    : "https://www.myscheme.gov.in/";
}

export default function SchemeCard({ scheme, index }) {
  const [modalOpen, setModalOpen] = useState(false);
  const isHigh = scheme.match === "High";
  const applyUrl = resolveUrl(scheme.applyUrl, scheme.name);

  return (
    <>
      <article
        className={styles.card}
        style={{ animationDelay: `${index * 0.06}s` }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && setModalOpen(true)}
      >
        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.topRow}>
              <span className={`${styles.matchPill} ${isHigh ? styles.high : styles.med}`}>
                {isHigh ? "Strong match" : "Possible match"}
              </span>
              <span className={styles.ministry}>{scheme.ministry}</span>
            </div>
            <h3 className={styles.name}>{scheme.name}</h3>
            <p className={styles.desc}>{scheme.description}</p>
            <div className={styles.tags}>
              {(scheme.tags || []).map((t, i) => (
                <span key={i} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.actions} onClick={e => e.stopPropagation()}>
            <a href={applyUrl} target="_blank" rel="noreferrer" className={styles.applyBtn}>
              Apply
            </a>
            <button className={styles.detailsBtn} onClick={() => setModalOpen(true)} type="button">
              Details
            </button>
          </div>
        </div>
      </article>

      {modalOpen && (
        <SchemeDetailModal
          scheme={scheme}
          applyUrl={applyUrl}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
