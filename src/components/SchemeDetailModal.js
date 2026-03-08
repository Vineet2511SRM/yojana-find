import React, { useEffect } from "react";
import { HOW_TO_APPLY, DEFAULT_STEPS } from "../data/howToApply";
import styles from "./SchemeDetailModal.module.css";

export default function SchemeDetailModal({ scheme, applyUrl, onClose }) {
  const guideId = scheme.id || "";
  const guide   = HOW_TO_APPLY[guideId] || null;
  const steps   = guide?.steps || DEFAULT_STEPS;

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isHigh = scheme.match === "High";

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={`${styles.matchPill} ${isHigh ? styles.high : styles.med}`}>
              {isHigh ? "Strong match" : "Possible match"}
            </span>
            <p className={styles.ministry}>{scheme.ministry}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} type="button">✕</button>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{scheme.name}</h2>
          <p className={styles.desc}>{scheme.description}</p>

          {/* Benefit highlight */}
          <div className={styles.benefitBox}>
            <span className={styles.benefitLabel}>What you get</span>
            <span className={styles.benefitVal}>{scheme.benefits}</span>
          </div>

          {/* Eligibility */}
          <div className={styles.eligBox}>
            <span className={styles.eligLabel}>✓ Eligibility</span>
            <span className={styles.eligVal}>{scheme.eligibility}</span>
          </div>

          {/* Documents required */}
          {guide?.documents && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Documents Required</h3>
              <ul className={styles.docList}>
                {guide.documents.map((doc, i) => (
                  <li key={i} className={styles.docItem}>
                    <span className={styles.docDot} />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to apply steps */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>How to Apply</h3>
            <div className={styles.steps}>
              {steps.map((s, i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepNum}>{i + 1}</div>
                  <div className={styles.stepContent}>
                    <div className={styles.stepTitle}>{s.step}</div>
                    <div className={styles.stepDetail}>{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Helpline + processing time */}
          {guide && (
            <div className={styles.infoRow}>
              {guide.helpline && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Helpline</span>
                  <span className={styles.infoVal}>{guide.helpline}</span>
                </div>
              )}
              {guide.processingTime && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Processing Time</span>
                  <span className={styles.infoVal}>{guide.processingTime}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerNote}>
            Verify details at the official portal before applying
          </span>
          <a href={applyUrl} target="_blank" rel="noreferrer" className={styles.applyBtn}>
            Apply on Official Site →
          </a>
        </div>

      </div>
    </div>
  );
}
