import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>य</div>
        YojanaFind
      </div>
      <div className={styles.right}>
        <span className={styles.navLink}>Central Schemes</span>
        <span className={styles.navLink}>State Schemes</span>
        <span className={styles.govBadge}>India.gov.in</span>
      </div>
    </nav>
  );
}
