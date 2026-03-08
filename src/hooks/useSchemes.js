// ═══════════════════════════════════════════════════════
//  YOJANAFIND — useSchemes Hook
// ═══════════════════════════════════════════════════════

import { useState, useCallback } from "react";
import { fetchSchemesFromAI } from "../utils/api";

export const STATUS = {
  IDLE:    "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR:   "error",
};

export function useSchemes() {
  const [status,  setStatus]  = useState(STATUS.IDLE);
  const [schemes, setSchemes] = useState([]);
  const [error,   setError]   = useState(null);
  const [profile, setProfile] = useState(null);

  // No apiKey param — Gemini key comes from .env automatically
  const search = useCallback(async (formProfile) => {
    setStatus(STATUS.LOADING);
    setError(null);
    setSchemes([]);
    setProfile(formProfile);

    try {
      const results = await fetchSchemesFromAI(formProfile);
      setSchemes(results);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus(STATUS.ERROR);
    }
  }, []);

  const reset = useCallback(() => {
    setStatus(STATUS.IDLE);
    setSchemes([]);
    setError(null);
    setProfile(null);
  }, []);

  return { status, schemes, error, profile, search, reset };
}
