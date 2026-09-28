"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "../motion/MotionProvider";

export default function AmbientCanvas({variant="warm", density=1}){
 const ref=useRef(null); const {motionPaused}=useMotionPreference();
 useEffect(()=>{
   const canvas=ref.current; if(!canvas || motionPaused) return;
   const ctx=canvas.getContext("2d",{alpha:true}); if(!ctx) return;
   let w=0,h=0,dpr=1,raf=0,last=0,visible=true,near=true,points=[];
   const palette = variant==="dark" ? ["180,139,107","248,243,236"] : ["180,139,107","230,210,186"];
   const resize=()=>{ const r=canvas.getBoundingClientRect(); w=r.width; h=r.height; dpr=Math.min(window.devicePixelRatio||1,w<700?1:1.5); canvas.width=Math.max(1,Math.round(w*dpr)); canvas.height=Math.max(1,Math.round(h*dpr)); ctx.setTransform(dpr,0,0,dpr,0,0); const n=Math.max(10,Math.round((w<700?12:20)*density)); points=Array.from({length:n},(_,i)=>({x:(i*.173%1)*w,y:(i*.311%1)*h,r:50+(i%5)*21,s:.24+(i%4)*.045,p:i*.8})); };
   const draw=(t)=>{ ctx.clearRect(0,0,w,h); for(const [i,p] of points.entries()){ const x=p.x+Math.sin(t*p.s+p.p)*100; const y=p.y+Math.cos(t*(p.s*.72)+p.p)*72; const g=ctx.createRadialGradient(x,y,0,x,y,p.r*2.2); g.addColorStop(0,`rgba(${palette[i%2]},${variant==="dark"?.09:.15})`); g.addColorStop(1,`rgba(${palette[i%2]},0)`); ctx.fillStyle=g;ctx.fillRect(x-p.r*2.2,y-p.r*2.2,p.r*4.4,p.r*4.4); }};
   const tick=(now)=>{ if(!visible||!near){raf=0;return;} raf=requestAnimationFrame(tick); if(now-last<33)return;last=now;draw(now*.001); };
   const sync=()=>{visible=!document.hidden;if(visible&&near&&!raf)raf=requestAnimationFrame(tick);else if((!visible||!near)&&raf){cancelAnimationFrame(raf);raf=0;}};
   const io=new IntersectionObserver(([e])=>{near=e.isIntersecting;sync();},{rootMargin:"50% 0px"}); io.observe(canvas);
   const ro=new ResizeObserver(resize); ro.observe(canvas); document.addEventListener("visibilitychange",sync); resize(); sync();
   return()=>{cancelAnimationFrame(raf);io.disconnect();ro.disconnect();document.removeEventListener("visibilitychange",sync)};
 },[motionPaused,variant,density]);
 return <canvas ref={ref} className="ambient-canvas" aria-hidden="true"/>;
}
