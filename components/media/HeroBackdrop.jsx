"use client";

import { motion } from "framer-motion";
import { heroMedia } from "../../content/hero";
import { useMotionPreference } from "../motion/MotionProvider";

export default function HeroBackdrop() {
  const { motionPaused } = useMotionPreference();
  return <div className="hero-film" style={{ "--hero-focus": heroMedia.focalPoint.desktop }}>
    <img className="hero-film__poster" src={heroMedia.still} alt="" aria-hidden="true" fetchPriority="high" />
    <motion.div className="hero-film__illumination" animate={motionPaused ? { opacity: 0.28 } : { x: ["-18%", "14%", "-18%"], opacity: [0.25, 0.58, 0.25] }} transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }} />
    <div className="hero-film__scrim" aria-hidden="true" />
  </div>;
}
