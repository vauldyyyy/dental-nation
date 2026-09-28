import PageHero from "../../components/layout/PageHero";
import SceneBackground from "../../components/backgrounds/SceneBackground";
import TreatmentExplorer from "../../components/treatments/TreatmentExplorer";
import SmileGuide from "../../components/home/SmileGuide";
import JsonLd from "../../components/seo/JsonLd";
import { treatmentCategories, treatments } from "../../content/site";
import { pageMetadata, siteUrl } from "../../lib/metadata";

export const metadata = pageMetadata(
  "Dental Treatments in Chinchinim, Goa",
  "Explore 15 dental treatments at Dental Nation Clinic in Chinchinim, Goa, from teeth cleaning and fillings to braces, implants and children's dentistry.",
  "/treatments"
);

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dental treatments at Dental Nation Clinic",
  itemListElement: treatments.map((treatment, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: treatment.name,
    url: `${siteUrl}/treatments/${treatment.slug}`,
  })),
};

export default function Treatments({ searchParams }) {
  const requestedCategory = typeof searchParams?.category === "string" ? searchParams.category : "all";
  const initialCategory = treatmentCategories.some(item => item.id === requestedCategory) ? requestedCategory : "all";
  return <main id="main-content" tabIndex="-1">
    <PageHero eyebrow="Treatment guide" title="Dental treatments in Chinchinim, Goa." lede="From everyday prevention to repair, alignment and specialist care. Explore the full range of services and ask the clinic which options suit your situation." preset="treatments" />
    <section className="section"><SceneBackground preset="treatments" /><div className="wrap"><TreatmentExplorer initialCategory={initialCategory} /></div></section>
    <SmileGuide />
    <JsonLd data={itemList} />
  </main>;
}
