"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AmbientCanvas from "./AmbientCanvas";
import { useMotionPreference } from "../motion/MotionProvider";

const presets={
 hero:{asset:"hero",tone:"light",glow:"72% 18%",duration:19},
 intro:{asset:"intro",tone:"light",glow:"18% 30%",duration:11},
 treatments:{asset:"treatments",tone:"light",glow:"78% 35%",duration:13},
 journey:{asset:"journey",tone:"light",glow:"45% 68%",duration:12},
 team:{asset:"team",tone:"light",glow:"68% 22%",duration:14},
 gallery:{asset:"gallery",tone:"light",glow:"26% 28%",duration:11},
 trust:{asset:"trust",tone:"dark",glow:"70% 40%",duration:12},
 read:{asset:"read",tone:"light",glow:"50% 8%",duration:14},
 visit:{asset:"visit",tone:"light",glow:"80% 25%",duration:13},
 footer:{asset:"footer",tone:"dark",glow:"30% 20%",duration:14},
};
export default function SceneBackground({preset="intro",quiet=false}){
 const p=presets[preset]||presets.intro; const ref=useRef(null); const near=useInView(ref,{margin:"250px"}); const {motionPaused}=useMotionPreference();
 const animate=near&&!motionPaused?{scale:[1.01,1.09,1.01],x:["-2.5%","2.5%","-2.5%"],y:["1.5%","-1.5%","1.5%"]}:{scale:1.025,x:0,y:0};
 return <div ref={ref} className={`scene-bg scene-bg--${p.tone} ${quiet?"scene-bg--quiet":""}`} aria-hidden="true">
  <motion.img src={`/scenes/${p.asset}.svg`} alt="" className="scene-bg__plate" animate={animate} transition={{duration:p.duration,repeat:Infinity,repeatType:"mirror",ease:"easeInOut"}}/>
  <motion.div className="scene-bg__light" style={{"--glow-pos":p.glow}} animate={!motionPaused&&near?{opacity:[.52,.95,.52],scale:[1,1.18,1],x:["-4%","4%","-4%"]}:{opacity:.52}} transition={{duration:p.duration*.65,repeat:Infinity,ease:"easeInOut"}}/>
  {!quiet && <AmbientCanvas variant={p.tone==="dark"?"dark":"warm"} density={p.tone==="dark"?.7:.55}/>} 
  <div className="scene-bg__grain"/>
 </div>
}
