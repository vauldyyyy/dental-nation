"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence,motion } from "framer-motion";
import { useMotionPreference } from "./MotionProvider";
export default function RouteMotion({children}){
 const pathname=usePathname(); const {motionPaused}=useMotionPreference();
 useEffect(()=>{document.getElementById("main-content")?.focus({preventScroll:true});window.scrollTo({top:0,behavior:"auto"});},[pathname]);
 return <AnimatePresence mode="wait" initial={false}><motion.div key={pathname} initial={motionPaused?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={motionPaused?{opacity:1}:{opacity:0,y:-5}} transition={{duration:.36,ease:[.22,.61,.36,1]}}>{children}</motion.div></AnimatePresence>
}
