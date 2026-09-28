"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { treatmentCategories, treatments } from "../../content/site";
import { treatmentImage, treatmentMedia } from "../../content/treatment-media";
import { useMotionPreference } from "../motion/MotionProvider";

const featuredSlugs = ["teeth-cleaning", "braces-and-aligners", "dental-implants"];
const featured = featuredSlugs.map(slug => treatments.find(treatment => treatment.slug === slug)).filter(Boolean);
const remaining = treatments.filter(treatment => !featuredSlugs.includes(treatment.slug));

function TreatmentCard({ treatment, size = "standard", index, duplicate = false, cardRef }) {
  const media = treatmentMedia[treatment.slug];
  return <article ref={cardRef} className={`treatment-photo-card treatment-photo-card--${size}`} aria-hidden={duplicate || undefined}>
    <Link href={`/treatments/${treatment.slug}`} aria-label={duplicate ? undefined : `Explore ${treatment.name}`} tabIndex={duplicate ? -1 : undefined}>
      <div className="treatment-photo-card__image">
        <Image src={treatmentImage(treatment.slug)} alt={duplicate ? "" : media.alt} fill sizes={size === "small" ? "(max-width: 760px) 48vw, 190px" : "(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"} quality={82} />
      </div>
      <div className="treatment-photo-card__copy">
        <h3>{treatment.name}</h3>
        <p>{treatment.sourceSummary}</p>
        <span className="treatment-photo-card__more">Explore treatment <b aria-hidden="true">↗</b></span>
      </div>
    </Link>
  </article>;
}

