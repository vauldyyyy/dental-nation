"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { openingMedia } from "../../content/hero";
const MAX_OPEN_MS = Math.max(12000, Math.ceil(openingMedia.durationSeconds * 1000) + 3000);

export default function OpeningExperience() {
  const pathname = usePathname();
  // Render the film with the first homepage response so it is the first frame
  // visitors see, including on repeat visits and hard reloads.
  const [visible, setVisible] = useState(() => pathname === "/" && openingMedia.enabled);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const skipRef = useRef(null);
  const isHome = pathname === "/";
  const isOpen = isHome && visible;

  useEffect(() => {
    if (!isHome) setVisible(false);
  }, [isHome]);

  const finish = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus();
    const onKeyDown = event => { if (event.key === "Escape") finish(); };
    window.addEventListener("keydown", onKeyDown);
    const safetyTimer = window.setTimeout(finish, MAX_OPEN_MS);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(safetyTimer);
    };
  }, [isOpen, finish]);

  useEffect(() => {
    if (!isOpen) return;
    videoRef.current?.play().catch(() => setAutoplayBlocked(true));
  }, [isOpen]);

  return <AnimatePresence onExitComplete={() => document.getElementById("main-content")?.focus()}>
    {isOpen && <motion.div
      className="opening"
      role="dialog"
      aria-modal="true"
      aria-label="Dental Nation opening film"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .55, ease: [.22, .61, .36, 1] }}
    >
      <img className="opening__poster" src={openingMedia.poster} alt="" aria-hidden="true" fetchPriority="high" />
      <video
        ref={videoRef}
        className="opening__video"
        src={openingMedia.video}
        poster={openingMedia.poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onTimeUpdate={event => {
          const video = event.currentTarget;
          if (!Number.isFinite(video.duration) || !video.duration) return;
          const current = Math.min(100, Math.round(video.currentTime / video.duration * 100));
          setProgress(current);
          if (video.currentTime >= video.duration - .12) finish();
        }}
        onEnded={finish}
        onError={finish}
      />
      <div className="opening__scrim" aria-hidden="true" />
      <div className="opening__top">
        <div className="opening__brand"><img src="/brand/logo.svg" alt="Dental Nation Clinic" /></div>
        <button ref={skipRef} type="button" className="opening__skip" onClick={finish}>Skip intro <span aria-hidden="true">↗</span></button>
      </div>
      <div className="opening__bottom">
        <div className="opening__copy">
          <p className="opening__eyebrow">Dental Nation · Chinchinim, Goa</p>
          <p className="opening__line">A different perspective<br /><em>on your smile.</em></p>
        </div>
        <div className="opening__status">
          {autoplayBlocked && <button type="button" className="opening__watch" onClick={() => {
            videoRef.current?.play().then(() => setAutoplayBlocked(false)).catch(finish);
          }}>Play opening film</button>}
          <div className="opening__progress-label"><span>LOADING THE SITE</span><span>{String(progress).padStart(2, "0")}%</span></div>
          <div className="opening__progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
        </div>
      </div>
    </motion.div>}
  </AnimatePresence>;
}
