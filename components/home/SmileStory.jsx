"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionPreference } from "../motion/MotionProvider";

export default function SmileStory() {
  const ref = useRef(null);
  const { motionPaused } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const path = useTransform(scrollYProgress, [.1, .65], [0, 1]);
  const titleX = useTransform(scrollYProgress, [0, .5, 1], motionPaused ? [0,0,0] : [-28,0,34]);
  const glowX = useTransform(scrollYProgress, [0,1], motionPaused ? [0,0] : [-100,140]);
  return <section ref={ref} className="section note-section note-section--cinematic">
    <div className="smile-ambient" aria-hidden="true"><motion.i style={{ x: glowX }}/><motion.i style={{ x: motionPaused ? 0 : glowX, y: motionPaused ? 0 : -40 }}/></div>
    <svg className="smile-line" viewBox="0 0 1400 460" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M-50 140 C250 425 585 470 890 330 C1090 240 1210 90 1450 80" style={{ pathLength: motionPaused ? 1 : path }}/><motion.path className="smile-line__inner" d="M90 178 C330 350 610 390 860 305 C1040 244 1165 140 1330 118" style={{ pathLength: motionPaused ? 1 : path }}/></svg>
    <div className="wrap note-section__grid">
      <motion.div style={{ x: titleX }} initial={motionPaused ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8 }}><span className="note-section__star" aria-hidden="true">✳</span><p className="eyebrow">A note from Dental Nation</p><h2>Every smile has<br/><em>its own story.</em></h2></motion.div>
      <motion.div initial={motionPaused ? false : { opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .8, delay: .12 }}><p>Whether you are coming in for a regular check-up or something that has been on your mind for a while, begin where you are. The team will help you understand the options from there.</p><Link className="text-link" href="/contact">Start a conversation <b>↗</b></Link></motion.div>
    </div>
  </section>;
}
