"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SceneBackground from "../backgrounds/SceneBackground";
import SourceImage from "../ui/SourceImage";
import { useMotionPreference } from "../motion/MotionProvider";
import { galleryRemote } from "../../content/site";

export default function ClinicIntro() {
  const ref = useRef(null);
  const { motionPaused } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], motionPaused ? [0, 0] : [46, -58]);
  const copyY = useTransform(scrollYProgress, [0, 1], motionPaused ? [0, 0] : [20, -18]);
  const trace = useTransform(scrollYProgress, [.12, .65], [0, 1]);

  return <section ref={ref} className="section intro-section intro-section--cinematic">
    <SceneBackground preset="intro"/>
    <div className="intro-traces" aria-hidden="true">
      <svg viewBox="0 0 1200 520" preserveAspectRatio="none">
        <motion.path d="M-40 330 C250 90 360 145 545 320 C740 500 980 450 1240 175" style={{ pathLength: motionPaused ? 1 : trace }} />
        <motion.path d="M90 470 C280 245 510 235 650 375 C770 495 970 395 1110 170" style={{ pathLength: motionPaused ? 1 : trace }} />
      </svg>
    </div>
    <div className="wrap split-intro split-intro--cinematic">
      <motion.div className="split-intro__copy" style={{ y: copyY }} initial={motionPaused ? false : { opacity: 0, x: -38 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8 }}>
        <p className="eyebrow">Inside the clinic</p>
        <h2>Your concerns first.<br/><em>Your care, together.</em></h2>
        <p>Tell the team what is worrying you. They will take time to understand, explain what they find and help you make sense of the next step.</p>
        <p>From routine care to specialist treatment, the clinic welcomes local families, adults, children, older patients and visitors who need dental care while in Goa.</p>
        <Link className="text-link" href="/our-clinic">Discover the clinic <b>↗</b></Link>
      </motion.div>

      <motion.div className="editorial-photo editorial-photo--masked" style={{ y: photoY }} initial={motionPaused ? false : { clipPath: "inset(14% 10% 30% 10% round 240px 240px 28px 28px)", opacity: .25, scale: .96 }} whileInView={{ clipPath: "inset(0% 0% 0% 0% round 220px 220px 24px 24px)", opacity: 1, scale: 1 }} viewport={{ once: true, amount: .22 }} transition={{ duration: 1.05, ease: [.22,.61,.36,1] }}>
        <div className="editorial-photo__shine" aria-hidden="true" />
        <SourceImage sources={["/images/clinic/official/gallery-01.jpg",galleryRemote[0]]} fallback="/images/clinic/gallery-01-fallback.svg" alt="Dental Nation Clinic interior" loading="eager"/>
      </motion.div>
    </div>
  </section>;
}
