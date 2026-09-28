const defaultBase = "https://www.dentalnationclinic.com";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || defaultBase).replace(/\/+$/, "");

export function pageMetadata(title, description, path = "/", image = "/brand/social-preview.jpg") {
  const url = new URL(path, `${siteUrl}/`).toString();
  const imageUrl = new URL(image, `${siteUrl}/`).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Dental Nation Clinic",
      locale: "en_IN",
      images: [{ url: imageUrl, alt: `${title} at Dental Nation Clinic` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
  };
}
