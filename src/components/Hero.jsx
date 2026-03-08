import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.kicker}>Welfare Scheme Discovery</div>
        <h1 className={styles.heading}>
          Which government<br />
          schemes are <em>yours?</em>
        </h1>
        <p className={styles.body}>
          Over 100 active central and state schemes exist for Indian citizens —
          most go unclaimed. Fill your profile and find out what you qualify for in seconds.
        </p>
        <div className={styles.trust}>
          <span>✓ Data from myscheme.gov.in</span>
          <span>✓ AI-matched to your profile</span>
          <span>✓ Free, no login needed</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.stat}>
          <div className={styles.statNum}>₹2.4L</div>
          <div className={styles.statLabel}>average annual benefit<br/>per eligible household</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <div className={styles.statNum}>67%</div>
          <div className={styles.statLabel}>eligible citizens<br/>unaware of their schemes</div>
        </div>
      </div>
    </section>
  );
}
