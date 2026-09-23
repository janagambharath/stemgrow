import assert from "node:assert/strict";

const listeners = new Map();
const root = {
  className: "",
  innerHTML: "",
  addEventListener(type, handler) { listeners.set(type, handler); },
};

globalThis.document = {
  documentElement: {},
  body: { style: {} },
  querySelector(selector) { return selector === "#root" ? root : null; },
  getElementById() { return null; },
  addEventListener() {},
};
globalThis.window = {
  scrollY: 0,
  addEventListener() {},
  scrollTo() {},
  setTimeout(callback) { callback(); },
};

await import("../src/site.js");

for (const product of ["STEMGROW PLUS", "N-CURE", "BLOOMIX", "GROWFLOW", "TRIDOFOR", "ORIZA", "REFLECTOR"]) {
  assert.ok(root.innerHTML.includes(product), `Missing product in rendered catalogue: ${product}`);
}
assert.ok(!root.innerHTML.includes("Agriculture Insights"), "Template filler should not render");
assert.ok(!root.innerHTML.includes(">07<"), "Unsupported hero statistic should not render");
assert.ok(root.innerHTML.includes("application/ld+json") === false, "Schema belongs in the document head, not runtime markup");
assert.ok(root.innerHTML.includes("approach-card__watermark"), "Approach cards should render the visual index treatment");
assert.ok(root.innerHTML.includes("whatsapp-float") && root.innerHTML.includes("whatsapp-icon"), "WhatsApp action should be clearly branded");
assert.ok(root.innerHTML.includes("hero__line") && root.innerHTML.includes("hero__slide--cotton") && root.innerHTML.includes("hero__slide--maize") && root.innerHTML.includes("hero__slide--mirchi"), "Hero should render the cotton, maize and mirchi slideshow");
assert.ok(root.innerHTML.includes("expertise-showcase") && root.innerHTML.includes("Our Expertise - Synthetic Biology Platform"), "Hero should feature the scientific expertise slideshow");
assert.ok(root.innerHTML.includes("/crops/synbio-platform.jpeg") && root.innerHTML.includes("/crops/microbiome-platform.jpeg"), "Expertise slideshow should render scientific platform banners");
assert.ok(root.innerHTML.includes("/products/cutouts/stemgrow-plus.png") && root.innerHTML.includes("/products/cutouts/reflector.png"), "Catalogue should use the transparent product packshots");
assert.ok(root.innerHTML.includes("wa.me/917981312887") && !root.innerHTML.includes("wa.me/919133243325"), "Every WhatsApp action should use the approved 7981312887 number");
assert.ok(!/[↗◌⌁✦◒⊞⌇●✓◉⌕✉]/u.test(root.innerHTML), "Decorative emoji-style glyphs should not render in the UI");

const productButton = { dataset: { product: "stemgrow-plus" }, closest() { return this; } };
listeners.get("click")({ target: productButton });
assert.ok(root.innerHTML.includes("product-modal") && root.innerHTML.includes("Back to products"), "View details should open a product modal with a visible exit action");
const closeButton = { dataset: { closeModal: "" }, closest() { return this; } };
listeners.get("click")({ target: closeButton });
assert.ok(!root.innerHTML.includes('class="product-modal"'), "Product detail exit should return visitors to the catalogue");

const languageButton = { dataset: { lang: "te" }, closest() { return this; } };
listeners.get("click")({ target: languageButton });
assert.equal(document.documentElement.lang, "te", "Language switch should update document language");
assert.ok(root.innerHTML.includes("మెరుగైన పెరుగుదల"), "Telugu hero copy should render after switch");
assert.ok(root.innerHTML.includes("విచారణ పంపండి"), "Telugu form CTA should render after switch");
assert.ok(root.innerHTML.includes("మా నైపుణ్యం - సింథటిక్ బయాలజీ ప్లాట్‌ఫారమ్"), "Telugu expertise slide copy should render after switch");

console.log("Client smoke test passed: seven products, no filler/stat, and English/Telugu render path verified.");
