"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionPreference } from "../motion/MotionProvider";

const pathways = [
  ["Everyday care","From check-ups and cleaning to the little things you have been putting off.","/images/clinic/official/gallery-01.jpg","/treatments?category=everyday"],
  ["Your smile","Explore options for alignment, colour and restoring teeth.","/images/clinic/official/gallery-06.jpg","/treatments?category=smile"],
  ["When something hurts","Get assessed, understand the cause and discuss appropriate next steps.","/images/clinic/official/gallery-02.jpg","/contact"],
];

function PathwayCard({ item, index, motionPaused }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], motionPaused ? [0, 0] : [index % 2 ? -24 : 30, index % 2 ? 28 : -24]);
  const [t,p,img,href] = item;
  return <motion.article ref={ref} className={`pathway-card pathway-card--${index + 1}`} initial={motionPaused ? false : { opacity: 0, y: 52, rotate: index === 1 ? .7 : -.7 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .76, delay: index * .1 }}>
    <a href={href} aria-label={`Explore ${t.toLowerCase()}`}>
      <div className="pathway-card__image"><motion.img src={img} alt="" loading="lazy" style={{ y: imageY }} /></div>
      <div className="pathway-card__copy"><h3>{t}</h3><p>{p}</p><b aria-hidden="true">↗</b></div>
    </a>
  </motion.article>;
}

export default function PathwaysSection() {
  const ref = useRef(null);
  const { motionPaused } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const motifX = useTransform(scrollYProgress, [0, 1], motionPaused ? [0, 0] : [-90, 120]);
  const motifY = useTransform(scrollYProgress, [0, 1], motionPaused ? [0, 0] : [60, -80]);
  return <section ref={ref} className="section pathways-section pathways-section--cinematic">
    <div className="pathways-motif" aria-hidden="true">
      <motion.span className="pathways-motif__ring pathways-motif__ring--one" style={{ x: motifX, y: motifY }}/>
      <motion.span className="pathways-motif__ring pathways-motif__ring--two" style={{ x: motionPaused ? 0 : motifY, y: motionPaused ? 0 : motifX }}/>
    </div>
    <div className="wrap">
      <div className="pathways-heading"><motion.div initial={motionPaused ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}><h2>Start with what<br/><em>matters to you.</em></h2></motion.div><motion.div initial={motionPaused ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .12 }}><p>You do not need to know the name of a treatment. Tell the clinic what is happening and begin with a conversation.</p></motion.div></div>
      <div className="pathways-grid">{pathways.map((item,index)=><PathwayCard key={item[0]} item={item} index={index} motionPaused={motionPaused}/>)}</div>
    </div>
  </section>;
}
