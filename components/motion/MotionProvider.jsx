"use client";
import { createContext, useContext } from "react";
import { MotionConfig } from "framer-motion";

const alwaysRunning = { motionPaused: false, hydrated: true, reduced: false };
const MotionContext = createContext(alwaysRunning);
export function useMotionPreference(){ return useContext(MotionContext); }

export default function MotionProvider({ children }) {
  return <MotionContext.Provider value={alwaysRunning}><MotionConfig reducedMotion="never" transition={{ ease: [0.22,0.61,0.36,1] }}>{children}</MotionConfig></MotionContext.Provider>;
}
