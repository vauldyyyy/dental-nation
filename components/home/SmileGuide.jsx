"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPreference } from "../motion/MotionProvider";
import { telHref, waUrl } from "../../lib/business";

const questions = [
  { title: "What brings you here?", options: [
    { id: "routine", label: "A check-up or cleaning", scores: { routine: 5 } },
    { id: "pain", label: "Pain, sensitivity or an injury", scores: { assessment: 7 } },
    { id: "appearance", label: "The look of my smile", scores: { smile: 5, alignment: 1 } },
    { id: "damaged", label: "A damaged or missing tooth", scores: { restore: 5 } },
    { id: "child", label: "Care for a child", scores: { family: 7 } },
  ] },
  { title: "What would you most like to explore?", options: [
    { id: "prevention", label: "Keeping my teeth healthy", scores: { routine: 3 } },
    { id: "answers", label: "Understanding what is going on", scores: { assessment: 3 } },
    { id: "colour", label: "Colour, shape or confidence", scores: { smile: 3 } },
    { id: "straight", label: "Straighter teeth or my bite", scores: { alignment: 5 } },
    { id: "function", label: "Repairing or replacing a tooth", scores: { restore: 3 } },
  ] },
  { title: "Who is this visit for?", options: [
    { id: "adult", label: "Me, as an adult", scores: {} },
    { id: "young", label: "A child or teenager", scores: { family: 4 } },
    { id: "someone", label: "Someone I care for", scores: {} },
  ] },
  { title: "What would help you feel ready?", options: [
    { id: "plan", label: "A clear assessment and options", scores: { assessment: 1 } },
    { id: "gentle", label: "A gentle routine appointment", scores: { routine: 1, family: 1 } },
    { id: "smile-talk", label: "A conversation about my smile", scores: { smile: 1, alignment: 1 } },
    { id: "repair-talk", label: "A plan to restore comfort or function", scores: { restore: 1 } },
  ] },
];

const results = {
  routine: { eyebrow: "Everyday care", title: "Start with a check-up.", body: "A visit gives the dentist a chance to understand your oral health and talk through cleaning or other everyday care if it is appropriate.", href: "/treatments?category=everyday", link: "Explore everyday care", message: "I took the Dental Nation starting-point quiz. I would like to ask about a routine dental assessment." },
  assessment: { eyebrow: "A conversation first", title: "Let’s understand the concern.", body: "Pain or a sudden change can have different causes. Tell the clinic what you have noticed so a dentist can assess it and discuss the next step.", href: "/first-visit", link: "What to expect at a visit", message: "I took the Dental Nation starting-point quiz. I have a dental concern and would like to ask about an assessment." },
  smile: { eyebrow: "Smile options", title: "Explore what feels right for your smile.", body: "If you are thinking about colour, shape or confidence, begin with a conversation about your goals. The dentist can explain suitable options after an assessment.", href: "/treatments?category=smile", link: "Explore smile treatments", message: "I took the Dental Nation starting-point quiz. I would like to discuss options for my smile." },
  alignment: { eyebrow: "Alignment", title: "Talk about your bite and alignment.", body: "Braces and aligners are among the options offered at Dental Nation. A consultation is the right place to ask what may suit your teeth and goals.", href: "/treatments/braces-and-aligners", link: "Explore braces and aligners", message: "I took the Dental Nation starting-point quiz. I would like to ask about teeth alignment." },
  restore: { eyebrow: "Restorative care", title: "Begin with a restorative assessment.", body: "For a damaged or missing tooth, the dentist can examine what is happening and explain the available repair or replacement options.", href: "/treatments?category=restore", link: "Explore restorative care", message: "I took the Dental Nation starting-point quiz. I would like to discuss a damaged or missing tooth." },
  family: { eyebrow: "Family care", title: "A welcoming start for younger smiles.", body: "Share your child’s concern with the team. A pediatric dental visit can begin gently, with time for questions and an age-appropriate plan.", href: "/treatments/pediatric-dentistry", link: "Explore pediatric dentistry", message: "I took the Dental Nation starting-point quiz. I would like to ask about dental care for a child." },
};

function getResult(answers) {
  if (answers[0] === "pain") return "assessment";
  if (answers[0] === "child") return "family";
  const totals = Object.fromEntries(Object.keys(results).map(key => [key, 0]));
  questions.forEach((question, index) => {
    const option = question.options.find(item => item.id === answers[index]);
    Object.entries(option?.scores || {}).forEach(([key, value]) => { totals[key] += value; });
  });
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
}

