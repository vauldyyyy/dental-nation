"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useMotionPreference } from "../motion/MotionProvider";

export default function FilmChapter({ film }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(sectionRef, { margin: "100px" });
  const { motionPaused } = useMotionPreference();
  const [failed, setFailed] = useState(false);
  const canPlay = Boolean(film.src) && inView && !motionPaused && !failed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (canPlay) video.play().catch(() => setFailed(true));
    else video.pause();
  }, [canPlay]);

  return <section ref={sectionRef} className="film-chapter" aria-label={`${film.eyebrow} visual chapter`}>
    <motion.img className="film-chapter__poster" src={film.poster} alt={film.alt} animate={motionPaused ? { scale: 1, x: 0, y: 0 } : { scale: [1.03, 1.15, 1.03], x: ["-1.5%", "1.5%", "-1.5%"], y: ["1%", "-1%", "1%"] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
    {film.src && !failed && <video ref={videoRef} className="film-chapter__video" src={film.src} poster={film.poster} muted playsInline loop preload="none" aria-hidden="true" onError={() => setFailed(true)} />}
    <div className="film-chapter__shade" aria-hidden="true" />
    <div className="wrap film-chapter__frame">
      <div className="film-chapter__top"><span>DENTAL NATION</span><span>{film.eyebrow}</span></div>
      <div className="film-chapter__bottom"><div><p className="eyebrow">{film.eyebrow}</p><h2>{film.title}</h2><p>{film.line}</p></div><span aria-hidden="true">↓</span></div>
    </div>
  </section>;
}
