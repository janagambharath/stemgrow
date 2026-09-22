import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = ["index.html", "src/site.js", "src/styles.css", "favicon.svg", "og-stemgrow.svg", "robots.txt", "sitemap.xml", "404.html"];
const productImages = ["stemgrow-plus.jpeg", "n-cure.jpeg", "bloomix.jpeg", "growflow.jpeg", "tridofor.jpeg", "oriza.jpeg", "reflector.jpeg"];
for (const file of [...required, ...productImages.map((image) => `products/supplied-packshots/${image}`)]) {
  const full = resolve(root, file);
  if (!existsSync(full) || statSync(full).size === 0) throw new Error(`Missing required asset: ${file}`);
}
const stylesheet = readFileSync(resolve(root, "src/styles.css"), "utf8");
for (const token of ["heroLineSlide", "10398726", "20234940", "20344345", "39002374", "12470180"]) {
  if (!stylesheet.includes(token)) throw new Error(`Missing verified hero or crop visual treatment: ${token}`);
}
console.log("Static site verification passed: core files, crop slideshow treatments, and 7 supplied product package images are present.");
