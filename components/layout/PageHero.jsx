import SceneBackground from "../backgrounds/SceneBackground";
import Reveal from "../motion/Reveal";
export default function PageHero({eyebrow,title,lede,preset="read",children,dark=false}){return <section className={`page-hero ${dark?'section--dark':''}`}><SceneBackground preset={preset}/><div className="wrap page-hero__inner"><Reveal><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{lede&&<p className="page-hero__lede">{lede}</p>}{children}</Reveal></div></section>}
