"use client";
import { useEffect,useState } from "react";
import { openStatus } from "../../lib/business";
export default function OpenStatus(){const [status,setStatus]=useState({text:"Goa local hours",open:null});useEffect(()=>{const sync=()=>setStatus(openStatus());sync();const id=setInterval(sync,60000);return()=>clearInterval(id)},[]);return <span className={`status-pill ${status.open===true?'is-open':''}`}>{status.text}</span>}
