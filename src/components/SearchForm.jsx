import React, { useState } from "react";
import { STATES, CATEGORIES, INCOME_BRACKETS } from "../data/schemes";
import styles from "./SearchForm.module.css";

const GENDERS = ["Male", "Female", "Transgender", "Prefer not to say"];
const AGES    = ["Under 18", "18–25", "26–35", "36–50", "51–60", "60+"];
const CASTES  = ["General", "OBC", "SC", "ST", "EWS"];

export default function SearchForm({ onSubmit, loading }) {
  const [state,      setState]      = useState("");
  const [gender,     setGender]     = useState("");
  const [age,        setAge]        = useState("");
  const [caste,      setCaste]      = useState("");
  const [incomeIdx,  setIncomeIdx]  = useState(2);
  const [categories, setCategories] = useState([]);
  const [error,      setError]      = useState("");

  function toggle(val) {
    setCategories(prev => prev.includes(val) ? prev.filter(c => c !== val) : [...prev, val]);
  }

  function handleSubmit() {
    if (!state)   return setError("Please select your state.");
    if (!gender)  return setError("Please select your gender.");
    if (!age)     return setError("Please select your age range.");
    if (!caste)   return setError("Please select your caste category.");
    if (!categories.length) return setError("Please select at least one applicable category.");
    setError("");
    onSubmit({ state, gender, age, caste, income: INCOME_BRACKETS[incomeIdx].label, categories });
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sectionTitle}>Your profile</h2>
      <p className={styles.sectionSub}>Fill in your details to find schemes you're eligible for</p>

      <div className={styles.card}>

        {/* Basic Info */}
        <div className={styles.formSection}>
          <div className={styles.formSectionLabel}>Basic Information</div>
          <div className={styles.grid3}>
            <div className={styles.group}>
              <label className={styles.label}>State / UT</label>
              <div className={styles.selectWrap}>
                <select className={styles.select} value={state} onChange={e => setState(e.target.value)}>
                  <option value="">Select state</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
                <span className={styles.arrow}>▾</span>
              </div>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Gender</label>
              <div className={styles.selectWrap}>
                <select className={styles.select} value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="">Select gender</option>
                  {GENDERS.map(g => <option key={g}>{g}</option>)}
                </select>
                <span className={styles.arrow}>▾</span>
              </div>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Age Range</label>
              <div className={styles.selectWrap}>
                <select className={styles.select} value={age} onChange={e => setAge(e.target.value)}>
                  <option value="">Select age</option>
                  {AGES.map(a => <option key={a}>{a}</option>)}
                </select>
                <span className={styles.arrow}>▾</span>
              </div>
            </div>
          </div>
        </div>

        {/* Economic Info */}
        <div className={styles.formSection}>
          <div className={styles.formSectionLabel}>Economic Background</div>
          <div className={styles.grid2}>
            <div className={styles.group}>
              <label className={styles.label}>Caste / Reservation Category</label>
              <div className={styles.selectWrap}>
                <select className={styles.select} value={caste} onChange={e => setCaste(e.target.value)}>
                  <option value="">Select category</option>
                  {CASTES.map(c => <option key={c}>{c}</option>)}
                </select>
                <span className={styles.arrow}>▾</span>
              </div>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Annual Family Income</label>
              <div className={styles.sliderWrap}>
                <div className={styles.sliderTop}>
                  <span className={styles.sliderValLabel}>Drag to adjust</span>
                  <span className={styles.sliderVal}>{INCOME_BRACKETS[incomeIdx].label}</span>
                </div>
                <input type="range" className={styles.slider}
                  min={0} max={INCOME_BRACKETS.length - 1}
                  value={incomeIdx} onChange={e => setIncomeIdx(Number(e.target.value))} />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className={styles.formSection}>
          <div className={styles.formSectionLabel}>I belong to (select all that apply)</div>
          <div className={styles.chips}>
            {CATEGORIES.map(c => (
              <button key={c.value} type="button"
                className={`${styles.chip} ${categories.includes(c.value) ? styles.chipActive : ""}`}
                onClick={() => toggle(c.value)}>
                <span>{c.emoji}</span><span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Submit row */}
        <div className={styles.submitRow}>
          <p className={styles.submitHint}>
            Results are AI-matched using Gemini. Always verify eligibility on official portals before applying.
          </p>
          <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading} type="button">
            {loading
              ? <><span className={styles.spinner}/> Searching…</>
              : <>Find Schemes →</>}
          </button>
        </div>
      </div>
    </div>
  );
}
