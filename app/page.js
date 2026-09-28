import Link from "next/link";
import HeroBackdrop from "../components/media/HeroBackdrop";
import FilmChapter from "../components/media/FilmChapter";
import SceneBackground from "../components/backgrounds/SceneBackground";
import Reveal from "../components/motion/Reveal";
import SectionIntro from "../components/layout/SectionIntro";
import TreatmentExplorer from "../components/treatments/TreatmentExplorer";
import TeamGrid from "../components/layout/TeamGrid";
import Gallery from "../components/gallery/Gallery";
import Accordion from "../components/ui/Accordion";
import OpenStatus from "../components/layout/OpenStatus";
import AppointmentForm from "../components/booking/AppointmentForm";
import ManifestoStory from "../components/home/ManifestoStory";
import ClinicIntro from "../components/home/ClinicIntro";
import PathwaysSection from "../components/home/PathwaysSection";
import JourneyExperience from "../components/home/JourneyExperience";
import SmileStory from "../components/home/SmileStory";
import VisitSection from "../components/home/VisitSection";
import ReviewsWall from "../components/home/ReviewsWall";
import SmileGuide from "../components/home/SmileGuide";
import { practicalFaqs } from "../content/site";
import { chapterFilms } from "../content/films";

export default function Home(){return <main id="main-content" tabIndex="-1">
 <section className="home-hero"><HeroBackdrop/><div className="wrap home-hero__content"><Reveal><p className="eyebrow">A different kind of dental visit · Goa</p><h1>Feel good<br/>about <em>smiling.</em></h1><p className="hero-lede">Thoughtful dentistry, clear conversations and a place that feels a little more like you.</p><div className="hero-actions"><Link className="button button--light" href="/contact">Request an appointment <span aria-hidden="true">↗</span></Link><Link className="button button--outline-light" href="/treatments">Explore treatments</Link></div><div className="hero-meta"><OpenStatus/><span>Chinchinim, Goa</span></div></Reveal></div><div className="hero-rail" aria-hidden="true"><span>SCROLL TO EXPLORE</span><i/></div></section>

 <ManifestoStory/>
 <ClinicIntro/>

 <FilmChapter film={chapterFilms.arrival}/>

 <PathwaysSection/>
 <SmileGuide/>

 <section className="section treatment-section treatment-section--cinematic"><SceneBackground preset="treatments"/><div className="treatment-section__halo" aria-hidden="true"/><div className="wrap"><SectionIntro eyebrow="Treatments" title="Care for the everyday. Expertise for the unexpected." lede="Explore all 15 treatments currently offered by Dental Nation. If you are not sure what you need, book an assessment and describe what you have noticed."/><TreatmentExplorer compact/><div className="center-action"><Link className="button button--ghost" href="/treatments">View all treatment details</Link></div></div></section>

 <FilmChapter film={chapterFilms.precision}/>

 <JourneyExperience/>

 <section className="section team-section team-section--cinematic"><SceneBackground preset="team"/><div className="team-section__trace" aria-hidden="true"><i/><i/><i/></div><div className="wrap"><div className="section-heading-row"><SectionIntro eyebrow="Meet the dentists" title="Different disciplines. One patient-first clinic." lede="The current Dental Nation team brings together general dentistry, orthodontics, pediatric dentistry and endodontics."/><Link className="text-link" href="/dentists">Meet the team <b>↗</b></Link></div><TeamGrid compact/></div></section>

 <section className="section gallery-section gallery-section--cinematic"><SceneBackground preset="gallery"/><div className="gallery-section__ribbon" aria-hidden="true">DENTAL NATION · CHINCHINIM · GOA · DENTAL NATION · CHINCHINIM · GOA</div><div className="wrap"><div className="section-heading-row"><SectionIntro eyebrow="Inside Dental Nation" title="Come in. Have a look around." lede="Explore the spaces and details that make Dental Nation feel like Dental Nation."/><Link className="text-link" href="/gallery">Open full gallery <b>↗</b></Link></div><Gallery limit={6}/></div></section>

 <section className="section living-section"><div className="living-section__visual"><img src="/images/clinic/official/gallery-03.jpg" alt="The consultation space inside Dental Nation" loading="lazy"/></div><div className="wrap living-section__content"><Reveal><p className="eyebrow">A room for real conversations</p><h2>Take a seat.<br/><em>Take your time.</em></h2><p>Questions are welcome here. Before any treatment, there is space to talk through what you are feeling and what comes next.</p><Link className="button button--ghost" href="/first-visit">Plan your first visit <span aria-hidden="true">↗</span></Link></Reveal></div></section>

 <section className="section trust-section section--dark"><SceneBackground preset="trust"/><div className="wrap trust-layout"><Reveal><p className="eyebrow">What matters here</p><h2>Care that considers the whole person.</h2><p className="large-copy">A welcoming space, a chance to talk openly and careful attention to the details of your treatment.</p></Reveal><Reveal className="trust-points" delay={.1}>{["Personal attention","Clear explanations","Natural-looking smiles","Care across ages"].map(x=><div key={x}><p>{x}</p></div>)}</Reveal></div></section>

 <ReviewsWall/>

 <section className="section faq-preview faq-preview--cinematic"><SceneBackground preset="read" quiet/><div className="faq-preview__orbit" aria-hidden="true"><i/><i/><span>?</span></div><div className="wrap faq-layout"><SectionIntro eyebrow="Your first visit" title="Practical answers before you arrive." lede="You do not need to know which treatment to request. Start with the concern; the clinic can assess the rest."/><div><Accordion items={practicalFaqs.slice(0,4)}/><Link className="text-link" href="/first-visit">Read first-visit guide <b>↗</b></Link></div></div></section>

 <SmileStory/>
 <VisitSection/>

 <section className="section booking-home"><SceneBackground preset="read" quiet/><div className="wrap booking-grid"><SectionIntro eyebrow="Request an appointment" title="Tell us what works for you." lede="Choose a preferred day and morning or afternoon. The form prepares a WhatsApp request for you to send; the clinic confirms availability afterwards."/><AppointmentForm/></div></section>
 </main>}
