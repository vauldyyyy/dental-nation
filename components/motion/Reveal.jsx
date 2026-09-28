"use client";
import { motion } from "framer-motion";
import { useMotionPreference } from "./MotionProvider";
export default function Reveal({children, className="", delay=0, y=24, as="div", ...props}){
  const {motionPaused}=useMotionPreference(); const Tag=motion[as] || motion.div;
  return <Tag className={className} initial={motionPaused?false:{opacity:0,y}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.72,delay}} {...props}>{children}</Tag>
}
