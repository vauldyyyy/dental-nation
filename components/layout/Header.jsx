"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence,motion } from "framer-motion";
import { useEffect,useRef,useState } from "react";

const navGroups=[
 {label:"Clinic",links:[{href:"/our-clinic",label:"Our Clinic"},{href:"/dentists",label:"Meet the Dentists"},{href:"/gallery",label:"Gallery"}]},
 {label:"Care",links:[{href:"/treatments",label:"Treatments"},{href:"/#reviews",label:"Reviews"},{href:"/first-visit",label:"Your First Visit"},{href:"/advice",label:"Patient Advice"}]},
];

export default function Header(){
 const pathname=usePathname(); const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false); const panel=useRef(null); const trigger=useRef(null);
 useEffect(()=>{setOpen(false)},[pathname]);
 useEffect(()=>{const on=()=>setScrolled(window.scrollY>20);on();addEventListener("scroll",on,{passive:true});return()=>removeEventListener("scroll",on)},[]);
 useEffect(()=>{if(!open)return;const prev=document.activeElement;const root=panel.current;const focusables=()=>[...root.querySelectorAll('a,button')].filter(x=>!x.disabled);focusables()[0]?.focus();const key=e=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus()}if(e.key==='Tab'){const f=focusables();if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}};document.addEventListener('keydown',key);return()=>{document.removeEventListener('keydown',key);prev?.focus?.()}},[open]);
 return <>
  <header className={`site-header ${scrolled?'is-scrolled':''}`}>
   <div className="site-header__inner">
    <a className="brand" href="/" aria-label="Dental Nation Clinic home"><img src="/brand/logo.svg" alt="Dental Nation Clinic"/></a>
    <nav className="desktop-nav" aria-label="Primary navigation">
      {navGroups.flatMap(g=>g.links).map(l=><a key={l.href} href={l.href} className={pathname===l.href?'is-active':''}>{l.label}</a>)}
    </nav>
    <div className="header-actions"><a className="button button--small" href="/contact">Request an appointment</a><button ref={trigger} className="menu-trigger" onClick={()=>setOpen(v=>!v)} type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?"Close menu":"Open menu"}><span/><span/><span/></button></div>
   </div>
  </header>
  <AnimatePresence>{open&&<motion.div className="mobile-nav-wrap" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.nav ref={panel} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{y:-20}} animate={{y:0}} exit={{y:-20}} transition={{duration:.3}}>
    <div className="mobile-nav__top"><span>Navigate</span><button type="button" onClick={()=>setOpen(false)} aria-label="Close menu">Close ×</button></div>
    {navGroups.map(g=><div className="mobile-nav__group" key={g.label}><p>{g.label}</p>{g.links.map(l=><a key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}<span>↗</span></a>)}</div>)}
    <a className="button" href="/contact">Request an appointment</a>
  </motion.nav></motion.div>}</AnimatePresence>
 </>;
}
