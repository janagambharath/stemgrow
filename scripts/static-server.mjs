import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicRoot = resolve(root, "public");
const types = { ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".html": "text/html", ".xml": "application/xml", ".txt": "text/plain" };

function safeFile(pathname) {
  const cleaned = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, "");
  // Keep product files at the site root for Render Static Sites, while also
  // accepting the legacy public/ location during local development.
  const bases = pathname.startsWith("/products/") || pathname.startsWith("/crops/") || pathname.startsWith("/articles/") || ["/favicon.svg", "/og-stemgrow.svg", "/robots.txt", "/sitemap.xml"].includes(pathname)
    ? [root, publicRoot]
    : [root];
  for (const base of bases) {
    let file = resolve(base, cleaned);
    if (!file.startsWith(base)) continue;
    // If the resolved path is a directory, look for index.html inside it
    if (existsSync(file) && statSync(file).isDirectory()) {
      file = join(file, "index.html");
    }
    if (existsSync(file) && !statSync(file).isDirectory()) return file;
  }
  return null;
}

createServer((request, response) => {
  const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
  const file = pathname === "/" ? join(root, "index.html") : safeFile(pathname);
  if (!file || !existsSync(file)) {
    response.writeHead(404, { "Content-Type": "text/html" });
    createReadStream(existsSync(join(root, "404.html")) ? join(root, "404.html") : join(publicRoot, "404.html")).pipe(response);
    return;
  }
  response.writeHead(200, { "Content-Type": `${types[extname(file)] ?? "application/octet-stream"}; charset=utf-8`, "Cache-Control": "no-cache" });
  createReadStream(file).pipe(response);
}).listen(5173, "0.0.0.0", () => console.log("Stemgrow site: http://localhost:5173"));

