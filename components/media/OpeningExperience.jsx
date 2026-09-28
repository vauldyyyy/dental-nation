"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { openingMedia } from "../../content/hero";
import { useMotionPreference } from "../motion/MotionProvider";

const SEEN_KEY = "dn-opening-seen";
const MAX_OPEN_MS = Math.max(12000, Math.ceil(openingMedia.durationSeconds * 1000) + 3000);

export default function OpeningExperience() {
  const pathname = usePathname();
  const { motionPaused, hydrated } = useMotionPreference();
  // Never server-render a blocking overlay. The site remains usable if JS or
  // video loading fails before hydration.
  const [visible, setVisible] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const skipRef = useRef(null);
  const isHome = pathname === "/";
  const isOpen = isHome && visible;

  const finish = useCallback(() => {
    try { window.sessionStorage.setItem(SEEN_KEY, "true"); } catch { /* Storage may be unavailable. */ }
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!hydrated || !isHome || !openingMedia.enabled) return;
    const forcePreview = new URLSearchParams(window.location.search).has("intro");
    let seen = false;
    try { seen = window.sessionStorage.getItem(SEEN_KEY) === "true"; } catch { /* Keep a working skip and timeout. */ }
    if (motionPaused && !forcePreview) {
      finish();
      return;
    }
    setVisible(forcePreview || !seen);
  }, [hydrated, isHome, motionPaused, finish]);

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

  const play = isOpen && (!motionPaused || manualPlay);
  useEffect(() => {
    if (!play) return;
    videoRef.current?.play().catch(finish);
  }, [play, finish]);

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
      {play && <video
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
      />}
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
          {motionPaused && !manualPlay && <button type="button" className="opening__watch" onClick={() => setManualPlay(true)}>Watch the film</button>}
          <div className="opening__progress-label"><span>OPENING FILM</span><span>{String(progress).padStart(2, "0")}%</span></div>
          <div className="opening__progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
        </div>
      </div>
    </motion.div>}
  </AnimatePresence>;
}
