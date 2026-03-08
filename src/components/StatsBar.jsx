import React from "react";
import styles from "./StatsBar.module.css";

const SCHEMES = [
  "PM-KISAN", "Ayushman Bharat", "PMAY", "NSP Scholarships",
  "MUDRA Yojana", "PM Ujjwala", "PMEGP", "Ladki Bahin", "Rythu Bandhu",
];

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.label}>Active schemes indexed:</div>
      <div className={styles.ticker}>
        {[...SCHEMES, ...SCHEMES].map((s, i) => (
          <span key={i} className={styles.item}>{s}</span>
        ))}
      </div>
    </div>
  );
}
