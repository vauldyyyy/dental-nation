import { business } from "../content/site.js";

export const telHref = `tel:${business.phoneE164}`;
export const mailHref = `mailto:${business.email}`;
export const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=16&output=embed`;

export function waUrl(message) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function openStatus(now = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: business.timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const obj = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(obj.weekday);
    const minute = Number(obj.hour) * 60 + Number(obj.minute);
    const windows = business.openingHours[day] || [];
    const current = windows.find(([start, end]) => minute >= start && minute < end);
    if (current) return { open: true, text: "Open now", detail: minute < 780 ? "Morning session until 1:00 pm" : "Afternoon session until 6:30 pm" };
    if (day === 0) return { open: false, text: "Closed today", detail: "Regular hours resume Monday at 9:30 am" };
    if (minute >= 780 && minute < 900) return { open: false, text: "Closed for lunch", detail: "Afternoon session starts at 3:00 pm" };
    return { open: false, text: "Closed now", detail: "Mon–Sat · 9:30–1:00 & 3:00–6:30" };
  } catch {
    return { open: null, text: "Goa clinic hours", detail: business.hoursLabel };
  }
}

export function preferredDateInfo(dateString) {
  if (!dateString) return { valid: false, message: "Choose a preferred date." };
  const [y, m, d] = dateString.split("-").map(Number);
  const selected = new Date(Date.UTC(y, m - 1, d, 12));
  const dateParts = new Intl.DateTimeFormat("en-GB", { timeZone: business.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const dateObj = Object.fromEntries(dateParts.map((p) => [p.type, p.value]));
  const ny = Number(dateObj.year), nm = Number(dateObj.month), nd = Number(dateObj.day);
  const today = new Date(Date.UTC(ny, nm - 1, nd, 12));
  if (selected < today) return { valid: false, message: "Please choose today or a future date." };
  if (selected.getUTCDay() === 0) return { valid: false, message: "The clinic is closed on Sundays under its regular schedule. Please choose Monday–Saturday." };
  return { valid: true, message: "This is a preferred date; the clinic will confirm availability." };
}
