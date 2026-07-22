import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>YF</div>
        YojanaFind
      </div>
      <div className={styles.right}>
        <span className={styles.status}><span /> Index online</span>
        <a href="#search-form" className={styles.navLink}>Central Schemes</a>
        <a href="#search-form" className={styles.navLink}>State Schemes</a>
        <a
          href="https://india.gov.in"
          target="_blank"
          rel="noreferrer"
          className={styles.govBadge}
          aria-label="India.gov.in - National Portal of India (opens in new tab)"
        >
          India.gov.in
        </a>
      </div>
    </nav>
  );
}