function TreatmentShowcase() {
  const railRef = useRef(null);
  const dragRef = useRef(null);
  const firstPrimaryRef = useRef(null);
  const firstLoopRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const manualPauseTimer = useRef(null);
  const { motionPaused } = useMotionPreference();
  const paused = motionPaused || hovered || focused || touched || dragging || manualPause;

  useEffect(() => () => window.clearTimeout(manualPauseTimer.current), []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || paused) return;
    // Snap points are useful for manual swipes but turn every tiny automatic
    // increment into a jump to the next card.
    const previousSnap = rail.style.scrollSnapType;
    rail.style.scrollSnapType = "none";
    let raf = 0;
    let previous = performance.now();
    // Keep fractional pixels between frames. Some browsers round scrollLeft on
    // assignment, so reading it on every frame can leave a slow rail frozen.
    let position = rail.scrollLeft;
    const tick = now => {
      const cycle = firstLoopRef.current && firstPrimaryRef.current ? firstLoopRef.current.offsetLeft - firstPrimaryRef.current.offsetLeft : 0;
      const dt = Math.min(50, now - previous);
      previous = now;
      position += dt * .032;
      if (cycle > 0 && position >= cycle) position -= cycle;
      rail.scrollLeft = position;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      rail.style.scrollSnapType = previousSnap;
    };
  }, [paused]);

  const loopDistance = () => firstLoopRef.current && firstPrimaryRef.current ? firstLoopRef.current.offsetLeft - firstPrimaryRef.current.offsetLeft : 0;
  const normalize = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cycle = loopDistance();
    if (cycle > 0 && rail.scrollLeft >= cycle) rail.scrollLeft -= cycle;
  };
  const scroll = direction => {
    const rail = railRef.current;
    if (!rail) return;
    setManualPause(true);
    window.clearTimeout(manualPauseTimer.current);
    manualPauseTimer.current = window.setTimeout(() => setManualPause(false), 750);
    const cycle = loopDistance();
    if (direction < 0 && rail.scrollLeft < 24 && cycle > 0) rail.scrollLeft += cycle;
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * .76, 610), behavior: motionPaused ? "auto" : "smooth" });
    window.setTimeout(normalize, 550);
  };
  const pointerDown = event => {
    if (event.pointerType === "touch") return;
    const rail = railRef.current;
    if (!rail) return;
    dragRef.current = { x: event.clientX, left: rail.scrollLeft, pointerId: event.pointerId, captured: false };
    suppressClickRef.current = false;
    setDragging(true);
  };
  const pointerMove = event => {
    if (!dragging || !dragRef.current || event.pointerType === "touch") return;
    const rail = railRef.current;
    if (!rail) return;
    if (Math.abs(event.clientX - dragRef.current.x) > 5 && !dragRef.current.captured) {
      // Capturing on pointer-down steals ordinary clicks from treatment links.
      rail.setPointerCapture?.(dragRef.current.pointerId);
      dragRef.current.captured = true;
      suppressClickRef.current = true;
    }
    if (!dragRef.current.captured) return;
    rail.scrollLeft = dragRef.current.left - (event.clientX - dragRef.current.x);
    normalize();
  };
  const pointerUp = event => {
    if (dragRef.current?.captured && event.pointerType !== "touch") railRef.current?.releasePointerCapture?.(event.pointerId);
    dragRef.current = null;
    setDragging(false);
    normalize();
    window.setTimeout(() => { suppressClickRef.current = false; }, 0);
  };

  return <div className="treatment-showcase">
    <motion.div className="treatment-showcase__featured" initial={motionPaused ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: .18 }} variants={{ hidden:{}, show:{ transition:{ staggerChildren:.11 } } }}>
      {featured.map(treatment => <motion.div key={treatment.slug} variants={{ hidden:{ opacity:0,y:34,scale:.97 }, show:{ opacity:1,y:0,scale:1,transition:{duration:.68} } }}><TreatmentCard treatment={treatment} size="featured" index={treatments.indexOf(treatment) + 1} /></motion.div>)}
    </motion.div>
    <div className="treatment-showcase__rail-head">
      <div><p className="eyebrow">Explore more care</p><h3>Every treatment, within reach.</h3></div>
      <div className="treatment-showcase__arrows"><button type="button" onClick={() => scroll(-1)} aria-label="Scroll treatments left">←</button><button type="button" onClick={() => scroll(1)} aria-label="Scroll treatments right">→</button></div>
    </div>
    <div
      ref={railRef}
      className={`treatment-showcase__rail ${dragging ? "is-dragging" : ""}`}
      role="region"
      aria-label="More dental treatments"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => { setTouched(false); normalize(); }}
      onScroll={normalize}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
      onClickCapture={event => { if (suppressClickRef.current) { event.preventDefault(); event.stopPropagation(); } }}
      onTouchCancel={() => { setTouched(false); normalize(); }}
    >
      {remaining.map((treatment, index) => <TreatmentCard key={`primary-${treatment.slug}`} treatment={treatment} size="small" index={treatments.indexOf(treatment) + 1} cardRef={index === 0 ? firstPrimaryRef : undefined} />)}
      {remaining.map((treatment, index) => <TreatmentCard key={`loop-${treatment.slug}`} treatment={treatment} size="small" index={treatments.indexOf(treatment) + 1} duplicate cardRef={index === 0 ? firstLoopRef : undefined} />)}
    </div>
    <p className="treatment-showcase__hint">Auto-moving rail · drag, swipe or use the arrows. Motion pauses while you interact.</p>
  </div>;
}

export default function TreatmentExplorer({ compact = false, initialCategory = "all" }) {
  const [category, setCategory] = useState(initialCategory);
  if (compact) return <TreatmentShowcase />;
  const visible = category === "all" ? treatments : treatments.filter(treatment => treatment.category === category);
  return <div className="treatment-explorer">
    <div className="filter-row" role="group" aria-label="Filter treatments">{treatmentCategories.map(item => <button type="button" key={item.id} className={category === item.id ? "is-active" : ""} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}</div>
    <motion.div layout className="treatment-photo-grid"><AnimatePresence mode="popLayout">{visible.map(treatment => <motion.div layout key={treatment.slug} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .32 }}><TreatmentCard treatment={treatment} index={treatments.indexOf(treatment) + 1} /></motion.div>)}</AnimatePresence></motion.div>
  </div>;
}
