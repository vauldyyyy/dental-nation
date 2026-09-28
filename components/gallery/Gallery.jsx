"use client";
import { useEffect,useRef,useState } from "react";
import { AnimatePresence,motion,useScroll,useTransform } from "framer-motion";
import SourceImage from "../ui/SourceImage";
import { galleryRemote } from "../../content/site";
import { galleryAlt } from "../../content/gallery-media";
import { useMotionPreference } from "../motion/MotionProvider";

function GalleryTile({src,index,onOpen,motionPaused}){
 const ref=useRef(null); const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
 const drift=useTransform(scrollYProgress,[0,1],motionPaused?[0,0]:[index%2?28:-20,index%2?-28:24]);
 return <motion.button ref={ref} type="button" className={`gallery-tile gallery-tile--${index%5}`} onClick={()=>onOpen(index)} aria-label={`Open photo: ${galleryAlt[index]}`} initial={motionPaused?false:{opacity:0,y:28,clipPath:"inset(8% 8% 8% 8% round 28px)"}} whileInView={{opacity:1,y:0,clipPath:"inset(0% 0% 0% 0% round 18px)"}} viewport={{once:true,amount:.12}} transition={{duration:.7,delay:Math.min(index*.055,.28)}}><motion.div className="gallery-tile__media" style={{y:drift}}><SourceImage sources={[`/images/clinic/official/gallery-${String(index+1).padStart(2,'0')}.jpg`,src]} fallback={`/images/clinic/gallery-${String(index+1).padStart(2,'0')}-fallback.svg`} alt={galleryAlt[index]} loading="lazy"/></motion.div></motion.button>
}

export default function Gallery({limit}){
 const images=limit?galleryRemote.slice(0,limit):galleryRemote;const [active,setActive]=useState(null);const closeRef=useRef(null);const previous=useRef(null);const {motionPaused}=useMotionPreference();
 useEffect(()=>{if(active===null)return;previous.current=document.activeElement;const key=e=>{if(e.key==='Escape')setActive(null);if(e.key==='Tab'){const f=[...document.querySelectorAll('.lightbox button')];if(f.length){const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}if(e.key==='ArrowRight')setActive(n=>(n+1)%images.length);if(e.key==='ArrowLeft')setActive(n=>(n-1+images.length)%images.length)};document.addEventListener('keydown',key);requestAnimationFrame(()=>closeRef.current?.focus());return()=>{document.removeEventListener('keydown',key);previous.current?.focus?.()}},[active,images.length]);
 return <><div className="gallery-grid gallery-grid--editorial">{images.map((src,i)=><GalleryTile key={src} src={src} index={i} onOpen={setActive} motionPaused={motionPaused}/>)}</div>
 <AnimatePresence>{active!==null&&<motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Clinic gallery" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)setActive(null)}}><button ref={closeRef} className="lightbox__close" type="button" onClick={()=>setActive(null)}>Close ×</button><button className="lightbox__prev" type="button" onClick={()=>setActive(n=>(n-1+images.length)%images.length)} aria-label="Previous image">←</button><AnimatePresence mode="wait" initial={false}><motion.div key={active} className="lightbox__image" initial={motionPaused?false:{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} exit={motionPaused?undefined:{opacity:0,scale:.985}} transition={{duration:.28}}><SourceImage sources={[`/images/clinic/official/gallery-${String(active+1).padStart(2,'0')}.jpg`,images[active]]} fallback={`/images/clinic/gallery-${String(active+1).padStart(2,'0')}-fallback.svg`} alt={galleryAlt[active]}/></motion.div></AnimatePresence><button className="lightbox__next" type="button" onClick={()=>setActive(n=>(n+1)%images.length)} aria-label="Next image">→</button><span className="lightbox__count">{active+1} / {images.length}</span></motion.div>}</AnimatePresence></>;
}
