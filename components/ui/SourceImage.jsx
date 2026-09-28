"use client";
import { useMemo,useState } from "react";
export default function SourceImage({src,sources,fallback,alt="",className="",...props}){
 const list=useMemo(()=>((sources?.length?sources:[src]).filter(Boolean)),[sources,src]); const [index,setIndex]=useState(0); const usingFallback=index>=list.length; const current=usingFallback?fallback:list[index];
 return <img src={current} onError={()=>{if(index<list.length)setIndex(i=>i+1)}} alt={alt} className={className} {...props}/>;
}
