import { treatments,dentists,articles,practicalFaqs,business } from "../content/site.js";
const errors=[];
if(treatments.length!==15)errors.push(`Expected 15 treatments, found ${treatments.length}`);
if(new Set(treatments.map(t=>t.slug)).size!==15)errors.push("Treatment slugs must be unique");
if(dentists.length!==4)errors.push(`Expected 4 dentists, found ${dentists.length}`);
if(articles.length!==3)errors.push(`Expected 3 source-grounded articles, found ${articles.length}`);
if(!practicalFaqs.length)errors.push("Practical FAQs are empty");
for(const t of treatments){for(const key of ["slug","name","intro","overview","consultation"]){if(!t[key])errors.push(`${t.slug||"treatment"} missing ${key}`)} if(!Array.isArray(t.faqs)||t.faqs.length<2)errors.push(`${t.slug} needs FAQs`)}
if(business.whatsappNumber!=="919270552454")errors.push("WhatsApp destination mismatch");
if(business.timeZone!=="Asia/Kolkata")errors.push("Timezone mismatch");
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`Content OK: ${treatments.length} treatments, ${dentists.length} dentists, ${articles.length} articles, ${practicalFaqs.length} FAQs.`);
