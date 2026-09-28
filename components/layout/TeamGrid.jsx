"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { dentists } from "../../content/site";
import SourceImage from "../ui/SourceImage";
import { useMotionPreference } from "../motion/MotionProvider";

export default function TeamGrid({ compact=false }) {
  const { motionPaused } = useMotionPreference();
  return <motion.div className={`team-grid ${compact?'team-grid--compact':''}`} initial={motionPaused ? false : "hidden"} whileInView="show" viewport={{ once:true, amount:.16 }} variants={{ hidden:{}, show:{ transition:{ staggerChildren:.1 } } }}>
    {dentists.map((d,i)=><motion.article className="doctor-card" key={d.slug} variants={{ hidden:{ opacity:0, y:42, rotate:i%2 ? .8 : -.8 }, show:{ opacity:1, y:0, rotate:0, transition:{ duration:.72 } } }} whileHover={motionPaused ? undefined : { y:-7 }}>
      <Link className="doctor-card__link" href={`/dentists#${d.slug}`} aria-label={`Read about ${d.name}`}>
        <div className="doctor-card__portrait"><motion.div className="doctor-card__image-wrap" whileHover={motionPaused ? undefined : { scale:1.045 }} transition={{ duration:.6 }}><SourceImage sources={[d.localOfficial,d.sourceImage]} fallback={d.localFallback} alt={d.alt} loading="lazy"/></motion.div><span className="doctor-card__index" aria-hidden="true">0{i+1}</span></div>
        <div className="doctor-card__copy"><span>{d.credentials}</span><h3>{d.name}</h3><p>{d.role}</p><i aria-hidden="true">↗</i></div>
      </Link>
    </motion.article>)}
  </motion.div>;
}
