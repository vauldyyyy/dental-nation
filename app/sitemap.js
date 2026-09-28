import { treatments,articles } from "../content/site";
import { siteUrl } from "../lib/metadata";
export default function sitemap(){const base=["","/our-clinic","/dentists","/treatments","/gallery","/first-visit","/advice","/contact"];return [...base.map(path=>({url:`${siteUrl}${path}`,changeFrequency:path===""?"weekly":"monthly",priority:path===""?1:.7})),...treatments.map(t=>({url:`${siteUrl}/treatments/${t.slug}`,changeFrequency:"monthly",priority:.65})),...articles.map(a=>({url:`${siteUrl}/advice/${a.slug}`,changeFrequency:"monthly",priority:.55}))]}
