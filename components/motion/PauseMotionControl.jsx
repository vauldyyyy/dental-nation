"use client";
import { useMotionPreference } from "./MotionProvider";
export default function PauseMotionControl(){
 const {motionPaused,toggleMotion,hydrated}=useMotionPreference();
 if(!hydrated)return null;
 return <button className="motion-toggle" onClick={toggleMotion} type="button" aria-pressed={motionPaused} title="Pause or resume decorative motion">
   <span aria-hidden="true">{motionPaused?"▶":"Ⅱ"}</span><span>{motionPaused?"Resume motion":"Pause motion"}</span>
 </button>
}
