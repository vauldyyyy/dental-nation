import Link from "next/link";
import SceneBackground from "../backgrounds/SceneBackground";
import { business } from "../../content/site";
import { telHref,mailHref,directionsUrl } from "../../lib/business";
export default function Footer(){return <footer className="site-footer section--dark"><SceneBackground preset="footer" quiet/><div className="wrap site-footer__grid">
 <div><img className="footer-logo" src="/brand/logo.svg" alt="Dental Nation Clinic"/><p className="footer-kicker">Creating happier smiles in Chinchinim, Goa.</p></div>
 <div><p className="footer-label">Explore</p><Link href="/treatments">Treatments</Link><Link href="/#smile-guide">Find your starting point</Link><Link href="/dentists">Dentists</Link><Link href="/gallery">Gallery</Link><Link href="/#reviews">Reviews</Link><Link href="/advice">Patient Advice</Link></div>
 <div><p className="footer-label">Visit</p><address>{business.address}</address><a href={telHref}>{business.phoneDisplay}</a><a href={mailHref}>{business.email}</a></div>
 <div><p className="footer-label">Hours</p><p>Mon–Sat<br/>9:30 am–1:00 pm<br/>3:00 pm–6:30 pm</p><p>Sunday closed</p><a href={directionsUrl} target="_blank" rel="noreferrer">Get directions ↗</a></div>
 </div><div className="wrap site-footer__bottom"><span>© {new Date().getFullYear()} Dental Nation Clinic</span><span>Website content can be maintained in <code>content/site.js</code></span></div></footer>}
