import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.kicker}>
          <span className={styles.led} />
          Welfare Scheme Discovery
        </div>
        <h1 className={styles.heading}>
          Find the government schemes built for you.
        </h1>
        <p className={styles.body}>
          YojanaFind turns your profile into a focused shortlist of central and state welfare schemes,
          with eligibility clues, benefits, and official application links kept close at hand.
        </p>
        <div className={styles.trust}>
          <span>Official portal references</span>
          <span>AI-matched eligibility</span>
          <span>No login required</span>
        </div>
      </div>

      <aside className={styles.console} aria-label="Scheme matching console preview">
        <div className={styles.consoleTop}>
          <span className={styles.port} />
          <span className={styles.port} />
          <span className={styles.port} />
          <strong>YF-ELIGIBILITY-01</strong>
        </div>
        <div className={styles.screen}>
          <div className={styles.screenHeader}>
            <span><i /> SYSTEM READY</span>
            <b>PROFILE SCAN</b>
          </div>
          <div className={styles.matchGauge}>
            <div className={styles.radar} />
            <div>
              <span className={styles.gaugeNum}>100+</span>
              <p>active scheme records indexed for citizen discovery</p>
            </div>
          </div>
          <div className={styles.rows}>
            <div><span>Central schemes</span><b>Verified</b></div>
            <div><span>State benefits</span><b>Matched</b></div>
            <div><span>Application links</span><b>Ready</b></div>
          </div>
        </div>
        <div className={styles.consoleBottom}>
          <div>
            <span className={styles.statNum}>Rs 2.4L</span>
            <span className={styles.statLabel}>possible annual household benefit</span>
          </div>
          <div>
            <span className={styles.statNum}>67%</span>
            <span className={styles.statLabel}>citizens unaware of eligible schemes</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
