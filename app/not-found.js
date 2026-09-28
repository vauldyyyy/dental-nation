import Link from "next/link";import PageHero from "../components/layout/PageHero";
export const metadata={title:"Page not found"};
export default function NotFound(){return <main id="main-content" tabIndex="-1"><PageHero eyebrow="404 · Wrong turn" title="This page has wandered off." lede="The good news: the clinic, treatments and appointment request are all right where they should be." preset="visit"><div className="hero-actions"><Link className="button" href="/">Back to home</Link><Link className="button button--ghost" href="/treatments">Browse treatments</Link></div></PageHero></main>}
