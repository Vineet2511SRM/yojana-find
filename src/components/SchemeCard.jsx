import React, { useState } from "react";
import { KNOWN_URLS } from "../data/schemes";
import SchemeDetailModal from "./SchemeDetailModal";
import styles from "./SchemeCard.module.css";

function resolveUrl(aiUrl, schemeName) {
  const name = (schemeName || "").toLowerCase();
  for (const [keyword, url] of Object.entries(KNOWN_URLS)) {
    if (name.includes(keyword)) return url;
  }
  if (aiUrl && typeof aiUrl === "string" && aiUrl.startsWith("https://") &&
    !aiUrl.includes("undefined") && !aiUrl.includes("example.com")) {
    return aiUrl;
  }
  return "https://www.myscheme.gov.in/";
}

export default function SchemeCard({ scheme, index }) {
  const [modalOpen, setModalOpen] = useState(false);
  const isHigh = scheme.match === "High";
  const applyUrl = resolveUrl(scheme.applyUrl, scheme.name);

  return (
    <>
      <div
        className={styles.card}
        style={{ animationDelay: `${index * 0.06}s` }}
        onClick={() => setModalOpen(true)}
        role="button" tabIndex={0}
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
              Details →
            </button>
          </div>
        </div>
      </div>

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
