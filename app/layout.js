import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileActionBar from "../components/layout/MobileActionBar";
import MotionProvider from "../components/motion/MotionProvider";
import RouteMotion from "../components/motion/RouteMotion";
import PauseMotionControl from "../components/motion/PauseMotionControl";
import OpeningExperience from "../components/media/OpeningExperience";
import { business, sourceUrls } from "../content/site";
import { siteUrl } from "../lib/metadata";

export const metadata={
 metadataBase:new URL(siteUrl),
 title:{default:"Dental Nation Clinic | Dentist in Chinchinim, Goa",template:"%s | Dental Nation Clinic"},
 description:"Personal dental care in Chinchinim, Goa, with clear explanations, patient comfort and treatment for children, adults and families.",
 alternates:{canonical:"/"},
 icons:{icon:"/brand/favicon.svg"},
 openGraph:{type:"website",locale:"en_IN",siteName:"Dental Nation Clinic",title:"Dental Nation Clinic — Creating happier smiles",description:"Warm, clear dental care in Chinchinim, Goa.",images:[{url:"/brand/social-preview.jpg",width:1200,height:630,alt:"Dental Nation Clinic — Creating happier smiles"}]},
 robots:{index:true,follow:true}
};
export const viewport={themeColor:"#F8F3EC",width:"device-width",initialScale:1};

const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const jsonLd={"@context":"https://schema.org","@type":"Dentist","@id":`${siteUrl}/#clinic`,name:business.name,url:siteUrl,telephone:business.phoneE164,email:business.email,image:`${siteUrl}/brand/social-preview.jpg`,address:{"@type":"PostalAddress",streetAddress:"Royal Emerald Complex, Shop no. 5, Bamado",addressLocality:"Chinchinim",addressRegion:"Goa",postalCode:"403715",addressCountry:"IN"},openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:days,opens:"09:30",closes:"13:00"},{"@type":"OpeningHoursSpecification",dayOfWeek:days,opens:"15:00",closes:"18:30"}],sameAs:[sourceUrls.instagram],description:"Dental clinic in Chinchinim, Goa offering general, restorative, orthodontic, pediatric, endodontic, cosmetic and preventive dental care."};

export default function RootLayout({children}){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><MotionProvider><OpeningExperience/><Header/><RouteMotion>{children}</RouteMotion><Footer/><PauseMotionControl/><MobileActionBar/></MotionProvider><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></body></html>}
