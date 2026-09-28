"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionIntro from "../layout/SectionIntro";
import SceneBackground from "../backgrounds/SceneBackground";
import { useMotionPreference } from "../motion/MotionProvider";

const steps = [
  { n:"01", title:"Arrive", text:"Tell the team what brought you in and anything that makes dental visits difficult.", image:"/images/clinic/official/gallery-09.jpg", label:"Reception / arrival" },
  { n:"02", title:"Discuss", text:"The dentist listens to your concerns, symptoms, history and what matters to you.", image:"/images/clinic/official/gallery-03.jpg", label:"A room for conversation" },
  { n:"03", title:"Understand", text:"You are shown what the dentist can see and why an X-ray or another assessment may help.", image:"/images/treatments/official/dental-x-ray.webp", label:"See the full picture" },
  { n:"04", title:"Agree", text:"Appropriate options and next steps are explained before you decide how to proceed.", image:"/images/clinic/official/gallery-04.jpg", label:"A clear next step" },
];

export default function JourneyExperience() {
  const ref = useRef(null);
  const stepRefs = useRef([]);
  const { motionPaused } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 38%"] });
  const [active, setActive] = useState(0);
  const pathLength = useTransform(scrollYProgress, [.03, .92], [0, 1]);
  useEffect(() => {
    if (motionPaused) { setActive(0); return; }
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * .6;
        let next = 0;
        stepRefs.current.forEach((step, index) => {
          if (step?.getBoundingClientRect().top <= marker) next = index;
        });
        setActive(next);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [motionPaused]);

  return <section ref={ref} className="section journey-section journey-section--cinematic">
    <SceneBackground preset="journey"/>
    <div className="wrap">
      <SectionIntro eyebrow="Your experience" title="A visit that makes sense, step by step." lede="A little clarity can change how the whole visit feels. Here is what to expect."/>
      <div className="journey-experience">
        <div className="journey-scene-wrap">
          <div className="journey-scene" aria-hidden="true">
            <div className="journey-scene__top"><span>{steps[active].n}</span><span>{steps[active].label}</span></div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img key={motionPaused ? "still" : steps[active].image} src={motionPaused ? steps[0].image : steps[active].image} alt="" initial={motionPaused ? false : { opacity: 0, scale: 1.045 }} animate={{ opacity: 1, scale: 1 }} exit={motionPaused ? undefined : { opacity: 0, scale: .985 }} transition={{ duration: .62 }} />
            </AnimatePresence>
            <div className="journey-scene__shade"/>
            <div className="journey-scene__caption"><span>Dental Nation</span><strong>{motionPaused ? "Your visit" : steps[active].title}</strong></div>
          </div>
        </div>

        <div className="journey-steps" role="list">
          <div className="journey-track" aria-hidden="true"><svg viewBox="0 0 20 1000" preserveAspectRatio="none"><path className="journey-track__base" d="M10 0 C3 210 17 360 10 505 C4 680 17 820 10 1000"/><motion.path d="M10 0 C3 210 17 360 10 505 C4 680 17 820 10 1000" style={{ pathLength: motionPaused ? 1 : pathLength }}/></svg></div>
          {steps.map((step,index)=><motion.article ref={node => { stepRefs.current[index] = node; }} role="listitem" key={step.title} className={`journey-step journey-step--story ${motionPaused || index === active ? "is-active" : ""}`} initial={motionPaused ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .5 }}>
            <span className="journey-step__index">{step.n}</span><div><p className="eyebrow">Step {index + 1}</p><h3>{step.title}</h3><p>{step.text}</p></div><i aria-hidden="true"/>
          </motion.article>)}
        </div>
      </div>
    </div>
  </section>;
}