function QuizDialog({ onClose, motionPaused }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const titleRef = useRef(null);
  const complete = step === questions.length;
  const match = useMemo(() => complete ? getResult(answers) : null, [answers, complete]);
  const result = match ? results[match] : null;

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    titleRef.current?.focus({ preventScroll: true });
    const onKey = event => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab") return;
      const focusables = [...(panelRef.current?.querySelectorAll('a[href],button:not([disabled])') || [])];
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); previousFocus?.focus?.(); };
  }, [onClose]);

  const choose = id => { if (panelRef.current) panelRef.current.scrollTop = 0; setAnswers(previous => [...previous.slice(0, step), id]); setStep(previous => previous + 1); };
  const back = () => { if (panelRef.current) panelRef.current.scrollTop = 0; setStep(previous => Math.max(0, previous - 1)); };
  const restart = () => { if (panelRef.current) panelRef.current.scrollTop = 0; setAnswers([]); setStep(0); };

  return createPortal(<motion.div className="smile-quiz__overlay" role="presentation" initial={motionPaused ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={motionPaused ? undefined : { opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <motion.div ref={panelRef} className="smile-quiz__dialog" role="dialog" aria-modal="true" aria-labelledby="smile-quiz-title" aria-describedby="smile-quiz-description" initial={motionPaused ? false : { opacity: 0, y: 34, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={motionPaused ? undefined : { opacity: 0, y: 24, scale: .98 }} transition={{ duration: motionPaused ? 0 : .36 }}>
      <div className="smile-quiz__top"><span>Dental Nation / Find your starting point</span><button ref={closeRef} type="button" onClick={onClose} aria-label="Close quiz">×</button></div>
      <div className="smile-quiz__content">
        {!complete ? <>
          <div className="smile-quiz__progress-line"><span>Question {step + 1} of {questions.length}</span><span>{String(step + 1).padStart(2, "0")} / 04</span></div>
          <div className="smile-quiz__progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax={questions.length} aria-valuenow={step + 1}><i style={{ width: `${(step + 1) / questions.length * 100}%` }} /></div>
          <AnimatePresence mode="wait"><motion.div key={step} initial={motionPaused ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={motionPaused ? undefined : { opacity: 0, x: -24 }} transition={{ duration: motionPaused ? 0 : .24 }} onAnimationComplete={() => titleRef.current?.focus({ preventScroll: true })}>
            <p className="smile-quiz__eyebrow">A little clarity goes a long way</p><h2 id="smile-quiz-title" ref={titleRef} tabIndex="-1">{questions[step].title}</h2>
            <p id="smile-quiz-description" className="smile-quiz__description">Choose what feels closest. There is no wrong answer.</p>
            <div className="smile-quiz__options">{questions[step].options.map((option, index) => <button type="button" key={option.id} className={answers[step] === option.id ? "is-selected" : ""} onClick={() => choose(option.id)}><span>{String(index + 1).padStart(2, "0")}</span>{option.label}<b aria-hidden="true">↗</b></button>)}</div>
          </motion.div></AnimatePresence>
          <div className="smile-quiz__bottom"><button type="button" className="smile-quiz__back" onClick={back} disabled={step === 0}>← Back</button><span>Four questions. Your next step.</span></div>
        </> : <motion.div className="smile-quiz__result" initial={motionPaused ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionPaused ? 0 : .32 }} onAnimationComplete={() => titleRef.current?.focus({ preventScroll: true })}>
          <p className="smile-quiz__eyebrow">Your starting point / {result.eyebrow}</p><h2 id="smile-quiz-title" ref={titleRef} tabIndex="-1">{result.title}</h2><p id="smile-quiz-description" className="smile-quiz__result-copy">{result.body}</p>
          <p className="smile-quiz__caveat">This guide is not a diagnosis. A dentist can advise after examining you.</p>
          {answers[0] === "pain" && <p className="smile-quiz__urgent">For uncontrolled bleeding, difficulty breathing or a serious facial injury, seek emergency medical care now. For a dental concern, call the clinic to discuss availability.</p>}
          <div className="smile-quiz__actions"><a className="button button--dark" href={waUrl(`Hello Dental Nation Clinic, ${result.message} Please let me know how to arrange a visit.`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp <span aria-hidden="true">↗</span></a>{answers[0] === "pain" && <a className="button button--ghost" href={telHref}>Call the clinic</a>}<a className="smile-quiz__explore" href={result.href}>{result.link} ↗</a></div>
          <div className="smile-quiz__bottom"><button type="button" className="smile-quiz__back" onClick={back}>← Previous answer</button><button type="button" className="smile-quiz__back" onClick={restart}>Retake the quiz ↻</button></div>
        </motion.div>}
      </div>
    </motion.div>
  </motion.div>, document.body);
}

export default function SmileGuide() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { motionPaused } = useMotionPreference();
  useEffect(() => setMounted(true), []);
  return <section id="smile-guide" className={`section smile-guide${motionPaused ? " smile-guide--paused" : ""}`} aria-labelledby="smile-guide-heading">
    <div className="smile-guide__ambient" aria-hidden="true"><i/><i/><i/></div>
    <div className="wrap smile-guide__layout"><div className="smile-guide__copy"><p className="eyebrow">Your path to care</p><h2 id="smile-guide-heading">Not sure where<br/>to <em>begin?</em></h2><p>Four simple questions can help you find a useful starting point. No diagnosis, no pressure—just a clearer next step.</p><button className="button button--light smile-guide__trigger" type="button" onClick={() => setOpen(true)}>Find your starting point <span aria-hidden="true">↗</span></button><small>Takes about a minute · No form required</small></div>
      <div className="smile-guide__art" aria-hidden="true"><div className="smile-guide__orbit smile-guide__orbit--outer"/><div className="smile-guide__orbit smile-guide__orbit--inner"/><div className="smile-guide__core"><span>01 — 04</span><strong>What matters<br/>to you?</strong><i>✳</i></div><span className="smile-guide__chip smile-guide__chip--one">Everyday care</span><span className="smile-guide__chip smile-guide__chip--two">Your smile</span><span className="smile-guide__chip smile-guide__chip--three">A conversation first</span></div></div>
    {mounted && <AnimatePresence>{open && <QuizDialog onClose={() => setOpen(false)} motionPaused={motionPaused}/>}</AnimatePresence>}
  </section>;
}
