"use client";

import { motion } from "framer-motion";
import SceneBackground from "../backgrounds/SceneBackground";
import OpenStatus from "../layout/OpenStatus";
import { useMotionPreference } from "../motion/MotionProvider";
import { business } from "../../content/site";
import { directionsUrl, telHref } from "../../lib/business";

export default function VisitSection() {
  const { motionPaused } = useMotionPreference();
  return <section className="section visit-section visit-section--cinematic">
    <SceneBackground preset="visit"/>
    <div className="visit-route-bg" aria-hidden="true"><svg viewBox="0 0 1400 800" preserveAspectRatio="none"><motion.path d="M-40 680 C230 485 300 650 520 430 C700 245 860 450 1035 255 C1190 80 1280 230 1440 120" initial={motionPaused ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: 2.1 }}/></svg></div>
    <div className="wrap visit-grid">
      <motion.div className="visit-copy" initial={motionPaused ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .75 }}>
        <p className="eyebrow">Find us in Chinchinim</p><h2>A clinic built into everyday Goa.</h2>
        <div className="visit-photo-chip"><img src="/images/clinic/official/gallery-10.jpg" alt="Waiting area inside Dental Nation Clinic in Chinchinim" loading="lazy"/><div><span>Chinchinim, Goa</span><OpenStatus/></div></div>
        <address>{business.address}</address><p>{business.hoursLabel}<br/>Sunday closed under the regular schedule.</p>
        <div className="hero-actions"><a className="button button--dark" href={directionsUrl} target="_blank" rel="noreferrer">Get directions</a><a className="button button--ghost" href={telHref}>Call {business.phoneDisplay}</a></div>
      </motion.div>
      <motion.div className="visit-location-card" initial={motionPaused ? false : { opacity: 0, scale: .96, y: 28 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .9, delay: .08 }}>
        <img src="/images/clinic/official/gallery-09.jpg" alt="Dental Nation reception desk and illuminated clinic sign" loading="lazy"/>
        <div className="visit-location-card__overlay"><span>FIND US IN CHINCHINIM</span><strong>Dental Nation<br/>Clinic</strong><a href={directionsUrl} target="_blank" rel="noreferrer">Open directions ↗</a></div>
      </motion.div>
    </div>
  </section>;
}
