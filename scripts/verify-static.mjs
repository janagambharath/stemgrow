import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = [
  "index.html", "src/site.js", "src/styles.css", "favicon.svg", "og-stemgrow.svg", "robots.txt", "sitemap.xml", "404.html",
  "crops/green-mirchi.jpeg", "crops/synbio-platform.jpeg", "crops/microbiome-platform.jpeg", "crops/bioprotect-platform.jpeg", "crops/plantbio-platform.jpeg",
  "crops/bg-paddy.jpeg", "crops/bg-cotton-fruit.jpeg", "crops/bg-chilli-flowers.jpeg", "crops/bg-crop-flowers.jpeg", "crops/bg-chilli-pests.jpeg", "crops/bg-crop-pests.jpeg", "crops/bg-crop-disease.jpeg"
];
const productImages = ["stemgrow-plus.jpeg", "n-cure.jpeg", "bloomix.jpeg", "growflow.jpeg", "tridofor.jpeg", "oriza.jpeg", "reflector.jpeg"];
const cutoutImages = ["stemgrow-plus.png", "n-cure.png", "bloomix.png", "growflow.png", "tridofor.png", "oriza.png", "reflector.png"];
for (const file of [
  ...required,
  ...productImages.map((image) => `products/supplied-packshots/${image}`),
  ...cutoutImages.map((image) => `products/cutouts/${image}`)
]) {
  const full = resolve(root, file);
  if (!existsSync(full) || statSync(full).size === 0) throw new Error(`Missing required asset: ${file}`);
}
const stylesheet = readFileSync(resolve(root, "src/styles.css"), "utf8");
for (const token of ["heroLineSlide", "10398726", "20234940", "20344345", "green-mirchi.jpeg", "12470180", "expertise-slider", "bg-paddy.jpeg"]) {
  if (!stylesheet.includes(token)) throw new Error(`Missing verified hero or crop visual treatment: ${token}`);
}
console.log("Static site verification passed: core files, crop slideshow treatments, 7 crop backgrounds, and 7 supplied product package images are present.");
