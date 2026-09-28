import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "../../../content/site";
import { treatmentImage, treatmentMedia } from "../../../content/treatment-media";
import SceneBackground from "../../../components/backgrounds/SceneBackground";
import Reveal from "../../../components/motion/Reveal";
import Accordion from "../../../components/ui/Accordion";
import JsonLd from "../../../components/seo/JsonLd";
import { pageMetadata, siteUrl } from "../../../lib/metadata";

export function generateStaticParams() {
  return treatments.map(treatment => ({ slug: treatment.slug }));
}

export function generateMetadata({ params }) {
  const treatment = treatments.find(item => item.slug === params.slug);
  if (!treatment) return { title: "Treatment not found", robots: { index: false } };
  return pageMetadata(
    `${treatment.name} in Chinchinim, Goa`,
    `${treatment.intro} Learn about assessment and options at Dental Nation Clinic in Chinchinim, Goa.`,
    `/treatments/${treatment.slug}`,
    treatmentImage(treatment.slug)
  );
}

function structuredData(treatment) {
  const url = `${siteUrl}/treatments/${treatment.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: treatment.name,
        description: treatment.intro,
        url,
        image: `${siteUrl}${treatmentImage(treatment.slug)}`,
        provider: { "@id": `${siteUrl}/#clinic` },
        areaServed: { "@type": "Place", name: "Chinchinim, Goa" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Treatments", item: `${siteUrl}/treatments` },
          { "@type": "ListItem", position: 3, name: treatment.name, item: url },
        ],
      },
    ],
  };
}

export default function Treatment({ params }) {
  const treatment = treatments.find(item => item.slug === params.slug);
  if (!treatment) notFound();
  const media = treatmentMedia[treatment.slug];
  const related = treatment.related.map(slug => treatments.find(item => item.slug === slug)).filter(Boolean);
  return <main id="main-content" tabIndex="-1">
    <section className="treatment-hero">
      <SceneBackground preset="treatments" />
      <div className="wrap treatment-hero__grid">
        <Reveal>
          <nav className="treatment-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/treatments">Treatments</Link><span aria-hidden="true">/</span><span aria-current="page">{treatment.name}</span></nav>
          <p className="eyebrow">Dental Nation · Chinchinim, Goa</p>
          <h1>{treatment.name}</h1>
          <p className="page-hero__lede">{treatment.intro}</p>
          <Link className="button button--dark" href={`/contact?treatment=${encodeURIComponent(treatment.slug)}`}>Request an appointment</Link>
        </Reveal>
        <Reveal delay={.08}>
          <figure className="treatment-hero__art"><Image src={treatmentImage(treatment.slug)} alt={media.alt} width={1200} height={900} priority sizes="(max-width: 760px) 88vw, 48vw" quality={85} /><figcaption>{media.kind} selected by Dental Nation for this treatment</figcaption></figure>
        </Reveal>
      </div>
    </section>
    <section className="section"><SceneBackground preset="read" quiet /><div className="wrap treatment-copy-grid"><div className="treatment-sidebar"><p className="eyebrow">Overview</p><p className="source-note">Based on Dental Nation’s current service listing. Suitability is decided after assessment.</p></div><div className="long-copy"><Reveal><h2>What this treatment is for</h2><p>{treatment.overview}</p></Reveal><Reveal><h2>What a consultation involves</h2><p>{treatment.consultation}</p></Reveal><Reveal><h2>Questions patients often ask</h2><Accordion items={treatment.faqs} /></Reveal></div></div></section>
    <section className="section section--sand"><SceneBackground preset="treatments" quiet /><div className="wrap"><p className="eyebrow">Related care</p><h2 className="related-title">You may also want to understand</h2><div className="related-grid">{related.map(item => <Link key={item.slug} href={`/treatments/${item.slug}`} className="related-card"><div className="related-card__image"><Image src={treatmentImage(item.slug)} alt={treatmentMedia[item.slug].alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><span>Explore</span><h3>{item.name}</h3><p>{item.sourceSummary}</p><b aria-hidden="true">↗</b></Link>)}</div></div></section>
    <section className="section"><SceneBackground preset="visit" /><div className="wrap cta-panel"><div><p className="eyebrow">Next step</p><h2>Talk it through before deciding.</h2></div><div><p>An appointment request does not commit you to treatment. Tell the clinic what you would like assessed, and Dental Nation will confirm availability.</p><Link className="button button--dark" href={`/contact?treatment=${encodeURIComponent(treatment.slug)}`}>Request an appointment for {treatment.name}</Link></div></div></section>
    <JsonLd data={structuredData(treatment)} />
  </main>;
}
