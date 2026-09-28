import fs from "node:fs/promises";import path from "node:path";import {fileURLToPath} from "node:url";import {dentists,galleryRemote} from "../content/site.js";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const items=[
 {url:"https://static.wixstatic.com/media/f2a471_eab1a333f89b421c945f0c3d08abd6d2~mv2.jpg",dest:"public/brand/logo-original.jpg"},
 ...dentists.map(d=>({url:d.sourceImage,dest:`public/images/team/official/${d.slug}.jpg`})),
 ...galleryRemote.map((url,i)=>({url,dest:`public/images/clinic/official/gallery-${String(i+1).padStart(2,"0")}.jpg`})),
];
let failed=0;
for(const item of items){try{const res=await fetch(item.url,{redirect:"follow"});if(!res.ok)throw new Error(`HTTP ${res.status}`);const bytes=Buffer.from(await res.arrayBuffer());if(bytes.length<1024)throw new Error("response unexpectedly small");const dest=path.join(root,item.dest);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,bytes);console.log(`saved ${item.dest} (${bytes.length} bytes)`)}catch(err){failed++;console.error(`failed ${item.url}: ${err.message}`)}}
if(failed){console.error(`${failed} official assets could not be downloaded.`);process.exit(1)}
console.log(`Downloaded ${items.length} official Dental Nation public assets.`);
