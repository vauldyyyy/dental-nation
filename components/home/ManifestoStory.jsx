"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionPreference } from "../motion/MotionProvider";

export default function ManifestoStory() {
  const ref = useRef(null);
  const { motionPaused } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, .36, .78, 1], motionPaused ? [0, 0, 0, 0] : [70, 0, 0, -34]);
  const titleX = useTransform(scrollYProgress, [0, .5, 1], motionPaused ? [0, 0, 0] : [-24, 0, 34]);
  const copyY = useTransform(scrollYProgress, [0, .42, .82, 1], motionPaused ? [0, 0, 0, 0] : [90, 0, 0, -24]);
  const lineProgress = useTransform(scrollYProgress, [.08, .66], [0, 1]);
  const orbX = useTransform(scrollYProgress, [0, 1], motionPaused ? [0, 0] : [-80, 110]);
  const orbY = useTransform(scrollYProgress, [0, 1], motionPaused ? [0, 0] : [60, -70]);
  const transitionY = useTransform(scrollYProgress, [.64, 1], motionPaused ? [0, 0] : [80, 0]);

  return <section ref={ref} className="manifesto-section manifesto-section--cinematic">
    <div className="manifesto-ambient" aria-hidden="true">
      <motion.i className="manifesto-ambient__orb manifesto-ambient__orb--one" style={{ x: orbX, y: orbY }} />
      <motion.i className="manifesto-ambient__orb manifesto-ambient__orb--two" style={{ x: motionPaused ? 0 : orbY, y: motionPaused ? 0 : orbX }} />
      <svg className="manifesto-enamel" viewBox="0 0 1200 460" preserveAspectRatio="none">
        <motion.path d="M-30 295 C165 80 330 75 470 245 C610 405 815 378 990 190 C1090 82 1170 102 1230 150" style={{ pathLength: motionPaused ? 1 : lineProgress }} />
        <motion.path className="manifesto-enamel__inner" d="M75 320 C245 170 345 172 470 290 C588 397 767 353 920 220" style={{ pathLength: motionPaused ? 1 : lineProgress }} />
      </svg>
    </div>

    <div className="wrap manifesto-grid manifesto-grid--cinematic">
      <motion.div style={{ y: titleY, x: titleX }}>
        <h2><span>Dental care can</span><br/><em>feel different.</em></h2>
        <div className="manifesto-kicker" aria-hidden="true"><span>Listen</span><span>Explain</span><span>Care</span></div>
      </motion.div>
      <motion.div className="manifesto-copy" style={{ y: copyY }}>
        <p>There is more to a visit than a chair and a treatment plan. It is the way you are welcomed, the questions that get answered, and the time you have to choose what feels right.</p>
        <div className="manifesto-rule"><span>DENTAL NATION</span><span>GOA, INDIA</span></div>
      </motion.div>
    </div>

    <div className="manifesto-marquee" aria-hidden="true"><span>LISTEN FIRST <b>✳</b> EXPLAIN CLEARLY <b>✳</b> CARE THOUGHTFULLY <b>✳</b> LISTEN FIRST <b>✳</b> EXPLAIN CLEARLY <b>✳</b> CARE THOUGHTFULLY <b>✳</b></span></div>
    <motion.div className="manifesto-transition" style={{ y: transitionY }} aria-hidden="true" />
  </section>;
}
