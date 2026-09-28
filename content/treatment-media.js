// Images selected by Dental Nation on its public services page. Some are
// photographs and some are explanatory illustrations; alt text reflects that.
export const treatmentMedia = {
  "fillings": { alt: "Illustration of a tooth-coloured filling being placed in a molar", kind: "Illustrative image" },
  "crowns-and-bridges": { alt: "Illustration of crowns and a bridge replacing damaged or missing teeth", kind: "Illustrative image" },
  "root-canal-treatment": { alt: "Dental model showing the inside of a tooth for root canal treatment", kind: "Illustrative image" },
  "teeth-cleaning": { alt: "Illustration of professional cleaning removing deposits from teeth", kind: "Illustrative image" },
  "dentures-and-partial-dentures": { alt: "Examples of full, partial and flexible dentures on a table", kind: "Illustrative image" },
  "pediatric-dentistry": { alt: "Child having a dental check-up", kind: "Photograph" },
  "extraction": { alt: "Illustration of a tooth being removed with dental forceps", kind: "Illustrative image" },
  "cosmetic-dentistry": { alt: "Smile comparison graphic representing cosmetic dentistry", kind: "Illustrative image" },
  "braces-and-aligners": { alt: "Comparison image of clear aligners and fixed braces", kind: "Illustrative image" },
  "dental-implants": { alt: "Illustration of a dental implant supporting a replacement tooth", kind: "Illustrative image" },
  "teeth-whitening": { alt: "Smile comparison graphic representing teeth whitening", kind: "Illustrative image" },
  "wisdom-tooth-removal": { alt: "Illustration of an impacted wisdom tooth in the jaw", kind: "Illustrative image" },
  "dental-x-ray": { alt: "Dentist holding a panoramic dental X-ray beside a dental chair", kind: "Photograph" },
  "nightguard-and-mouthguard": { alt: "Person holding a clear protective mouthguard beside their teeth", kind: "Photograph" },
  "gum-treatment": { alt: "Person pointing to the gumline around their front teeth", kind: "Photograph" },
};

export function treatmentImage(slug) {
  return `/images/treatments/official/${slug}.webp`;
}
