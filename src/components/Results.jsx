import React from "react";
import SchemeCard from "./SchemeCard";
import { STATUS } from "../hooks/useSchemes";
import styles from "./Results.module.css";

export default function Results({ status, schemes, error, profile, onReset }) {
  if (status === STATUS.IDLE) return null;

  if (status === STATUS.LOADING) {
    return (
      <section className={styles.wrap}>
        <div className={styles.loadingHeader}>
          <div className={styles.spinnerLg} />
          <div>
            <p className={styles.loadingTitle}>Matching schemes for your profile...</p>
            <p className={styles.loadingSub}>Scanning central and {profile?.state} state databases</p>
          </div>
        </div>
        <div className={styles.skeletons}>
          {[1, 2, 3, 4].map(i => <div key={i} className={`${styles.skel} skeleton`} style={{ animationDelay: `${i * 0.1}s` }} />)}
        </div>
      </section>
    );
  }

  if (status === STATUS.ERROR) {
    return (
      <section className={styles.wrap}>
        <div className={styles.statusBox}>
          <p className={styles.errorTitle}>Could not fetch results</p>
          <p className={styles.errorMsg}>{error}</p>
          <button className={styles.retryBtn} onClick={onReset}>Try again</button>
        </div>
      </section>
    );
  }

  if (status === STATUS.SUCCESS && !schemes.length) {
    return (
      <section className={styles.wrap}>
        <div className={styles.statusBox}>
          <p className={styles.errorTitle}>No matching schemes found</p>
          <p className={styles.errorMsg}>Try adjusting your categories or income range.</p>
          <button className={styles.retryBtn} onClick={onReset}>Search again</button>
        </div>
      </section>
    );
  }

  const highCount = schemes.filter(s => s.match === "High").length;

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.eyebrow}>Recommended matches</p>
          <h2 className={styles.title}>
            {schemes.length} schemes found
          </h2>
          <p className={styles.subtitle}>
            for {profile?.gender?.toLowerCase()} / {profile?.age} / {profile?.state} / {profile?.caste}
          </p>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.highCount}>{highCount} strong match</span>
          <button className={styles.newSearchBtn} onClick={onReset}>New search</button>
        </div>
      </div>

      <div className={styles.list}>
        {schemes.map((s, i) => <SchemeCard key={s.name || i} scheme={s} index={i} />)}
      </div>

      <div className={styles.disclaimer}>
        Results are AI-generated based on your inputs. Verify eligibility at{" "}
        <a href="https://www.myscheme.gov.in/" target="_blank" rel="noreferrer">myscheme.gov.in</a>
        {" "}before applying.
      </div>
    </section>
  );
}
