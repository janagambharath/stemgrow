import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = ["index.html", "src/site.js", "src/styles.css", "public/favicon.svg", "public/robots.txt", "public/sitemap.xml"];
const productImages = ["page-01-image-04.jpeg", "page-01-image-06.jpeg", "page-01-image-08.jpeg", "page-02-image-02.jpeg", "page-02-image-04.jpeg", "page-02-image-06.jpeg", "page-02-image-08.jpeg"];
for (const file of [...required, ...productImages.map((image) => `public/products/source-extracts/${image}`)]) {
  const full = resolve(root, file);
  if (!existsSync(full) || statSync(full).size === 0) throw new Error(`Missing required asset: ${file}`);
}
console.log("Static site verification passed: core files and 7 verified product package images are present.");
