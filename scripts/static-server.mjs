import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicRoot = resolve(root, "public");
const types = { ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".html": "text/html", ".xml": "application/xml", ".txt": "text/plain" };

function safeFile(pathname) {
  const cleaned = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, "");
  const base = pathname.startsWith("/products/") || ["/favicon.svg", "/og-stemgrow.svg", "/robots.txt", "/sitemap.xml"].includes(pathname) ? publicRoot : root;
  const file = resolve(base, cleaned);
  return file.startsWith(base) ? file : null;
}

createServer((request, response) => {
  const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
  const file = pathname === "/" ? join(root, "index.html") : safeFile(pathname);
  if (!file || !existsSync(file)) {
    response.writeHead(404, { "Content-Type": "text/html" });
    createReadStream(join(publicRoot, "404.html")).pipe(response);
    return;
  }
  response.writeHead(200, { "Content-Type": `${types[extname(file)] ?? "application/octet-stream"}; charset=utf-8`, "Cache-Control": "no-cache" });
  createReadStream(file).pipe(response);
}).listen(5173, "0.0.0.0", () => console.log("Stemgrow site: http://localhost:5173"));
