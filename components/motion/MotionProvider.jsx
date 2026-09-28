"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

const MotionContext = createContext({ motionPaused: false, toggleMotion: () => {}, reduced: false });
export function useMotionPreference(){ return useContext(MotionContext); }

export default function MotionProvider({ children }) {
  const prefersReduced = useReducedMotion();
  const [manualPreference, setManualPreference] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("dn-motion-paused");
      if (saved !== null) setManualPreference(saved === "true");
    } catch { /* The motion control still works when storage is blocked. */ }
    setHydrated(true);
  }, []);
  useEffect(() => {
    const syncAcrossTabs = event => {
      if (event.key === "dn-motion-paused") setManualPreference(event.newValue === null ? null : event.newValue === "true");
    };
    window.addEventListener("storage", syncAcrossTabs);
    return () => window.removeEventListener("storage", syncAcrossTabs);
  }, []);
  const motionPaused = !hydrated || (manualPreference === null ? Boolean(prefersReduced) : manualPreference);
  useEffect(() => { document.documentElement.dataset.motion = motionPaused ? "paused" : "running"; }, [motionPaused]);
  useEffect(() => {
    if (!hydrated || manualPreference === null) return;
    try { window.localStorage.setItem("dn-motion-paused", String(manualPreference)); } catch { /* Ignore blocked storage. */ }
  }, [hydrated, manualPreference]);
  const toggleMotion = () => setManualPreference(previous => !(previous === null ? Boolean(prefersReduced) : previous));
  const value = useMemo(() => ({ motionPaused, toggleMotion, reduced: Boolean(prefersReduced), hydrated }), [motionPaused, prefersReduced, hydrated]);
  return <MotionContext.Provider value={value}><MotionConfig reducedMotion={motionPaused ? "always" : "never"} transition={{ ease: [0.22,0.61,0.36,1] }}>{children}</MotionConfig></MotionContext.Provider>;
}
